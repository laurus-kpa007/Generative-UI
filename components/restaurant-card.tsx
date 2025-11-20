export function RestaurantCard({
  name,
  cuisine,
  rating,
  priceRange,
  location,
  openNow
}: {
  name: string
  cuisine: string
  rating: number
  priceRange: string
  location: string
  openNow: boolean
}) {
  return (
    <div className="border rounded-lg p-5 shadow-lg bg-white dark:bg-gray-800 max-w-md">
      <div className="space-y-3">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              {name}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">{cuisine}</p>
          </div>
          <span className={`px-2 py-1 rounded text-xs font-semibold ${
            openNow
              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
              : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
          }`}>
            {openNow ? 'Open Now' : 'Closed'}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <span className="text-yellow-500">★</span>
              <span className="font-semibold text-gray-900 dark:text-white">
                {rating.toFixed(1)}
              </span>
            </div>
            <span className="text-gray-500">•</span>
            <span className="text-gray-700 dark:text-gray-300 font-semibold">
              {priceRange}
            </span>
          </div>
        </div>
        <div className="text-sm text-gray-600 dark:text-gray-300 flex items-center gap-1">
          <span>📍</span>
          <span>{location}</span>
        </div>
      </div>
    </div>
  )
}
