# Generative UI with Qwen LLM

Vercel의 AI 템플릿을 참고하여 만든 Generative UI 데모 프로젝트입니다. 오픈소스 LLM인 Qwen을 사용하여 동적으로 UI 컴포넌트를 생성하는 채팅 인터페이스를 구현했습니다.

## 주요 기능

- **Generative UI**: AI가 대화 내용에 따라 동적으로 React 컴포넌트를 생성
- **12가지 UI 컴포넌트**: 금융, 여행, 날씨, 쇼핑, 음식, 미디어, 이벤트 등 다양한 카테고리
- **인터랙티브 온보딩**: 클릭 한 번으로 모든 컴포넌트를 즉시 테스트
- **오픈소스 LLM**: Qwen 모델 사용 (Alibaba Cloud의 강력한 LLM)
- **React Server Components**: Next.js의 RSC를 활용한 서버 사이드 렌더링
- **Tool Calling**: AI가 적절한 시각화 도구를 선택하여 정보 표시
- **실시간 스트리밍**: Vercel AI SDK의 streamUI를 통한 실시간 UI 업데이트
- **반응형 디자인**: 모바일, 태블릿, 데스크톱 모두 지원

## 지원하는 UI 컴포넌트 (총 12개)

### 금융 & 여행
1. **주식 카드** 📈 - 주식 심볼, 가격, 변동률 표시
2. **항공편 카드** ✈️ - 항공편 정보, 출발/도착 시간, 가격
3. **호텔 카드** 🏨 - 호텔 정보, 별점, 편의시설, 가격

### 날씨 & 위치
4. **날씨 카드** ☀️ - 도시별 날씨 정보, 온도, 날씨 상태
5. **레스토랑 카드** 🍕 - 레스토랑 정보, 요리 종류, 평점, 영업 상태

### 쇼핑 & 상품
6. **상품 카드** 📱 - 제품 정보, 가격, 설명, 평점

### 음식 & 레시피
7. **레시피 카드** 🍝 - 요리법, 조리 시간, 인분, 난이도, 재료

### 미디어 & 엔터테인먼트
8. **영화 카드** 🎬 - 영화 정보, 평점, 장르, 감독, 줄거리
9. **책 카드** 📚 - 도서 정보, 저자, 평점, 출판 연도, 설명
10. **뉴스 카드** 📰 - 뉴스 기사, 출처, 카테고리, 요약

### 이벤트 & 활동
11. **이벤트 카드** 🎭 - 이벤트 정보, 일시, 장소, 참석자 수
12. **운동 카드** 💪 - 운동 루틴, 소요 시간, 소모 칼로리, 난이도

## 기술 스택

- **프레임워크**: Next.js 15 with App Router
- **언어**: TypeScript
- **AI SDK**: Vercel AI SDK 4.0
- **LLM Provider**: Qwen AI Provider
- **스타일링**: Tailwind CSS
- **검증**: Zod

## 설치 및 실행

### 1. 의존성 설치

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 2. 환경 변수 설정

`.env.example` 파일을 참고하여 `.env` 파일을 생성하세요:

```bash
cp .env.example .env
```

다음 중 하나의 방법으로 API 키를 설정할 수 있습니다:

#### 옵션 A: 로컬 Qwen 모델 사용 - Ollama (권장)

로컬에서 Ollama를 사용하여 Qwen 모델을 실행:

```bash
# 1. Ollama 설치 (https://ollama.ai/)
# 2. Qwen 모델 다운로드
ollama pull qwen2.5:8b

# 3. Ollama 실행 (자동으로 백그라운드에서 실행됨)
ollama run qwen2.5:8b

# 4. .env 파일 생성 (이미 기본값으로 설정되어 있음)
cp .env.example .env
```

`.env` 파일 내용:
```
QWEN_BASE_URL=http://localhost:11434/v1
QWEN_API_KEY=ollama
```

#### 옵션 B: Alibaba Cloud DashScope 사용

클라우드 API를 사용하는 경우:

