import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Generative UI with Qwen',
  description: 'A generative UI chatbot powered by Qwen LLM and Vercel AI SDK',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
