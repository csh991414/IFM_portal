# IFM Portal (인터페이스 통합관리 시스템)

보험사 금융 IT 인터페이스를 중앙에서 관리하고 모니터링하는 전문 대시보드 시스템입니다. REST, SOAP, MQ, Batch, SFTP 등 다양한 프로토콜의 트랜잭션을 실시간으로 추적하고 관리합니다.

## 🚀 Key Features

- **Dashboard**: 전체 인터페이스 운영 현황, KPI 카드, 프로토콜별 분포 및 실시간 알림 제공
- **Interface Manager**: 시스템별 인터페이스 등록 및 상세 설정 관리
- **Real-time Monitoring**: 1.8초 주기의 실시간 트랜잭션 스트림 시뮬레이션 및 상태 추적
- **Log Viewer**: 다크 모드 기반의 터미널 스타일 로그 조회 시스템
- **Reprocess**: 실패한 트랜잭션의 재처리 워크플로우 관리 (Pending -> Processing -> Done)

## 🛠 Tech Stack

- **Frontend**: React 18, Vite
- **Styling**: Inline Style Objects (CSS-in-JS pattern)
- **Routing**: React Router DOM v6
- **Database/Auth**: Firebase Firestore & Auth (연동 준비 완료)
- **Design Tokens**: 사용자 정의 디자인 시스템 (`src/styles/tokens.js`)

## 📂 Project Structure

```
src/
├── components/     # 공통 UI 컴포넌트 (Badge, Icon, Sparkline 등)
├── pages/          # 도메인별 메인 페이지 (Dashboard, Monitoring 등)
├── styles/         # 디자인 토큰 및 전역 스타일
├── data/           # Mock 데이터 시뮬레이션
└── firebase/       # Firebase 설정 및 초기화
```

## ⚙️ Installation & Development

```bash
# 의존성 설치
npm install

# 로컬 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build
```

---
*본 프로젝트는 Gemini CLI 바이브코딩 프롬프트를 통해 정교하게 설계된 디자인 스펙을 기반으로 제작되었습니다.*
