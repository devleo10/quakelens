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
    <div className={className || "lg:col-span-3"}>
      <Card className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm border-0 shadow-xl min-h-[200px] overflow-hidden h-full flex flex-col">
        <CardHeader className="bg-gradient-to-r from-slate-50 to-blue-50 dark:from-slate-800 dark:to-slate-700 min-h-[100px]">
          <MapHeader
            loading={loading}
            fetchEarthquakeData={fetchEarthquakeData}
            earthquakeData={earthquakeData}
            filteredEarthquakes={filteredEarthquakes}
            formatTime={formatTime}
          />
        </CardHeader>
        <CardContent className="p-0 flex-1 flex flex-col">
          {/* Refresh Data Button */}
          <div className="w-full flex justify-end p-2">
            <button
              onClick={fetchEarthquakeData}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-1 px-4 rounded shadow"
            >
              Refresh Data
            </button>
          </div>
          {/* Map container with reduced height */}
          <div className="w-full relative" style={{ flex: 2, minHeight: 0, overflow: "hidden" }}>
            {/* Pass the onSelectEarthquake callback to the map component */}
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
          {/* New EarthquakeDetails component below the map */}
          <div className="w-full relative border-t border-gray-200" style={{ flex: 1, overflowY: "auto" }}>
            <EarthquakeDetails earthquake={selectedEarthquake} />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
