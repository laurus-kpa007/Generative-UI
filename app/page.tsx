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
          content: 'Sorry, an error occurred. Please check your API configuration.',
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
          Generative UI Chat
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Powered by Qwen LLM and Vercel AI SDK
        </p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
        {messages.length === 0 && (
          <div className="text-center py-8 max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-3">
              Welcome to Generative UI Demo
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              Click any example below to see AI-generated UI components in action! 🚀
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {[
                { emoji: '📈', text: 'Show me Apple stock price', category: 'Finance' },
                { emoji: '☀️', text: 'What\'s the weather in Seoul?', category: 'Weather' },
                { emoji: '📱', text: 'Show me iPhone 15 Pro product', category: 'Product' },
                { emoji: '✈️', text: 'Find flights from ICN to LAX', category: 'Travel' },
                { emoji: '🍝', text: 'Show me a recipe for Spaghetti Carbonara', category: 'Recipe' },
                { emoji: '📰', text: 'Show me latest tech news', category: 'News' },
                { emoji: '🏨', text: 'Find hotels in Tokyo', category: 'Hotel' },
                { emoji: '🎭', text: 'Show me upcoming concerts in Seoul', category: 'Event' },
                { emoji: '🍕', text: 'Find Italian restaurants nearby', category: 'Restaurant' },
                { emoji: '🎬', text: 'Show me info about The Shawshank Redemption', category: 'Movie' },
                { emoji: '📚', text: 'Tell me about the book 1984 by George Orwell', category: 'Book' },
                { emoji: '💪', text: 'Suggest a workout routine for beginners', category: 'Exercise' },
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
              💡 Tip: Each card demonstrates a different type of AI-generated UI component
            </p>
          </div>
        )}

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

        {isLoading && (
          <div className="flex justify-start">
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
        <form onSubmit={handleSubmit} className="flex gap-3">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Type your message..."
            disabled={isLoading}
            className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  )
}