1. [DashScope Console](https://dashscope.console.aliyun.com/)에서 API 키 발급
2. `.env` 파일 수정:
   ```
   QWEN_BASE_URL=https://dashscope-intl.aliyuncs.com/compatible-mode/v1
   QWEN_API_KEY=your-api-key-here
   ```
3. `app/actions.tsx`에서 모델명을 변경:
   ```typescript
   model: qwen('qwen-plus')  // 또는 'qwen-max', 'qwen-turbo'
   ```

### 3. 개발 서버 실행

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

## 사용 예시

앱을 실행하면 **인터랙티브 온보딩 화면**이 나타납니다. 12개의 예시 버튼을 클릭하면 즉시 해당 UI 컴포넌트가 생성됩니다!

또는 채팅창에 직접 입력할 수도 있습니다:

### 금융 & 여행
- "Show me Apple stock price" - 주식 카드
- "Find flights from ICN to LAX" - 항공편 카드
- "Find hotels in Tokyo" - 호텔 카드

### 날씨 & 위치
- "What's the weather in Seoul?" - 날씨 카드
- "Find Italian restaurants nearby" - 레스토랑 카드

### 쇼핑 & 상품
- "Show me iPhone 15 Pro product" - 상품 카드

### 음식 & 레시피
- "Show me a recipe for Spaghetti Carbonara" - 레시피 카드

### 미디어 & 엔터테인먼트
- "Show me info about The Shawshank Redemption" - 영화 카드
- "Tell me about the book 1984 by George Orwell" - 책 카드
- "Show me latest tech news" - 뉴스 카드

### 이벤트 & 활동
- "Show me upcoming concerts in Seoul" - 이벤트 카드
- "Suggest a workout routine for beginners" - 운동 카드

## 프로젝트 구조

```
.
├── app/
│   ├── actions.tsx          # Server Actions (AI 로직 및 도구 정의)
│   ├── page.tsx             # 메인 채팅 인터페이스
│   ├── layout.tsx           # 앱 레이아웃
│   └── globals.css          # 글로벌 스타일
├── components/
│   ├── stock-card.tsx       # 주식 정보 카드
│   ├── weather-card.tsx     # 날씨 카드
│   ├── product-card.tsx     # 상품 카드
│   ├── flight-card.tsx      # 항공편 카드
│   ├── recipe-card.tsx      # 레시피 카드
│   ├── news-card.tsx        # 뉴스 카드
│   ├── hotel-card.tsx       # 호텔 카드
│   ├── event-card.tsx       # 이벤트 카드
│   ├── restaurant-card.tsx  # 레스토랑 카드
│   ├── movie-card.tsx       # 영화 카드
│   ├── book-card.tsx        # 책 카드
│   ├── exercise-card.tsx    # 운동 카드
│   └── skeleton.tsx         # 로딩 스켈레톤
└── package.json
```

## Generative UI 작동 원리

1. **사용자 입력**: 사용자가 채팅창에 메시지 입력
2. **AI 분석**: Qwen LLM이 메시지를 분석하고 적절한 도구(tool) 선택
3. **컴포넌트 생성**: Server Action이 선택된 도구를 실행하여 React 컴포넌트 생성
4. **스트리밍**: 생성된 컴포넌트가 클라이언트로 스트리밍
5. **렌더링**: React Server Component가 클라이언트에서 렌더링

## 커스터마이징

### 새로운 UI 컴포넌트 추가

1. `components/` 폴더에 새 컴포넌트 생성
2. `app/actions.tsx`의 `tools` 객체에 새 도구 추가
3. Zod 스키마로 파라미터 정의
4. `generate` 함수 구현

예시:

```typescript
const tools = {
  // ... 기존 도구들
  showNewComponent: {
    description: '새 컴포넌트 표시',
    parameters: z.object({
      data: z.string().describe('데이터'),
    }),
    generate: async function* ({ data }) {
      yield <Skeleton />
      await new Promise(resolve => setTimeout(resolve, 1000))
      return <YourNewComponent data={data} />
    },
  },
}
```

### 다른 LLM 모델 사용

`app/actions.tsx`에서 모델을 변경할 수 있습니다:

**Ollama 모델 변경:**
```typescript
const result = await streamUI({
  model: qwen('qwen2.5:8b'),  // 또는 'qwen2.5:14b', 'qwen2.5:32b' 등
  // ...
})
```

**DashScope 클라우드 모델 사용:**
```typescript
const result = await streamUI({
  model: qwen('qwen-plus'),  // 또는 'qwen-max', 'qwen-turbo' 등
  // ...
})
```

## 참고 자료

- [Vercel AI SDK 문서](https://sdk.vercel.ai/docs)
- [Qwen AI Provider](https://github.com/Younis-Ahmed/qwen-ai-provider)
- [Vercel AI SDK Generative UI 예제](https://github.com/vercel-labs/ai-sdk-preview-rsc-genui)
- [Qwen 모델](https://github.com/QwenLM/Qwen)

## 라이선스

MIT

## 기여

이슈와 PR을 환영합니다!
