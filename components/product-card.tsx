export function ProductCard({
  name,
  price,
  description,
  rating
}: {
  name: string
  price: number
  description: string
  rating?: number
}) {
  return (
    <div className="border rounded-lg p-5 shadow-lg bg-white dark:bg-gray-800 max-w-md">
      <div className="space-y-3">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
          {name}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm">
          {description}
        </p>
        <div className="flex justify-between items-center pt-2">
          <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            ${price.toFixed(2)}
          </span>
          {rating && (
            <div className="flex items-center">
              <span className="text-yellow-500">★</span>
              <span className="ml-1 text-gray-700 dark:text-gray-300">
                {rating.toFixed(1)}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
