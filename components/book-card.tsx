export function BookCard({
  title,
  author,
  rating,
  pages,
  genre,
  publishedYear,
  description
}: {
  title: string
  author: string
  rating: number
  pages: number
  genre: string
  publishedYear: number
  description: string
}) {
  return (
    <div className="border rounded-lg p-5 shadow-lg bg-gradient-to-br from-amber-50 to-orange-50 dark:from-gray-800 dark:to-gray-900 max-w-md">
      <div className="space-y-3">
        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            📚 {title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
            by {author}
          </p>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1">
            <span className="text-yellow-500">★</span>
            <span className="font-semibold text-gray-900 dark:text-white">
              {rating.toFixed(1)}
            </span>
          </div>
          <span className="text-gray-400">•</span>
          <span className="text-gray-600 dark:text-gray-300">{pages} pages</span>
          <span className="text-gray-400">•</span>
          <span className="text-gray-600 dark:text-gray-300">{publishedYear}</span>
        </div>
        <div>
          <span className="inline-block px-2 py-1 bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200 rounded text-xs font-semibold">
            {genre}
          </span>
        </div>
        <p className="text-sm text-gray-700 dark:text-gray-300">
          {description}
        </p>
      </div>
    </div>
  )
}
