'use client'

import { useState } from 'react'
import { continueConversation, type Message } from './actions'

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return

    const userMessage: Message = {
      role: 'user',
      content: text,
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const response = await continueConversation([...messages, userMessage])
      setMessages(prev => [...prev, response])
    } catch (error) {
      console.error('Error:', error)
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: '죄송합니다. 오류가 발생했습니다. API 설정을 확인해주세요.',
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await sendMessage(input)
  }

  const handleSuggestionClick = async (suggestion: string) => {
    await sendMessage(suggestion)
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          생성형 UI 채팅
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Qwen LLM과 Vercel AI SDK로 구동됩니다
        </p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
        {/* 항상 표시되는 온보딩 버튼 영역 */}
        <div className="text-center py-8 max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-3">
            생성형 UI 데모에 오신 것을 환영합니다
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            아래 예제를 클릭하면 AI가 생성한 UI 컴포넌트를 바로 확인할 수 있습니다! 🚀
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              { emoji: '📈', text: '애플 주식 가격을 보여줘', category: '금융' },
              { emoji: '☀️', text: '서울 날씨 알려줘', category: '날씨' },
              { emoji: '📱', text: '아이폰 15 Pro 제품 정보 보여줘', category: '상품' },
              { emoji: '✈️', text: '인천에서 LA 가는 항공편 찾아줘', category: '여행' },
              { emoji: '🍝', text: '카르보나라 레시피 알려줘', category: '레시피' },
              { emoji: '📰', text: '최신 기술 뉴스 보여줘', category: '뉴스' },
              { emoji: '🏨', text: '도쿄 호텔 추천해줘', category: '호텔' },
              { emoji: '🎭', text: '서울에서 열리는 콘서트 정보 알려줘', category: '이벤트' },
              { emoji: '🍕', text: '근처 이탈리안 레스토랑 찾아줘', category: '레스토랑' },
              { emoji: '🎬', text: '쇼생크 탈출 영화 정보 알려줘', category: '영화' },
              { emoji: '📚', text: '조지 오웰의 1984 책 정보 보여줘', category: '도서' },
              { emoji: '💪', text: '초보자 운동 루틴 추천해줘', category: '운동' },
            ].map((suggestion, i) => (
              <button
                key={i}
                onClick={() => handleSuggestionClick(suggestion.text)}
                disabled={isLoading}
                className="group relative px-4 py-4 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-md text-left transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl flex-shrink-0">{suggestion.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-semibold text-blue-600 dark:text-blue-400 mb-1">
                      {suggestion.category}
                    </div>
                    <div className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white">
                      {suggestion.text}
                    </div>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/0 via-blue-400/5 to-blue-400/0 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl pointer-events-none" />
              </button>
            ))}
          </div>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-6">
            💡 팁: 각 카드는 서로 다른 타입의 AI 생성 UI 컴포넌트를 보여줍니다
          </p>
        </div>

        {/* 대화 메시지 */}
        {messages.length > 0 && (
          <div className="max-w-5xl mx-auto space-y-4 pt-4 border-t-2 border-gray-300 dark:border-gray-600">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 text-center mb-4">
              대화 내역
            </h3>
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[80%] ${
                    message.role === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700'
                  } rounded-lg px-4 py-3 shadow-sm`}
                >
                  {message.role === 'user' ? (
                    <p className="text-sm">{message.content}</p>
                  ) : (
                    <div className="space-y-3">
                      {message.content && (
                        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                      )}
                      {message.display && <div className="mt-3">{message.display}</div>}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {isLoading && (
          <div className="flex justify-start max-w-5xl mx-auto">
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-3 shadow-sm">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-6 py-4">
        <form onSubmit={handleSubmit} className="flex gap-3 max-w-5xl mx-auto">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="메시지를 입력하세요..."
            disabled={isLoading}
            className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
          >
            전송
          </button>
        </form>
      </div>
    </div>
  )
}
