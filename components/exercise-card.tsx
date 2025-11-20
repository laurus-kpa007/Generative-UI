export function ExerciseCard({
  name,
  type,
  duration,
  caloriesBurned,
  difficulty,
  description
}: {
  name: string
  type: string
  duration: number
  caloriesBurned: number
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  description: string
}) {
  const difficultyColors = {
    Beginner: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    Intermediate: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    Advanced: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
  }

  return (
    <div className="border rounded-lg p-5 shadow-lg bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-900 max-w-md">
      <div className="space-y-3">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              💪 {name}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">{type}</p>
          </div>
          <span className={`px-2 py-1 rounded text-xs font-semibold ${difficultyColors[difficulty]}`}>
            {difficulty}
          </span>
        </div>
        <div className="flex gap-4">
          <div className="flex items-center gap-1 text-sm">
            <span>⏱️</span>
            <span className="text-gray-700 dark:text-gray-300">{duration} min</span>
          </div>
          <div className="flex items-center gap-1 text-sm">
            <span>🔥</span>
            <span className="text-gray-700 dark:text-gray-300">{caloriesBurned} cal</span>
          </div>
        </div>
        <p className="text-sm text-gray-700 dark:text-gray-300">
          {description}
        </p>
      </div>
    </div>
  )
}
