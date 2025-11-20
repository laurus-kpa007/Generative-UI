'use server'

import { createStreamableUI, streamUI } from 'ai/rsc'
import { createQwen } from 'qwen-ai-provider'
import { ReactNode } from 'react'
import { z } from 'zod'
import { StockCard } from '@/components/stock-card'
import { WeatherCard } from '@/components/weather-card'
import { ProductCard } from '@/components/product-card'
import { FlightCard } from '@/components/flight-card'
import { RecipeCard } from '@/components/recipe-card'
import { NewsCard } from '@/components/news-card'
import { HotelCard } from '@/components/hotel-card'
import { EventCard } from '@/components/event-card'
import { RestaurantCard } from '@/components/restaurant-card'
import { MovieCard } from '@/components/movie-card'
import { BookCard } from '@/components/book-card'
import { ExerciseCard } from '@/components/exercise-card'
import { Skeleton } from '@/components/skeleton'

// Initialize Qwen AI provider with Ollama
const qwen = createQwen({
  baseURL: process.env.QWEN_BASE_URL || 'http://localhost:11434/v1',
  apiKey: process.env.QWEN_API_KEY || 'ollama',
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
  showRecipe: {
    description: 'Display recipe information with cooking details',
    parameters: z.object({
      name: z.string().describe('Recipe name'),
      cookTime: z.number().describe('Cooking time in minutes'),
      servings: z.number().describe('Number of servings'),
      difficulty: z.enum(['Easy', 'Medium', 'Hard']).describe('Difficulty level'),
      ingredients: z.array(z.string()).describe('List of ingredients'),
    }),
    generate: async function* ({ name, cookTime, servings, difficulty, ingredients }: {
      name: string
      cookTime: number
      servings: number
      difficulty: 'Easy' | 'Medium' | 'Hard'
      ingredients: string[]
    }) {
      yield <Skeleton />
      await new Promise(resolve => setTimeout(resolve, 1000))
      return (
        <RecipeCard
          name={name}
          cookTime={cookTime}
          servings={servings}
          difficulty={difficulty}
          ingredients={ingredients}
        />
      )
    },
  },
  showNews: {
    description: 'Display news article information',
    parameters: z.object({
      title: z.string().describe('Article title'),
      source: z.string().describe('News source'),
      publishedAt: z.string().describe('Publication date/time'),
      summary: z.string().describe('Article summary'),
      category: z.string().optional().describe('News category'),
    }),
    generate: async function* ({ title, source, publishedAt, summary, category }: {
      title: string
      source: string
      publishedAt: string
      summary: string
      category?: string
    }) {
      yield <Skeleton />
      await new Promise(resolve => setTimeout(resolve, 1000))
      return (
        <NewsCard
          title={title}
          source={source}
          publishedAt={publishedAt}
          summary={summary}
          category={category}
        />
      )
    },
  },
  showHotel: {
    description: 'Display hotel information with ratings and amenities',
    parameters: z.object({
      name: z.string().describe('Hotel name'),
      location: z.string().describe('Hotel location'),
      rating: z.number().describe('User rating (0-5)'),
      pricePerNight: z.number().describe('Price per night'),
      amenities: z.array(z.string()).describe('Hotel amenities'),
      starRating: z.number().describe('Star rating (1-5)'),
    }),
    generate: async function* ({ name, location, rating, pricePerNight, amenities, starRating }: {
      name: string
      location: string
      rating: number
      pricePerNight: number
      amenities: string[]
      starRating: number
    }) {
      yield <Skeleton />
      await new Promise(resolve => setTimeout(resolve, 1000))
      return (
        <HotelCard
          name={name}
          location={location}
          rating={rating}
          pricePerNight={pricePerNight}
          amenities={amenities}
          starRating={starRating}
        />
      )
    },
  },
  showEvent: {
    description: 'Display event or calendar information',
    parameters: z.object({
      title: z.string().describe('Event title'),
      date: z.string().describe('Event date'),
      time: z.string().describe('Event time'),
      location: z.string().describe('Event location'),
      category: z.string().describe('Event category'),
      attendees: z.number().optional().describe('Number of attendees'),
    }),
    generate: async function* ({ title, date, time, location, category, attendees }: {
      title: string
      date: string
      time: string
      location: string
      category: string
      attendees?: number
    }) {
      yield <Skeleton />
      await new Promise(resolve => setTimeout(resolve, 1000))
      return (
        <EventCard
          title={title}
          date={date}
          time={time}
          location={location}
          category={category}
          attendees={attendees}
        />
      )
    },
  },
  showRestaurant: {
    description: 'Display restaurant information',
    parameters: z.object({
      name: z.string().describe('Restaurant name'),
      cuisine: z.string().describe('Cuisine type'),
      rating: z.number().describe('Rating (0-5)'),
      priceRange: z.string().describe('Price range (e.g., $$, $$$)'),
      location: z.string().describe('Restaurant location'),
      openNow: z.boolean().describe('Whether restaurant is open now'),
    }),
    generate: async function* ({ name, cuisine, rating, priceRange, location, openNow }: {
      name: string
      cuisine: string
      rating: number
      priceRange: string
      location: string
      openNow: boolean
    }) {
      yield <Skeleton />
      await new Promise(resolve => setTimeout(resolve, 1000))
      return (
        <RestaurantCard
          name={name}
          cuisine={cuisine}
          rating={rating}
          priceRange={priceRange}
          location={location}
          openNow={openNow}
        />
      )
    },
  },
  showMovie: {
    description: 'Display movie information',
    parameters: z.object({
      title: z.string().describe('Movie title'),
      year: z.number().describe('Release year'),
      rating: z.number().describe('Rating (0-10)'),
      genre: z.string().describe('Movie genre'),
      duration: z.number().describe('Duration in minutes'),
      director: z.string().describe('Director name'),
      plot: z.string().describe('Plot summary'),
    }),
    generate: async function* ({ title, year, rating, genre, duration, director, plot }: {
      title: string
      year: number
      rating: number
      genre: string
      duration: number
      director: string
      plot: string
    }) {
      yield <Skeleton />
      await new Promise(resolve => setTimeout(resolve, 1000))
      return (
        <MovieCard
          title={title}
          year={year}
          rating={rating}
          genre={genre}
          duration={duration}
          director={director}
          plot={plot}
        />
      )
    },
  },
  showBook: {
    description: 'Display book information',
    parameters: z.object({
      title: z.string().describe('Book title'),
      author: z.string().describe('Author name'),
      rating: z.number().describe('Rating (0-5)'),
      pages: z.number().describe('Number of pages'),
      genre: z.string().describe('Book genre'),
      publishedYear: z.number().describe('Publication year'),
      description: z.string().describe('Book description'),
    }),
    generate: async function* ({ title, author, rating, pages, genre, publishedYear, description }: {
      title: string
      author: string
      rating: number
      pages: number
      genre: string
      publishedYear: number
      description: string
    }) {
      yield <Skeleton />
      await new Promise(resolve => setTimeout(resolve, 1000))
      return (
        <BookCard
          title={title}
          author={author}
          rating={rating}
          pages={pages}
          genre={genre}
          publishedYear={publishedYear}
          description={description}
        />
      )
    },
  },
  showExercise: {
    description: 'Display exercise or workout information',
    parameters: z.object({
      name: z.string().describe('Exercise name'),
      type: z.string().describe('Exercise type (e.g., Cardio, Strength)'),
      duration: z.number().describe('Duration in minutes'),
      caloriesBurned: z.number().describe('Estimated calories burned'),
      difficulty: z.enum(['Beginner', 'Intermediate', 'Advanced']).describe('Difficulty level'),
      description: z.string().describe('Exercise description'),
    }),
    generate: async function* ({ name, type, duration, caloriesBurned, difficulty, description }: {
      name: string
      type: string
      duration: number
      caloriesBurned: number
      difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
      description: string
    }) {
      yield <Skeleton />
      await new Promise(resolve => setTimeout(resolve, 1000))
      return (
        <ExerciseCard
          name={name}
          type={type}
          duration={duration}
          caloriesBurned={caloriesBurned}
          difficulty={difficulty}
          description={description}
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

  const uiStream = createStreamableUI()

  const result = await streamUI({
    model: qwen('qwen3:14b'),
    system: `You are a helpful assistant that can display rich UI components.
When users ask about stocks, weather, products, flights, recipes, news, hotels, events, restaurants, movies, books, or exercises, use the appropriate tool to show visual information.
Be conversational and helpful. Always try to use tools when appropriate to make the response more engaging.
You have access to 12 different UI components to make your responses visually rich and interactive.`,
    messages: history.map(msg => ({
      role: msg.role,
      content: msg.content,
    })),
    text: ({ content }) => {
      return <div>{content}</div>
    },
    tools,
  })

  return {
    role: 'assistant',
    content: '',
    display: result.value,
  }
}
