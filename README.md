# Slowth - 모임 서비스

## 프로젝트 소개

쉽고 간단하게 사용할 수 있는 모임 서비스입니다.

## 기술 스택

- Next.js 15 (App Router)
- TypeScript
- pnpm (패키지 매니저)
- ESLint & Prettier
- Husky (Git Hooks)
- Vitest (테스트)

## 시작하기

### 필수 조건

- Node.js 18.0.0 이상
- pnpm

### 설치

```bash
pnpm install
```

### 환경변수 설정정

```
NEXT_PUBLIC_API_URL = https://fe-adv-project-together-dallaem.vercel.app
NEXT_PUBLIC_TEAM_ID = your_teamId
```

### 개발 서버 실행

```bash
pnpm dev
```

### 빌드

```bash
pnpm build
```

## 프로젝트 구조

```
src/
├── app/          # Next.js App Router
├── components/   # React 컴포넌트
├── lib/         # 유틸리티 함수
└── types/       # TypeScript 타입 정의
```
