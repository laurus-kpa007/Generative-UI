export function WeatherCard({
  city,
  temperature,
  condition
}: {
  city: string
  temperature: number
  condition: string
}) {
  const getWeatherEmoji = (condition: string) => {
    const lower = condition.toLowerCase()
    if (lower.includes('sun') || lower.includes('clear')) return '☀️'
    if (lower.includes('cloud')) return '☁️'
    if (lower.includes('rain')) return '🌧️'
    if (lower.includes('snow')) return '❄️'
    if (lower.includes('storm')) return '⛈️'
    return '🌤️'
  }

  return (
    <div className="border rounded-lg p-6 shadow-md bg-gradient-to-br from-blue-400 to-blue-600 text-white max-w-sm">
      <div className="text-center">
        <h3 className="text-xl font-bold mb-2">{city}</h3>
        <div className="text-6xl my-4">{getWeatherEmoji(condition)}</div>
        <p className="text-4xl font-bold mb-2">{temperature}°C</p>
        <p className="text-lg opacity-90">{condition}</p>
      </div>
    </div>
  )
}
