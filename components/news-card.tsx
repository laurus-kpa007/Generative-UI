export function NewsCard({
  title,
  source,
  publishedAt,
  summary,
  category
}: {
  title: string
  source: string
  publishedAt: string
  summary: string
  category?: string
}) {
  return (
    <div className="border rounded-lg p-5 shadow-lg bg-white dark:bg-gray-800 max-w-lg">
      <div className="space-y-3">
        {category && (
          <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full text-xs font-semibold">
            {category}
          </span>
        )}
        <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-tight">
          {title}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          {summary}
        </p>
        <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400 pt-2 border-t dark:border-gray-700">
          <span className="font-semibold">{source}</span>
          <span>{publishedAt}</span>
        </div>
      </div>
    </div>
  )
}
