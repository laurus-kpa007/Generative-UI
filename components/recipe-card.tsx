export function RecipeCard({
  name,
  cookTime,
  servings,
  difficulty,
  ingredients
}: {
  name: string
  cookTime: number
  servings: number
  difficulty: 'Easy' | 'Medium' | 'Hard'
  ingredients: string[]
}) {
  const difficultyColors = {
    Easy: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    Medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    Hard: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
  }

  return (
    <div className="border rounded-lg p-5 shadow-lg bg-white dark:bg-gray-800 max-w-md">
      <div className="space-y-4">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            {name}
          </h3>
          <span className={`px-2 py-1 rounded text-xs font-semibold ${difficultyColors[difficulty]}`}>
            {difficulty}
          </span>
        </div>
        <div className="flex gap-4 text-sm text-gray-600 dark:text-gray-300">
          <div className="flex items-center gap-1">
            <span>⏱️</span>
            <span>{cookTime} min</span>
          </div>
          <div className="flex items-center gap-1">
            <span>👥</span>
            <span>{servings} servings</span>
          </div>
        </div>
        <div>
          <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Ingredients:</h4>
          <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-300 space-y-1">
            {ingredients.slice(0, 5).map((ingredient, i) => (
              <li key={i}>{ingredient}</li>
            ))}
            {ingredients.length > 5 && (
              <li className="text-gray-500">+ {ingredients.length - 5} more...</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  )
}
