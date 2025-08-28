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
      <Card className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm border-0 shadow-xl h-full flex flex-col overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-slate-50 to-blue-50 dark:from-slate-800 dark:to-slate-700 flex-shrink-0 p-2 sm:p-3">
          <MapHeader
            loading={loading}
            earthquakeData={earthquakeData}
            filteredEarthquakes={filteredEarthquakes}
            formatTime={formatTime}
          />
        </CardHeader>
        <CardContent className="p-0 flex-1 flex flex-col gap-1 min-h-0 overflow-hidden">
          {/* Refresh Data Button - responsive positioning */}
          <div className="w-full flex justify-center sm:justify-end p-1 sm:p-2 flex-shrink-0">
            <button
              onClick={fetchEarthquakeData}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-1.5 px-3 sm:py-1 sm:px-4 rounded shadow text-sm"
            >
              Refresh Data
            </button>
          </div>
          {/* Map container with better height management */}
          <div className="w-full relative flex-1 min-h-0" style={{ borderRadius: "0.5rem", overflow: "hidden" }}>
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
          {/* Earthquake Details - compact and fixed height */}
          <div className="w-full border-t border-gray-200 bg-slate-50 dark:bg-slate-800/80 flex-shrink-0" style={{ height: "140px", overflowY: "auto", borderRadius: "0 0 0.5rem 0.5rem", padding: "0.5rem" }}>
            <EarthquakeDetails earthquake={selectedEarthquake} />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
