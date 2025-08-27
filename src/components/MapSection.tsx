import { Card, CardContent, CardHeader } from "@/components/ui/card"
import EarthquakeMap from "@/components/earthquake-map"
import MapHeader from "@/components/MapHeader"
import type { EarthquakeData, Earthquake } from "@/types/earthquake"
import EarthquakeDetails from "./EarthquakeDetails.tsx"
import { useState } from "react"

interface MapSectionProps {
  loading: boolean
  fetchEarthquakeData: () => void
  earthquakeData: EarthquakeData | null
  filteredEarthquakes: Earthquake[]
  formatTime: (timestamp: number) => string
  getMagnitudeColor: (magnitude: number) => string
  getMagnitudeSize: (magnitude: number) => number
}

export default function MapSection({
  loading,
  fetchEarthquakeData,
  earthquakeData,
  filteredEarthquakes,
  formatTime,
  getMagnitudeColor,
  getMagnitudeSize,
  className = ""
}: MapSectionProps & { className?: string }) {
  const [selectedEarthquake, setSelectedEarthquake] = useState<Earthquake | null>(null)

  return (
    <div className={className || "flex-1 lg:col-span-3"}>
      <Card className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm border-0 shadow-xl min-h-[300px] sm:min-h-[400px] lg:min-h-[200px] overflow-hidden h-full flex flex-col">
        <CardHeader className="bg-gradient-to-r from-slate-50 to-blue-50 dark:from-slate-800 dark:to-slate-700 min-h-[80px] sm:min-h-[100px] p-3 sm:p-6">
          <MapHeader
            loading={loading}
            earthquakeData={earthquakeData}
            filteredEarthquakes={filteredEarthquakes}
            formatTime={formatTime}
          />
        </CardHeader>
        <CardContent className="p-0 flex-1 flex flex-col">
          {/* Refresh Data Button - responsive positioning */}
          <div className="w-full flex justify-center sm:justify-end p-2 sm:p-3">
            <button
              onClick={fetchEarthquakeData}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 sm:py-1 sm:px-4 rounded shadow text-sm sm:text-base"
            >
              Refresh Data
            </button>
          </div>
          {/* Map container with responsive height */}
          <div className="w-full relative" style={{ flex: "2 1 0%", minHeight: "200px", overflow: "hidden" }}>
            {earthquakeData && (
              <EarthquakeMap
                earthquakes={filteredEarthquakes}
                getMagnitudeColor={getMagnitudeColor}
                getMagnitudeSize={getMagnitudeSize}
                formatTime={formatTime}
                onSelectEarthquake={(eq: any) => setSelectedEarthquake(eq)}
              />
            )}
          </div>
          {/* Earthquake Details - responsive height */}
          <div className="w-full relative border-t border-gray-200" style={{ flex: "1 1 0%", minHeight: "120px", overflowY: "auto" }}>
            <EarthquakeDetails earthquake={selectedEarthquake} />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
