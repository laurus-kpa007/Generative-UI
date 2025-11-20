'use server'

import { createStreamableUI, createStreamableValue } from 'ai/rsc'
import { createQwen } from 'qwen-ai-provider'
import { streamText } from 'ai'
import { ReactNode } from 'react'
import { z } from 'zod'
import { StockCard } from '@/components/stock-card'
import { WeatherCard } from '@/components/weather-card'
import { ProductCard } from '@/components/product-card'
import { FlightCard } from '@/components/flight-card'
import { Skeleton } from '@/components/skeleton'

// Initialize Qwen AI provider
const qwen = createQwen({
  apiKey: process.env.DASHSCOPE_API_KEY,
})

// Define available tools for the AI
const tools = {
  showStockPrice: {
    description: 'Display stock price information for a given company',
    parameters: z.object({
      symbol: z.string().describe('Stock symbol (e.g., AAPL, GOOGL)'),
      price: z.number().describe('Current stock price'),
      change: z.number().describe('Percentage change'),
    }),
    generate: async function* ({ symbol, price, change }: {
      symbol: string
      price: number
      change: number
    }) {
      yield <Skeleton />
      await new Promise(resolve => setTimeout(resolve, 1000))
      return <StockCard symbol={symbol} price={price} change={change} />
    },
  },
  showWeather: {
    description: 'Display weather information for a city',
    parameters: z.object({
      city: z.string().describe('City name'),
      temperature: z.number().describe('Temperature in Celsius'),
      condition: z.string().describe('Weather condition'),
    }),
    generate: async function* ({ city, temperature, condition }: {
      city: string
      temperature: number
      condition: string
    }) {
      yield <Skeleton />
      await new Promise(resolve => setTimeout(resolve, 1000))
      return <WeatherCard city={city} temperature={temperature} condition={condition} />
    },
  },
  showProduct: {
    description: 'Display product information',
    parameters: z.object({
      name: z.string().describe('Product name'),
      price: z.number().describe('Product price'),
      description: z.string().describe('Product description'),
      rating: z.number().optional().describe('Product rating (0-5)'),
    }),
    generate: async function* ({ name, price, description, rating }: {
      name: string
      price: number
      description: string
      rating?: number
    }) {
      yield <Skeleton />
      await new Promise(resolve => setTimeout(resolve, 1000))
      return <ProductCard name={name} price={price} description={description} rating={rating} />
    },
  },
  showFlight: {
    description: 'Display flight information',
    parameters: z.object({
      from: z.string().describe('Departure city code'),
      to: z.string().describe('Arrival city code'),
      departure: z.string().describe('Departure time'),
      arrival: z.string().describe('Arrival time'),
      price: z.number().describe('Flight price'),
      airline: z.string().describe('Airline name'),
    }),
    generate: async function* ({ from, to, departure, arrival, price, airline }: {
      from: string
      to: string
      departure: string
      arrival: string
      price: number
      airline: string
    }) {
      yield <Skeleton />
      await new Promise(resolve => setTimeout(resolve, 1000))
      return (
        <FlightCard
          from={from}
          to={to}
          departure={departure}
          arrival={arrival}
          price={price}
          airline={airline}
        />
      )
    },
  },
}

export interface Message {
  role: 'user' | 'assistant'
  content: string
  display?: ReactNode
}

export async function continueConversation(
  history: Message[]
): Promise<Message> {
  'use server'

  const stream = createStreamableUI()
  const textStream = createStreamableValue('')

  ;(async () => {
    const { textStream: aiTextStream, toolCalls } = await streamText({
      model: qwen('qwen-plus'),
      system: `You are a helpful assistant that can display rich UI components.
When users ask about stocks, weather, products, or flights, use the appropriate tool to show visual information.
Be conversational and helpful. Always try to use tools when appropriate to make the response more engaging.`,
      messages: history.map(msg => ({
        role: msg.role,
        content: msg.content,
      })),
      tools,
    })

    let hasToolCall = false

    // Stream the text response
    for await (const delta of aiTextStream) {
      textStream.update(delta)
    }

    // Handle tool calls
    for await (const toolCall of toolCalls) {
      hasToolCall = true
      const tool = tools[toolCall.toolName as keyof typeof tools]
      if (tool && 'generate' in tool) {
        for await (const node of tool.generate(toolCall.args as any)) {
          stream.update(node)
        }
      }
    }

    if (!hasToolCall) {
      stream.done(null)
    } else {
      stream.done()
    }
    textStream.done()
  })()

  return {
    role: 'assistant',
    content: textStream.value,
    display: stream.value,
  }
}
