export function FlightCard({
  from,
  to,
  departure,
  arrival,
  price,
  airline
}: {
  from: string
  to: string
  departure: string
  arrival: string
  price: number
  airline: string
}) {
  return (
    <div className="border rounded-lg p-5 shadow-lg bg-white dark:bg-gray-800 max-w-lg">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {airline}
          </span>
          <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            ${price}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <div className="text-center flex-1">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {from}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {departure}
            </div>
          </div>
          <div className="flex-1 flex items-center justify-center">
            <div className="w-full border-t-2 border-dashed border-gray-300 dark:border-gray-600 relative">
              <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                ✈️
              </div>
            </div>
          </div>
          <div className="text-center flex-1">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {to}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {arrival}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
