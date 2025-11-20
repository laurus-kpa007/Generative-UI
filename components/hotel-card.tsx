export function HotelCard({
  name,
  location,
  rating,
  pricePerNight,
  amenities,
  starRating
}: {
  name: string
  location: string
  rating: number
  pricePerNight: number
  amenities: string[]
  starRating: number
}) {
  return (
    <div className="border rounded-lg p-5 shadow-lg bg-white dark:bg-gray-800 max-w-md">
      <div className="space-y-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              {name}
            </h3>
            <div className="flex">
              {[...Array(starRating)].map((_, i) => (
                <span key={i} className="text-yellow-500">⭐</span>
              ))}
            </div>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300">📍 {location}</p>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-yellow-500 text-lg">★</span>
            <span className="font-semibold text-gray-900 dark:text-white">
              {rating.toFixed(1)}
            </span>
            <span className="text-sm text-gray-500">/5</span>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              ${pricePerNight}
            </div>
            <div className="text-xs text-gray-500">per night</div>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {amenities.slice(0, 4).map((amenity, i) => (
            <span key={i} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs text-gray-700 dark:text-gray-300">
              {amenity}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
