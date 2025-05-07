# GIS 예제 프로젝트

네이버 지도 API와 GeoJSON 데이터를 활용한 지도 시각화 예제 프로젝트입니다.

## 프로젝트 구조

- `gis-app/`: React와 TypeScript로 구현된 웹 애플리케이션
  - `public/geo/`: GeoJSON 데이터 파일들
  - `src/`: 소스 코드
    - `types/`: TypeScript 타입 정의

## 주요 기능

- 네이버 지도와 GeoJSON 데이터를 결합한 시각화
- Node, Street, Way, Crossing 레이어 토글 기능
- TypeScript를 활용한 타입 안전성
- 환경 변수를 통한 API 키 보안 관리

## 시작하기

1. `.env` 파일을 생성하고 네이버 지도 API 클라이언트 ID 설정:
   ```
   REACT_APP_NAVER_CLIENT_ID=your_client_id
   ```

2. 애플리케이션 설치 및 실행:
   ```bash
   cd gis-app
   npm install
   npm start
   ```

3. 브라우저에서 `http://localhost:3000` 접속

## 데이터 소스

- GeoJSON 파일들은 `gis-app/public/geo/` 디렉토리에 위치
- 다음 레이어 데이터가 포함됨:
  - Node
  - Street
  - Way
  - Crossing

## 보안 참고사항

- API 키는 `.env` 파일에 저장되며 `.gitignore`에 의해 Git에서 제외됨
- 실제 배포 시 네이버 클라우드 플랫폼에서 도메인 제한 설정 권장 