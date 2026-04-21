# 🔌 IFM Portal
### 보험사 금융 IT 인터페이스 통합관리 시스템

<br/>

> 내부 핵심 시스템과 외부 기관(금감원, 제휴사 등) 간 다수의 인터페이스를  
> 단일 화면에서 제어하는 **중앙화된 통합관리 플랫폼**

<br/>

![version](https://img.shields.io/badge/version-2.4.1-blue?style=flat-square)
![stack](https://img.shields.io/badge/React-18.3-61DAFB?style=flat-square&logo=react)
![firebase](https://img.shields.io/badge/Firebase-Firestore-FFCA28?style=flat-square&logo=firebase)
![deploy](https://img.shields.io/badge/Cloudflare-Pages-F38020?style=flat-square&logo=cloudflare)
![license](https://img.shields.io/badge/license-MIT-green?style=flat-square)

---

## 📌 프로젝트 개요

보험사는 금감원, 제휴사, 재보험사, 내부 ERP 등 수십 개의 외부·내부 시스템과  
REST, SOAP, MQ, Batch, SFTP 등 다양한 프로토콜로 연동되어 있습니다.

**IFM Portal**은 이 모든 인터페이스를 하나의 웹 화면에서 관리할 수 있는  
경량 통합관리 대시보드입니다.

| 기능 | 설명 |
|---|---|
| 📊 **대시보드** | 전체 인터페이스 현황, KPI, 프로토콜 분포, 최근 알림 |
| 🔗 **인터페이스 관리** | 인터페이스 등록·편집·검색·필터 |
| 📡 **실시간 모니터링** | 트랜잭션 실시간 스트림, TPS 현황 |
| 📋 **로그 조회** | 레벨별 필터링, 다크 터미널 UI |
| 🔄 **재처리** | 실패 트랜잭션 개별·일괄 재처리 |

---

## 🖥️ 화면 구성

```
┌─────────────┬──────────────────────────────────────┐
│             │  TopBar (시스템 상태 / 알림 / 사용자) │
│  Sidebar    ├──────────────────────────────────────┤
│             │                                      │
│  대시보드   │         페이지 컨텐츠                │
│  인터페이스 │                                      │
│  모니터링   │   Dashboard / Interface /            │
│  로그       │   Monitoring / Log / Reprocess       │
│  재처리 🔴  │                                      │
│             │                                      │
└─────────────┴──────────────────────────────────────┘
```

---

## 🛠️ 기술 스택

| 분류 | 기술 |
|---|---|
| **Frontend** | React 18, Vite, React Router v6 |
| **Database** | Firebase Firestore |
| **인증** | Firebase Auth |
| **배포** | Cloudflare Pages |
| **폰트** | Noto Sans KR, JetBrains Mono |

---

## 🚀 시작하기

### 사전 요구사항

- Node.js 18 이상
- Firebase 프로젝트 ([console.firebase.google.com](https://console.firebase.google.com))

### 설치 및 실행

```bash
# 1. 저장소 클론
git clone https://github.com/your-username/ifm-portal.git
cd ifm-portal

# 2. 패키지 설치
npm install

# 3. 환경변수 설정
cp .env.example .env
# .env 파일에 Firebase 설정값 입력

# 4. 개발 서버 실행
npm run dev
```

### 환경변수 설정 (`.env`)

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

---

## 📁 프로젝트 구조

```
ifm-portal/
├── src/
│   ├── components/
│   │   ├── Icon.jsx          # SVG 아이콘
│   │   ├── ProtoBadge.jsx    # 프로토콜 뱃지 (REST/SOAP/MQ/Batch/SFTP)
│   │   ├── StatusBadge.jsx   # 상태 뱃지 (정상/오류/경고/비활성)
│   │   ├── Spark.jsx         # 미니 스파크라인 차트
│   │   ├── Sidebar.jsx       # 좌측 네비게이션
│   │   └── TopBar.jsx        # 상단 헤더
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   ├── InterfaceManager.jsx
│   │   ├── Monitoring.jsx
│   │   ├── LogViewer.jsx
│   │   └── Reprocess.jsx
│   ├── firebase/
│   │   └── config.js
│   ├── hooks/
│   │   ├── useInterfaces.js
│   │   └── useLogs.js
│   ├── data/
│   │   └── mockData.js       # 목 데이터
│   ├── styles/
│   │   └── tokens.js         # 디자인 토큰
│   ├── App.jsx
│   └── main.jsx
├── .env
├── .env.example
└── package.json
```

---

## 🗄️ Firestore 데이터 모델

```
/interfaces/{ifId}
  id, name, system, protocol, method,
  status, tps, errRate, latency, target,
  createdAt, updatedAt

/transactions/{txId}
  txId, ifId, ifName, protocol,
  status, latency, size, createdAt

/logs/{logId}
  level, txId, ifName, msg, duration, createdAt

/reprocess/{rprId}
  txId, ifName, protocol, reason,
  retries, status, failedAt, processedAt
```

---

## 🌐 지원 프로토콜

| 프로토콜 | 용도 |
|---|---|
| 🔵 **REST** | HTTP API 연동 (금감원, 신용조회 등) |
| 🟣 **SOAP** | 레거시 웹서비스 연동 (제휴사) |
| 🟠 **MQ** | 메시지 큐 비동기 처리 (알림, 심사) |
| 🟢 **Batch** | 야간 배치 작업 (청구, 세무) |
| 🔴 **SFTP** | 파일 전송 (재보험사, 국세청) |

---

## ☁️ 배포 (Cloudflare Pages)

```bash
# 빌드
npm run build

# Cloudflare Pages 설정
# - Framework preset: Vite
# - Build command: npm run build
# - Build output directory: dist
# - 환경변수: VITE_FIREBASE_* 값들 입력
```

GitHub 저장소 연동 시 `main` 브랜치 push마다 자동 배포됩니다.
