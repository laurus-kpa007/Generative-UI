# Generative UI with Qwen LLM

Vercel의 AI 템플릿을 참고하여 만든 Generative UI 데모 프로젝트입니다. 오픈소스 LLM인 Qwen을 사용하여 동적으로 UI 컴포넌트를 생성하는 채팅 인터페이스를 구현했습니다.

## 주요 기능

- **Generative UI**: AI가 대화 내용에 따라 동적으로 React 컴포넌트를 생성
- **오픈소스 LLM**: Qwen 모델 사용 (Alibaba Cloud의 강력한 LLM)
- **React Server Components**: Next.js의 RSC를 활용한 서버 사이드 렌더링
- **Tool Calling**: AI가 적절한 시각화 도구를 선택하여 정보 표시
- **실시간 스트리밍**: Vercel AI SDK의 streamUI를 통한 실시간 UI 업데이트

## 지원하는 UI 컴포넌트

1. **주식 카드** - 주식 심볼, 가격, 변동률 표시
2. **날씨 카드** - 도시별 날씨 정보 표시
3. **상품 카드** - 제품 정보 및 가격 표시
4. **항공편 카드** - 항공편 정보 표시

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

#### 옵션 A: Alibaba Cloud DashScope 사용 (권장)

1. [DashScope Console](https://dashscope.console.aliyun.com/)에서 API 키 발급
2. `.env` 파일에 키 입력:
   ```
   DASHSCOPE_API_KEY=your-api-key-here
   ```

#### 옵션 B: 로컬 Qwen 모델 사용 (Ollama/vLLM)

로컬에서 Qwen 모델을 실행하는 경우:

```bash
# Ollama 예시
ollama pull qwen2.5

# .env 설정
QWEN_BASE_URL=http://localhost:11434/v1
QWEN_API_KEY=ollama
```

그리고 `app/actions.tsx`에서 provider 초기화 부분을 수정:

```typescript
const qwen = createQwen({
  baseURL: process.env.QWEN_BASE_URL,
  apiKey: process.env.QWEN_API_KEY,
})
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

채팅창에서 다음과 같은 질문을 해보세요:

- "Show me Apple stock price" - 주식 카드 생성
- "What's the weather in Seoul?" - 날씨 카드 생성
- "Show me a product: iPhone 15 Pro" - 상품 카드 생성
- "Find flights from ICN to LAX" - 항공편 카드 생성

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

```typescript
const { textStream: aiTextStream, toolCalls } = await streamText({
  model: qwen('qwen-max'),  // 또는 'qwen-plus', 'qwen-turbo' 등
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
