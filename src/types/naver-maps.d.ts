declare namespace naver {
  namespace maps {
    class Map {
      constructor(mapDiv: string | HTMLElement, mapOptions?: MapOptions);
      setOptions(key: string | MapOptions, value?: any): this;
      setCenter(center: Coord | CoordLiteral): this;
      getCenter(): LatLng;
      setZoom(zoom: number, effect?: boolean): this;
      getZoom(): number;
    }

    interface MapOptions {
      background?: string;
      baseTileOpacity?: number;
      bounds?: Bounds | BoundsLiteral;
      center?: Coord | CoordLiteral;
      disableDoubleClickZoom?: boolean;
      disableDoubleTapZoom?: boolean;
      disableKineticPan?: boolean;
      disableTwoFingerTapZoom?: boolean;
      draggable?: boolean;
      keyboardShortcuts?: boolean;
      logoControl?: boolean;
      logoControlOptions?: LogoControlOptions;
      mapDataControl?: boolean;
      mapDataControlOptions?: MapDataControlOptions;
      mapTypeControl?: boolean;
      mapTypeControlOptions?: MapTypeControlOptions;
      mapTypeId?: MapTypeId;
      maxBounds?: Bounds | BoundsLiteral;
      maxZoom?: number;
      minZoom?: number;
      padding?: Padding;
      pinchZoom?: boolean;
      resizeOrigin?: Position;
      scaleControl?: boolean;
      scaleControlOptions?: ScaleControlOptions;
      scrollWheel?: boolean;
      size?: Size | SizeLiteral;
      tileSpare?: number;
      tileTransition?: boolean;
      tileDuration?: number;
      zoomControl?: boolean;
      zoomControlOptions?: ZoomControlOptions;
      zoomOrigin?: Position | PositionLiteral;
    }

    interface LogoControlOptions {
      position?: Position | PositionLiteral;
    }

    interface MapDataControlOptions {
      position?: Position | PositionLiteral;
    }

    interface MapTypeControlOptions {
      position?: Position | PositionLiteral;
      style?: MapTypeControlStyle;
      mapTypeIds?: MapTypeId[];
    }

    interface ScaleControlOptions {
      position?: Position | PositionLiteral;
    }

    interface ZoomControlOptions {
      position?: Position | PositionLiteral;
      style?: ZoomControlStyle;
    }

    type MapTypeId = string | 'normal' | 'terrain' | 'satellite' | 'hybrid';
    type MapTypeControlStyle = number | 0 | 1;
    type ZoomControlStyle = number | 0 | 1;

    interface Padding {
      top: number;
      right: number;
      bottom: number;
      left: number;
    }

    class Point {
      constructor(x: number, y: number);
      x: number;
      y: number;
      clone(): Point;
      equals(point: Point): boolean;
      destinationPoint(angle: number, radius: number): Point;
      add(x: number, y: number): Point;
      subtract(x: number, y: number): Point;
      multiply(x: number, y: number): Point;
      divide(x: number, y: number): Point;
      toString(): string;
    }

    class PointBounds {
      constructor(minPoint: Point, maxPoint: Point);
      constructor(points: Point[]);
      minX(): number;
      minY(): number;
      maxX(): number;
      maxY(): number;
    }

    class LatLng {
      constructor(lat: number, lng: number);
      lat(): number;
      lng(): number;
      equals(latLng: LatLng): boolean;
      toString(): string;
      toPoint(): Point;
      destinationPoint(angle: number, meter: number): LatLng;
      toArray(): [number, number];
    }

    class LatLngBounds {
      constructor(sw: LatLng, ne: LatLng);
      constructor(latLngs: LatLng[]);
      getCenter(): LatLng;
      getNorthEast(): LatLng;
      getSouthWest(): LatLng;
      extend(latlng: LatLng): this;
      toString(): string;
      equals(bounds: LatLngBounds): boolean;
      toArray(): [LatLng, LatLng];
    }

    type CoordLiteral = [number, number] | { x: number; y: number } | { lat: number; lng: number };
    type BoundsLiteral = [LatLng, LatLng] | [number, number, number, number] | { north: number; east: number; south: number; west: number };
    type PositionLiteral = { x: number; y: number } | [number, number];
    type SizeLiteral = { width: number; height: number } | [number, number];
    type Coord = LatLng | Point;
    type Bounds = LatLngBounds | PointBounds;
    type Position = Position | Point;
    type Size = Size;

    class Size {
      constructor(width: number, height: number);
      width: number;
      height: number;
      clone(): Size;
      equals(size: Size): boolean;
      toString(): string;
    }

    class Circle {
      constructor(options?: CircleOptions);
      setOptions(key: string | CircleOptions, value?: any): this;
      setMap(map: Map | null): this;
      getMap(): Map | null;
      getCenter(): LatLng;
      setCenter(center: Coord | CoordLiteral): this;
      getRadius(): number;
      setRadius(radius: number): this;
      getBounds(): LatLngBounds;
      getDrawingRect(): LatLngBounds;
    }

    interface CircleOptions {
      map?: Map | null;
      center?: Coord | CoordLiteral;
      radius?: number;
      strokeWeight?: number;
      strokeOpacity?: number;
      strokeColor?: string;
      strokeStyle?: string;
      strokeLineCap?: string;
      strokeLineJoin?: string;
      fillColor?: string;
      fillOpacity?: number;
      clickable?: boolean;
      visible?: boolean;
      zIndex?: number;
    }

    class Polygon {
      constructor(options?: PolygonOptions);
      setOptions(key: string | PolygonOptions, value?: any): this;
      setMap(map: Map | null): this;
      getMap(): Map | null;
      getPaths(): any[][];
      setPaths(paths: any[][]): this;
      getAreaSize(): number;
      getBounds(): LatLngBounds;
    }

    interface PolygonOptions {
      map?: Map | null;
      paths?: any[][];
      strokeWeight?: number;
      strokeOpacity?: number;
      strokeColor?: string;
      strokeStyle?: string;
      strokeLineCap?: string;
      strokeLineJoin?: string;
      fillColor?: string;
      fillOpacity?: number;
      clickable?: boolean;
      visible?: boolean;
      zIndex?: number;
    }
  }
}

declare interface Window {
  naver: typeof naver;
} 