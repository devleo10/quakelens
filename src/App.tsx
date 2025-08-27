import { useState } from "react"
import { useEarthquakeData } from "@/hooks/useEarthquakeData"
import { getMagnitudeColor, getMagnitudeSize, formatTime, getStats } from "@/utils/earthquakeUtils"
import LoadingScreen from "@/components/LoadingScreen"
import ErrorAlert from "@/components/ErrorAlert"
import SidebarSection from "@/components/SidebarSection"
import MapSection from "@/components/MapSection"

export default function App() {
  const { earthquakeData, loading, error, fetchEarthquakeData } = useEarthquakeData()
  const [selectedMagnitude, setSelectedMagnitude] = useState(2.5)

  const filteredEarthquakes = earthquakeData?.features.filter(
    (earthquake) => earthquake.properties.mag >= selectedMagnitude
  ) || []

  const stats = getStats(earthquakeData)

  if (loading) {
    return <LoadingScreen />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="container mx-auto px-2 sm:px-4 py-2 h-screen flex flex-col">
        {error && <ErrorAlert error={error} onRetry={fetchEarthquakeData} />}

        {/* Mobile-first responsive layout */}
        <div className="flex-1 flex flex-col lg:grid lg:grid-cols-4 gap-2 sm:gap-4 h-full items-stretch min-h-0">
          <SidebarSection
            stats={stats}
            selectedMagnitude={selectedMagnitude}
            setSelectedMagnitude={setSelectedMagnitude}
            fetchEarthquakeData={fetchEarthquakeData}
            loading={loading}
            className="w-full lg:col-span-1 order-2 lg:order-1"
          />
          <MapSection
            loading={loading}
            fetchEarthquakeData={fetchEarthquakeData}
            earthquakeData={earthquakeData}
            filteredEarthquakes={filteredEarthquakes}
            formatTime={formatTime}
            getMagnitudeColor={getMagnitudeColor}
            getMagnitudeSize={getMagnitudeSize}
            className="flex-1 lg:col-span-3 order-1 lg:order-2"
          />
        </div>
      </div>
    </div>
  )
}
