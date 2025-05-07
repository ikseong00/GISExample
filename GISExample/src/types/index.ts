// GeoJSON 타입 정의
export interface GeoJsonFeature {
  type: string;
  properties: any;
  geometry: {
    type: string;
    coordinates: number[] | number[][] | number[][][] | number[][][][];
  };
}

export interface GeoJsonData {
  type: string;
  features: GeoJsonFeature[];
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

export interface Layers {
  node: boolean;
  street: boolean;
  way: boolean;
  crossing: boolean;
}

export interface GeoJsonLayer {
  polygons: naver.maps.Polygon[];
  circles: naver.maps.Circle[];
}

export interface GeoJsonLayers {
  node: GeoJsonLayer | null;
  street: GeoJsonLayer | null;
  way: GeoJsonLayer | null;
  crossing: GeoJsonLayer | null;
}

export type LayerType = 'node' | 'street' | 'way' | 'crossing'; 