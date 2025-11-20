export function EventCard({
  title,
  date,
  time,
  location,
  category,
  attendees
}: {
  title: string
  date: string
  time: string
  location: string
  category: string
  attendees?: number
}) {
  return (
    <div className="border-l-4 border-purple-500 rounded-r-lg p-5 shadow-lg bg-white dark:bg-gray-800 max-w-md">
      <div className="space-y-3">
        <div>
          <span className="inline-block px-2 py-1 bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 rounded text-xs font-semibold mb-2">
            {category}
          </span>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            {title}
          </h3>
        </div>
        <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
          <div className="flex items-center gap-2">
            <span className="text-lg">📅</span>
            <span>{date}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-lg">🕐</span>
            <span>{time}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-lg">📍</span>
            <span>{location}</span>
          </div>
          {attendees && (
            <div className="flex items-center gap-2">
              <span className="text-lg">👥</span>
              <span>{attendees} attendees</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
