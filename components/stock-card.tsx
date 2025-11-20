export function StockCard({
  symbol,
  price,
  change
}: {
  symbol: string
  price: number
  change: number
}) {
  const isPositive = change >= 0

  return (
    <div className="border rounded-lg p-4 shadow-md bg-white dark:bg-gray-800 max-w-sm">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
            {symbol}
          </h3>
          <p className="text-2xl font-semibold text-gray-900 dark:text-white mt-2">
            ${price.toFixed(2)}
          </p>
        </div>
        <div className={`px-3 py-1 rounded ${
          isPositive
            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
            : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
        }`}>
          {isPositive ? '↑' : '↓'} {Math.abs(change).toFixed(2)}%
        </div>
      </div>
    </div>
  )
}
