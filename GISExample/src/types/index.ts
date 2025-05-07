// 네이버 맵 API 윈도우 인터페이스 확장
declare global {
  interface Window {
    naver: typeof naver;
  }
}

// 레이어 타입
export type LayerType = 'node' | 'street' | 'way' | 'crossing';

// 레이어 상태
export interface Layers {
  node: boolean;
  street: boolean;
  way: boolean;
  crossing: boolean;
}

// GeoJSON 데이터 타입
export interface GeoJsonData {
  type: string;
  features: Array<{
    type: string;
    geometry: {
      type: string;
      coordinates: number[] | number[][] | number[][][];
    };
    properties: Record<string, any>;
  }>;
}

// GeoJSON 레이어 타입
export interface GeoJsonLayer {
  polygons: Array<naver.maps.Polygon>;
  circles: Array<naver.maps.Circle>;
}

// GeoJSON 레이어 상태
export interface GeoJsonLayers {
  node: GeoJsonLayer | null;
  street: GeoJsonLayer | null;
  way: GeoJsonLayer | null;
  crossing: GeoJsonLayer | null;
}

// GeoJSON 타입 정의
export interface GeoJsonFeature {
  type: string;
  properties: Record<string, any>;
  geometry: {
    type: string;
    coordinates: number[] | number[][] | number[][][];
  };
}

// 레이어 관련 타입 정의
export interface LayerStyle {
  fillColor: string;
  fillOpacity: number;
  strokeColor: string;
  strokeWeight: number;
  strokeOpacity: number;
  radius?: number;
} 