import React, { useEffect, useState, useRef } from 'react';
import './App.css';
import { Layers, GeoJsonLayers, LayerType, GeoJsonData, GeoJsonLayer } from './types';

// 버전 정보
const APP_VERSION = '1.1.0-develop';

// 네이버 맵 API 스크립트 동적 로드 함수
const loadNaverMapsScript = (): Promise<void> => {
  return new Promise<void>((resolve, reject) => {
    if (window.naver && window.naver.maps) {
      console.log('네이버 맵 API가 이미 로드되어 있습니다.');
      resolve();
      return;
    }

    console.log('네이버 맵 API 스크립트 로드 중...');
    
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.REACT_APP_NAVER_CLIENT_ID || 'YOUR_NAVER_CLIENT_ID_HERE'}`;
    script.async = true;
    script.onload = () => {
      console.log('네이버 맵 API 스크립트 로드 성공!');
      resolve();
    };
    script.onerror = (error) => {
      console.error('네이버 맵 API 스크립트 로드 실패:', error);
      reject(error);
    };

    document.head.appendChild(script);
  });
};

// 레이어 스타일 정의
const styles: Record<LayerType, {
  fillColor: string;
  fillOpacity: number;
  strokeColor: string;
  strokeWeight: number;
  strokeOpacity: number;
  radius?: number;
}> = {
  node: {
    fillColor: '#3388ff',
    fillOpacity: 0.7,
    strokeColor: '#ffffff',
    strokeWeight: 2,
    strokeOpacity: 1,
    radius: 5
  },
  street: {
    fillColor: '#ff8800',
    fillOpacity: 0.7,
    strokeColor: '#ffffff',
    strokeWeight: 2,
    strokeOpacity: 1
  },
  way: {
    fillColor: '#33cc33',
    fillOpacity: 0.7,
    strokeColor: '#ffffff',
    strokeWeight: 2,
    strokeOpacity: 1
  },
  crossing: {
    fillColor: '#ff3333',
    fillOpacity: 0.7,
    strokeColor: '#ffffff',
    strokeWeight: 2,
    strokeOpacity: 1,
    radius: 5
  }
};

// React 컴포넌트
const App: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<naver.maps.Map | null>(null);
  const [isNaverLoaded, setIsNaverLoaded] = useState<boolean>(false);
  const [layers, setLayers] = useState<Layers>({
    node: true,
    street: true,
    way: true,
    crossing: true
  });
  const [geoJsonLayers, setGeoJsonLayers] = useState<GeoJsonLayers>({
    node: null,
    street: null,
    way: null,
    crossing: null
  });

  // 네이버 맵 API 로드
  useEffect(() => {
    loadNaverMapsScript()
      .then(() => {
        setIsNaverLoaded(true);
      })
      .catch((error) => {
        console.error('네이버 맵 API 로드 오류:', error);
      });
  }, []);

  // 네이버 지도 초기화
  useEffect(() => {
    if (!mapRef.current || !isNaverLoaded || typeof naver === 'undefined') {
      return;
    }

    try {
      console.log('네이버 지도 초기화 중...');
      const mapInstance = new naver.maps.Map(mapRef.current, {
        center: new naver.maps.LatLng(37.5665, 126.9780), // 서울시청 좌표
        minZoom: 13,
        maxZoom: 15,
        zoomControl: true
      });
      
      // 초기 줌 레벨 설정
      mapInstance.setZoom(13);

      console.log('네이버 지도 초기화 성공!');
      setMap(mapInstance);
    } catch (error) {
      console.error('네이버 지도 초기화 실패:', error);
    }
  }, [isNaverLoaded]);

  // GeoJSON 데이터 로드
  useEffect(() => {
    if (!map) return;

    console.log('GeoJSON 데이터 로드 시작...');

    async function loadGeoJson(type: LayerType): Promise<GeoJsonData | null> {
      try {
        // 파일 경로 수정 - public 폴더의 geo 디렉토리
        const response = await fetch(`/geo/${type}_11215.geojson`);
        if (!response.ok) {
          console.error(`${type} GeoJSON 파일을 찾을 수 없습니다. 상태: ${response.status}`);
          return null;
        }
        const data = await response.json();
        console.log(`${type} GeoJSON 데이터 로드 성공!`, data.features.length);
        return data;
      } catch (error) {
        console.error(`${type} GeoJSON 로드 실패:`, error);
        return null;
      }
    }

    async function createGeoJsonLayer(type: LayerType): Promise<GeoJsonLayer | null> {
      const data = await loadGeoJson(type);
      if (!data) return null;

      const features = data.features;
      const polygons: naver.maps.Polygon[] = [];
      const circles: naver.maps.Circle[] = [];

      features.forEach(feature => {
        const geometry = feature.geometry;

        if (geometry.type === 'Point') {
          const [lng, lat] = geometry.coordinates as number[];
          const circle = new naver.maps.Circle({
            center: new naver.maps.LatLng(lat, lng),
            radius: styles[type].radius || 5,
            fillColor: styles[type].fillColor,
            fillOpacity: styles[type].fillOpacity,
            strokeColor: styles[type].strokeColor,
            strokeWeight: styles[type].strokeWeight,
            strokeOpacity: styles[type].strokeOpacity,
            map: layers[type] ? map : null
          });
          circles.push(circle);
        } else if (geometry.type === 'Polygon') {
          const coordinates = geometry.coordinates as number[][][];
          const paths = coordinates[0].map(coord => 
            new naver.maps.LatLng(coord[1], coord[0])
          );
          
          const polygon = new naver.maps.Polygon({
            paths: [paths], // 배열로 감싸 2차원 배열로 만듦
            fillColor: styles[type].fillColor,
            fillOpacity: styles[type].fillOpacity,
            strokeColor: styles[type].strokeColor,
            strokeWeight: styles[type].strokeWeight,
            strokeOpacity: styles[type].strokeOpacity,
            map: layers[type] ? map : null
          });
          polygons.push(polygon);
        }
      });

      return { polygons, circles };
    }

    async function initializeLayers(): Promise<void> {
      const layerTypes: LayerType[] = ['node', 'street', 'way', 'crossing'];
      const updatedLayers: GeoJsonLayers = {
        node: null,
        street: null,
        way: null,
        crossing: null
      };
      
      for (const type of layerTypes) {
        updatedLayers[type] = await createGeoJsonLayer(type);
      }
      
      setGeoJsonLayers(updatedLayers);
      console.log('GeoJSON 레이어 초기화 완료!');
    }

    initializeLayers();
  }, [map, layers]); // layers 의존성 추가

  // 레이어 토글 핸들러
  const handleLayerToggle = (type: LayerType): void => {
    setLayers(prevLayers => {
      const newLayers = { ...prevLayers, [type]: !prevLayers[type] };
      
      // 레이어 가시성 업데이트
      if (geoJsonLayers[type]) {
        const { polygons, circles } = geoJsonLayers[type]!;
        const visibleMap = newLayers[type] ? map : null;
        
        polygons.forEach(polygon => polygon.setMap(visibleMap));
        circles.forEach(circle => circle.setMap(visibleMap));
      }
      
      return newLayers;
    });
  };

  return (
    <div className="container">
      <div className="sidebar">
        <h2>레이어 컨트롤</h2>
        <div className="version-info">버전: {APP_VERSION}</div>
        <div className="layer-controls">
          <div className="control-item">
            <input 
              type="checkbox" 
              id="node-toggle" 
              checked={layers.node}
              onChange={() => handleLayerToggle('node')}
            />
            <label htmlFor="node-toggle" className="node-label">Node</label>
          </div>
          <div className="control-item">
            <input 
              type="checkbox" 
              id="street-toggle" 
              checked={layers.street}
              onChange={() => handleLayerToggle('street')}
            />
            <label htmlFor="street-toggle" className="street-label">Street</label>
          </div>
          <div className="control-item">
            <input 
              type="checkbox" 
              id="way-toggle" 
              checked={layers.way}
              onChange={() => handleLayerToggle('way')}
            />
            <label htmlFor="way-toggle" className="way-label">Way</label>
          </div>
          <div className="control-item">
            <input 
              type="checkbox" 
              id="crossing-toggle" 
              checked={layers.crossing}
              onChange={() => handleLayerToggle('crossing')}
            />
            <label htmlFor="crossing-toggle" className="crossing-label">Crossing</label>
          </div>
        </div>
      </div>
      <div id="map" ref={mapRef}></div>
    </div>
  );
};

export default App;
