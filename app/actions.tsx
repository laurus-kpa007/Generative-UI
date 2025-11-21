'use server'

import { streamUI } from 'ai/rsc'
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
      explanation: z.string().describe('한국어로 표시된 주식 정보에 대한 추가 설명, 분석, 인사이트 (2-4문장)'),
    }),
    generate: async function* ({ stocks, explanation }: {
      stocks: Array<{
        symbol: string
        price: number
        change: number
      }>
      explanation: string
    }) {
      yield <Skeleton />
      await new Promise(resolve => setTimeout(resolve, 1000))
      return (
        <>
          <div className="flex flex-wrap gap-3">
            {stocks.map((stock, i) => (
              <StockCard key={i} symbol={stock.symbol} price={stock.price} change={stock.change} />
            ))}
          </div>
          <div className="mt-3 p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
              {explanation}
            </p>
          </div>
        </>
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
      explanation: z.string().describe('한국어로 표시된 날씨 정보에 대한 추가 설명, 조언 (2-4문장)'),
    }),
    generate: async function* ({ cities, explanation }: {
      cities: Array<{
        city: string
        temperature: number
        condition: string
      }>
      explanation: string
    }) {
      yield <Skeleton />
      await new Promise(resolve => setTimeout(resolve, 1000))
      return (
        <>
          <div className="flex flex-wrap gap-3">
            {cities.map((weather, i) => (
              <WeatherCard key={i} city={weather.city} temperature={weather.temperature} condition={weather.condition} />
            ))}
          </div>
          <div className="mt-3 p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
              {explanation}
            </p>
          </div>
        </>
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
      explanation: z.string().describe('한국어로 표시된 제품에 대한 추가 설명, 추천 이유 (2-4문장)'),
    }),
    generate: async function* ({ products, explanation }: {
      products: Array<{
        name: string
        price: number
        description: string
        rating?: number
      }>
      explanation: string
    }) {
      yield <Skeleton />
      await new Promise(resolve => setTimeout(resolve, 1000))
      return (
        <>
          <div className="flex flex-wrap gap-3">
            {products.map((product, i) => (
              <ProductCard key={i} name={product.name} price={product.price} description={product.description} rating={product.rating} />
            ))}
          </div>
          <div className="mt-3 p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
              {explanation}
            </p>
          </div>
        </>
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
      explanation: z.string().describe('한국어로 표시된 항공편에 대한 추가 정보, 여행 팁 (2-4문장)'),
    }),
    generate: async function* ({ flights, explanation }: {
      flights: Array<{
        from: string
        to: string
        departure: string
        arrival: string
        price: number
        airline: string
      }>
      explanation: string
    }) {
      yield <Skeleton />
      await new Promise(resolve => setTimeout(resolve, 1000))
      return (
        <>
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
          <div className="mt-3 p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
              {explanation}
            </p>
          </div>
        </>
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
      explanation: z.string().describe('한국어로 표시된 레시피에 대한 추가 설명, 요리 팁 (2-4문장)'),
    }),
    generate: async function* ({ recipes, explanation }: {
      recipes: Array<{
        name: string
        cookTime: number
        servings: number
        difficulty: 'Easy' | 'Medium' | 'Hard'
        ingredients: string[]
      }>
      explanation: string
    }) {
      yield <Skeleton />
      await new Promise(resolve => setTimeout(resolve, 1000))
      return (
        <>
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
          <div className="mt-3 p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
              {explanation}
            </p>
          </div>
        </>
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
      explanation: z.string().describe('한국어로 표시된 뉴스에 대한 추가 맥락, 분석 (2-4문장)'),
    }),
    generate: async function* ({ articles, explanation }: {
      articles: Array<{
        title: string
        source: string
        publishedAt: string
        summary: string
        category?: string
      }>
      explanation: string
    }) {
      yield <Skeleton />
      await new Promise(resolve => setTimeout(resolve, 1000))
      return (
        <>
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
          <div className="mt-3 p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
              {explanation}
            </p>
          </div>
        </>
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
      explanation: z.string().describe('한국어로 표시된 호텔에 대한 추가 정보, 추천 이유 (2-4문장)'),
    }),
    generate: async function* ({ hotels, explanation }: {
      hotels: Array<{
        name: string
        location: string
        rating: number
        pricePerNight: number
        amenities: string[]
        starRating: number
      }>
      explanation: string
    }) {
      yield <Skeleton />
      await new Promise(resolve => setTimeout(resolve, 1000))
      return (
        <>
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
          <div className="mt-3 p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
              {explanation}
            </p>
          </div>
        </>
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
      explanation: z.string().describe('한국어로 표시된 이벤트에 대한 추가 정보, 참석 팁 (2-4문장)'),
    }),
    generate: async function* ({ events, explanation }: {
      events: Array<{
        title: string
        date: string
        time: string
        location: string
        category: string
        attendees?: number
      }>
      explanation: string
    }) {
      yield <Skeleton />
      await new Promise(resolve => setTimeout(resolve, 1000))
      return (
        <>
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
          <div className="mt-3 p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
              {explanation}
            </p>
          </div>
        </>
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
      explanation: z.string().describe('한국어로 표시된 레스토랑에 대한 추가 정보, 추천 이유 (2-4문장)'),
    }),
    generate: async function* ({ restaurants, explanation }: {
      restaurants: Array<{
        name: string
        cuisine: string
        rating: number
        priceRange: string
        location: string
        openNow: boolean
      }>
      explanation: string
    }) {
      yield <Skeleton />
      await new Promise(resolve => setTimeout(resolve, 1000))
      return (
        <>
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
          <div className="mt-3 p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
              {explanation}
            </p>
          </div>
        </>
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
      explanation: z.string().describe('한국어로 표시된 영화에 대한 추가 정보, 감상 포인트 (2-4문장)'),
    }),
    generate: async function* ({ movies, explanation }: {
      movies: Array<{
        title: string
        year: number
        rating: number
        genre: string
        duration: number
        director: string
        plot: string
      }>
      explanation: string
    }) {
      yield <Skeleton />
      await new Promise(resolve => setTimeout(resolve, 1000))
      return (
        <>
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
          <div className="mt-3 p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
              {explanation}
            </p>
          </div>
        </>
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
      explanation: z.string().describe('한국어로 표시된 책에 대한 추가 정보, 추천 이유 (2-4문장)'),
    }),
    generate: async function* ({ books, explanation }: {
      books: Array<{
        title: string
        author: string
        rating: number
        pages: number
        genre: string
        publishedYear: number
        description: string
      }>
      explanation: string
    }) {
      yield <Skeleton />
      await new Promise(resolve => setTimeout(resolve, 1000))
      return (
        <>
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
          <div className="mt-3 p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
              {explanation}
            </p>
          </div>
        </>
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
      explanation: z.string().describe('한국어로 표시된 운동에 대한 추가 정보, 운동 팁 (2-4문장)'),
    }),
    generate: async function* ({ exercises, explanation }: {
      exercises: Array<{
        name: string
        type: string
        duration: number
        caloriesBurned: number
        difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
        description: string
      }>
      explanation: string
    }) {
      yield <Skeleton />
      await new Promise(resolve => setTimeout(resolve, 1000))
      return (
        <>
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
          <div className="mt-3 p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
              {explanation}
            </p>
          </div>
        </>
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

  const result = await streamUI({
    model: qwen('qwen3:14b'),
    system: `당신은 풍부한 UI 컴포넌트를 표시할 수 있는 도움이 되는 어시스턴트입니다.

사용자가 주식, 날씨, 상품, 항공편, 레시피, 뉴스, 호텔, 이벤트, 레스토랑, 영화, 책 또는 운동에 대해 물어보면 적절한 도구를 사용하여 시각적 정보를 표시하세요.

중요한 규칙:
- 사용자가 여러 개를 요청하면 (예: "애플과 삼성과 MS 주식", "카르보나라와 라면 레시피") 반드시 배열로 모든 항목을 포함해야 합니다.
- 예: 주식 3개를 요청하면 stocks 배열에 3개 모두 포함
- 예: 레시피 2개를 요청하면 recipes 배열에 2개 모두 포함
- 절대 첫 번째 항목만 보여주지 말고, 요청받은 모든 항목을 배열에 포함하세요.

**설명(explanation) 파라미터 규칙:**
- 모든 도구는 반드시 explanation 파라미터를 포함해야 합니다.
- explanation은 한국어로 2-4문장 정도로 작성하세요.
- 표시된 정보에 대한 맥락, 인사이트, 추가 정보, 팁을 포함하세요.
- 예: 주식 → "현재 시장 상황을 고려하면 안정적인 투자 대상입니다. 장기 보유를 권장합니다."
- 예: 레시피 → "이 요리는 초보자도 쉽게 만들 수 있으며, 30분 안에 완성할 수 있습니다. 신선한 재료를 사용하면 더욱 맛있습니다."

대화형이고 도움이 되도록 하세요. 응답을 더 흥미롭게 만들기 위해 항상 적절한 경우 도구를 사용하세요.
당신은 12가지 다른 UI 컴포넌트에 접근할 수 있어 응답을 시각적으로 풍부하고 인터랙티브하게 만들 수 있습니다.`,
    messages: history.map(msg => ({
      role: msg.role,
      content: msg.content,
    })),
    text: ({ content }) => {
      return (
        <div className="mt-3 p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
              {content}
            </p>
          </div>
        </div>
      )
    },
    tools,
  })

  return {
    role: 'assistant',
    content: '',
    display: result.value,
  }
}
