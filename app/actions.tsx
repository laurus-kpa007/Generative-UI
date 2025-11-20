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
    description: 'Display stock price information for one or more companies',
    parameters: z.object({
      stocks: z.array(z.object({
        symbol: z.string().describe('Stock symbol (e.g., AAPL, GOOGL)'),
        price: z.number().describe('Current stock price'),
        change: z.number().describe('Percentage change'),
      })).describe('Array of stock information'),
    }),
    generate: async function* ({ stocks }: {
      stocks: Array<{
        symbol: string
        price: number
        change: number
      }>
    }) {
      yield <Skeleton />
      await new Promise(resolve => setTimeout(resolve, 1000))
      return (
        <div className="flex flex-wrap gap-3">
          {stocks.map((stock, i) => (
            <StockCard key={i} symbol={stock.symbol} price={stock.price} change={stock.change} />
          ))}
        </div>
      )
    },
  },
  showWeather: {
    description: 'Display weather information for one or more cities',
    parameters: z.object({
      cities: z.array(z.object({
        city: z.string().describe('City name'),
        temperature: z.number().describe('Temperature in Celsius'),
        condition: z.string().describe('Weather condition'),
      })).describe('Array of weather information'),
    }),
    generate: async function* ({ cities }: {
      cities: Array<{
        city: string
        temperature: number
        condition: string
      }>
    }) {
      yield <Skeleton />
      await new Promise(resolve => setTimeout(resolve, 1000))
      return (
        <div className="flex flex-wrap gap-3">
          {cities.map((weather, i) => (
            <WeatherCard key={i} city={weather.city} temperature={weather.temperature} condition={weather.condition} />
          ))}
        </div>
      )
    },
  },
  showProduct: {
    description: 'Display one or more product information',
    parameters: z.object({
      products: z.array(z.object({
        name: z.string().describe('Product name'),
        price: z.number().describe('Product price'),
        description: z.string().describe('Product description'),
        rating: z.number().optional().describe('Product rating (0-5)'),
      })).describe('Array of product information'),
    }),
    generate: async function* ({ products }: {
      products: Array<{
        name: string
        price: number
        description: string
        rating?: number
      }>
    }) {
      yield <Skeleton />
      await new Promise(resolve => setTimeout(resolve, 1000))
      return (
        <div className="flex flex-wrap gap-3">
          {products.map((product, i) => (
            <ProductCard key={i} name={product.name} price={product.price} description={product.description} rating={product.rating} />
          ))}
        </div>
      )
    },
  },
  showFlight: {
    description: 'Display one or more flight information',
    parameters: z.object({
      flights: z.array(z.object({
        from: z.string().describe('Departure city code'),
        to: z.string().describe('Arrival city code'),
        departure: z.string().describe('Departure time'),
        arrival: z.string().describe('Arrival time'),
        price: z.number().describe('Flight price'),
        airline: z.string().describe('Airline name'),
      })).describe('Array of flight information'),
    }),
    generate: async function* ({ flights }: {
      flights: Array<{
        from: string
        to: string
        departure: string
        arrival: string
        price: number
        airline: string
      }>
    }) {
      yield <Skeleton />
      await new Promise(resolve => setTimeout(resolve, 1000))
      return (
        <div className="flex flex-wrap gap-3">
          {flights.map((flight, i) => (
            <FlightCard
              key={i}
              from={flight.from}
              to={flight.to}
              departure={flight.departure}
              arrival={flight.arrival}
              price={flight.price}
              airline={flight.airline}
            />
          ))}
        </div>
      )
    },
  },
  showRecipe: {
    description: 'Display one or more recipe information with cooking details',
    parameters: z.object({
      recipes: z.array(z.object({
        name: z.string().describe('Recipe name'),
        cookTime: z.number().describe('Cooking time in minutes'),
        servings: z.number().describe('Number of servings'),
        difficulty: z.enum(['Easy', 'Medium', 'Hard']).describe('Difficulty level'),
        ingredients: z.array(z.string()).describe('List of ingredients'),
      })).describe('Array of recipe information'),
    }),
    generate: async function* ({ recipes }: {
      recipes: Array<{
        name: string
        cookTime: number
        servings: number
        difficulty: 'Easy' | 'Medium' | 'Hard'
        ingredients: string[]
      }>
    }) {
      yield <Skeleton />
      await new Promise(resolve => setTimeout(resolve, 1000))
      return (
        <div className="flex flex-wrap gap-3">
          {recipes.map((recipe, i) => (
            <RecipeCard
              key={i}
              name={recipe.name}
              cookTime={recipe.cookTime}
              servings={recipe.servings}
              difficulty={recipe.difficulty}
              ingredients={recipe.ingredients}
            />
          ))}
        </div>
      )
    },
  },
  showNews: {
    description: 'Display one or more news article information',
    parameters: z.object({
      articles: z.array(z.object({
        title: z.string().describe('Article title'),
        source: z.string().describe('News source'),
        publishedAt: z.string().describe('Publication date/time'),
        summary: z.string().describe('Article summary'),
        category: z.string().optional().describe('News category'),
      })).describe('Array of news articles'),
    }),
    generate: async function* ({ articles }: {
      articles: Array<{
        title: string
        source: string
        publishedAt: string
        summary: string
        category?: string
      }>
    }) {
      yield <Skeleton />
      await new Promise(resolve => setTimeout(resolve, 1000))
      return (
        <div className="flex flex-wrap gap-3">
          {articles.map((article, i) => (
            <NewsCard
              key={i}
              title={article.title}
              source={article.source}
              publishedAt={article.publishedAt}
              summary={article.summary}
              category={article.category}
            />
          ))}
        </div>
      )
    },
  },
  showHotel: {
    description: 'Display one or more hotel information with ratings and amenities',
    parameters: z.object({
      hotels: z.array(z.object({
        name: z.string().describe('Hotel name'),
        location: z.string().describe('Hotel location'),
        rating: z.number().describe('User rating (0-5)'),
        pricePerNight: z.number().describe('Price per night'),
        amenities: z.array(z.string()).describe('Hotel amenities'),
        starRating: z.number().describe('Star rating (1-5)'),
      })).describe('Array of hotel information'),
    }),
    generate: async function* ({ hotels }: {
      hotels: Array<{
        name: string
        location: string
        rating: number
        pricePerNight: number
        amenities: string[]
        starRating: number
      }>
    }) {
      yield <Skeleton />
      await new Promise(resolve => setTimeout(resolve, 1000))
      return (
        <div className="flex flex-wrap gap-3">
          {hotels.map((hotel, i) => (
            <HotelCard
              key={i}
              name={hotel.name}
              location={hotel.location}
              rating={hotel.rating}
              pricePerNight={hotel.pricePerNight}
              amenities={hotel.amenities}
              starRating={hotel.starRating}
            />
          ))}
        </div>
      )
    },
  },
  showEvent: {
    description: 'Display one or more event or calendar information',
    parameters: z.object({
      events: z.array(z.object({
        title: z.string().describe('Event title'),
        date: z.string().describe('Event date'),
        time: z.string().describe('Event time'),
        location: z.string().describe('Event location'),
        category: z.string().describe('Event category'),
        attendees: z.number().optional().describe('Number of attendees'),
      })).describe('Array of events'),
    }),
    generate: async function* ({ events }: {
      events: Array<{
        title: string
        date: string
        time: string
        location: string
        category: string
        attendees?: number
      }>
    }) {
      yield <Skeleton />
      await new Promise(resolve => setTimeout(resolve, 1000))
      return (
        <div className="flex flex-wrap gap-3">
          {events.map((event, i) => (
            <EventCard
              key={i}
              title={event.title}
              date={event.date}
              time={event.time}
              location={event.location}
              category={event.category}
              attendees={event.attendees}
            />
          ))}
        </div>
      )
    },
  },
  showRestaurant: {
    description: 'Display one or more restaurant information',
    parameters: z.object({
      restaurants: z.array(z.object({
        name: z.string().describe('Restaurant name'),
        cuisine: z.string().describe('Cuisine type'),
        rating: z.number().describe('Rating (0-5)'),
        priceRange: z.string().describe('Price range (e.g., $$, $$$)'),
        location: z.string().describe('Restaurant location'),
        openNow: z.boolean().describe('Whether restaurant is open now'),
      })).describe('Array of restaurants'),
    }),
    generate: async function* ({ restaurants }: {
      restaurants: Array<{
        name: string
        cuisine: string
        rating: number
        priceRange: string
        location: string
        openNow: boolean
      }>
    }) {
      yield <Skeleton />
      await new Promise(resolve => setTimeout(resolve, 1000))
      return (
        <div className="flex flex-wrap gap-3">
          {restaurants.map((restaurant, i) => (
            <RestaurantCard
              key={i}
              name={restaurant.name}
              cuisine={restaurant.cuisine}
              rating={restaurant.rating}
              priceRange={restaurant.priceRange}
              location={restaurant.location}
              openNow={restaurant.openNow}
            />
          ))}
        </div>
      )
    },
  },
  showMovie: {
    description: 'Display one or more movie information',
    parameters: z.object({
      movies: z.array(z.object({
        title: z.string().describe('Movie title'),
        year: z.number().describe('Release year'),
        rating: z.number().describe('Rating (0-10)'),
        genre: z.string().describe('Movie genre'),
        duration: z.number().describe('Duration in minutes'),
        director: z.string().describe('Director name'),
        plot: z.string().describe('Plot summary'),
      })).describe('Array of movies'),
    }),
    generate: async function* ({ movies }: {
      movies: Array<{
        title: string
        year: number
        rating: number
        genre: string
        duration: number
        director: string
        plot: string
      }>
    }) {
      yield <Skeleton />
      await new Promise(resolve => setTimeout(resolve, 1000))
      return (
        <div className="flex flex-wrap gap-3">
          {movies.map((movie, i) => (
            <MovieCard
              key={i}
              title={movie.title}
              year={movie.year}
              rating={movie.rating}
              genre={movie.genre}
              duration={movie.duration}
              director={movie.director}
              plot={movie.plot}
            />
          ))}
        </div>
      )
    },
  },
  showBook: {
    description: 'Display one or more book information',
    parameters: z.object({
      books: z.array(z.object({
        title: z.string().describe('Book title'),
        author: z.string().describe('Author name'),
        rating: z.number().describe('Rating (0-5)'),
        pages: z.number().describe('Number of pages'),
        genre: z.string().describe('Book genre'),
        publishedYear: z.number().describe('Publication year'),
        description: z.string().describe('Book description'),
      })).describe('Array of books'),
    }),
    generate: async function* ({ books }: {
      books: Array<{
        title: string
        author: string
        rating: number
        pages: number
        genre: string
        publishedYear: number
        description: string
      }>
    }) {
      yield <Skeleton />
      await new Promise(resolve => setTimeout(resolve, 1000))
      return (
        <div className="flex flex-wrap gap-3">
          {books.map((book, i) => (
            <BookCard
              key={i}
              title={book.title}
              author={book.author}
              rating={book.rating}
              pages={book.pages}
              genre={book.genre}
              publishedYear={book.publishedYear}
              description={book.description}
            />
          ))}
        </div>
      )
    },
  },
  showExercise: {
    description: 'Display one or more exercise or workout information',
    parameters: z.object({
      exercises: z.array(z.object({
        name: z.string().describe('Exercise name'),
        type: z.string().describe('Exercise type (e.g., Cardio, Strength)'),
        duration: z.number().describe('Duration in minutes'),
        caloriesBurned: z.number().describe('Estimated calories burned'),
        difficulty: z.enum(['Beginner', 'Intermediate', 'Advanced']).describe('Difficulty level'),
        description: z.string().describe('Exercise description'),
      })).describe('Array of exercises'),
    }),
    generate: async function* ({ exercises }: {
      exercises: Array<{
        name: string
        type: string
        duration: number
        caloriesBurned: number
        difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
        description: string
      }>
    }) {
      yield <Skeleton />
      await new Promise(resolve => setTimeout(resolve, 1000))
      return (
        <div className="flex flex-wrap gap-3">
          {exercises.map((exercise, i) => (
            <ExerciseCard
              key={i}
              name={exercise.name}
              type={exercise.type}
              duration={exercise.duration}
              caloriesBurned={exercise.caloriesBurned}
              difficulty={exercise.difficulty}
              description={exercise.description}
            />
          ))}
        </div>
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
    system: `당신은 풍부한 UI 컴포넌트를 표시할 수 있는 도움이 되는 어시스턴트입니다.

사용자가 주식, 날씨, 상품, 항공편, 레시피, 뉴스, 호텔, 이벤트, 레스토랑, 영화, 책 또는 운동에 대해 물어보면 적절한 도구를 사용하여 시각적 정보를 표시하세요.

중요한 규칙:
- 사용자가 여러 개를 요청하면 (예: "애플과 삼성과 MS 주식", "카르보나라와 라면 레시피") 반드시 배열로 모든 항목을 포함해야 합니다.
- 예: 주식 3개를 요청하면 stocks 배열에 3개 모두 포함
- 예: 레시피 2개를 요청하면 recipes 배열에 2개 모두 포함
- 절대 첫 번째 항목만 보여주지 말고, 요청받은 모든 항목을 배열에 포함하세요.

대화형이고 도움이 되도록 하세요. 응답을 더 흥미롭게 만들기 위해 항상 적절한 경우 도구를 사용하세요.
당신은 12가지 다른 UI 컴포넌트에 접근할 수 있어 응답을 시각적으로 풍부하고 인터랙티브하게 만들 수 있습니다.`,
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
