export function MovieCard({
  title,
  year,
  rating,
  genre,
  duration,
  director,
  plot
}: {
  title: string
  year: number
  rating: number
  genre: string
  duration: number
  director: string
  plot: string
}) {
  return (
    <div className="border rounded-lg p-5 shadow-lg bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-900 max-w-md">
      <div className="space-y-3">
        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            {title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {year} • {genre} • {duration} min
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 bg-yellow-100 dark:bg-yellow-900 px-3 py-1 rounded">
            <span className="text-yellow-600 dark:text-yellow-400">⭐</span>
            <span className="font-bold text-gray-900 dark:text-white">
              {rating.toFixed(1)}
            </span>
            <span className="text-xs text-gray-600 dark:text-gray-300">/10</span>
          </div>
        </div>
        <p className="text-sm text-gray-700 dark:text-gray-300">
          {plot}
        </p>
        <div className="text-xs text-gray-600 dark:text-gray-400 pt-2 border-t dark:border-gray-700">
          <span className="font-semibold">Director:</span> {director}
        </div>
      </div>
    </div>
  )
}
