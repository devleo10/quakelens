import { Activity } from "lucide-react"

interface MapHeaderProps {
  loading: boolean
  earthquakeData: any
  filteredEarthquakes: any[]
  formatTime: (timestamp: number) => string
}

export default function MapHeader({
  loading,
  earthquakeData,
  filteredEarthquakes,
  formatTime,
}: MapHeaderProps) {
  return (
    <div className="flex flex-col gap-2 sm:gap-3 w-full">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-2">
          <div className="p-1 bg-blue-600 rounded-lg shadow-lg">
            <Activity className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center">
            <span className="text-blue-700 dark:text-blue-400 text-base sm:text-lg font-semibold leading-tight">
              Quakelens - Earthquake Visualizer
            </span>
            <span className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm sm:ml-2">- Global Activity</span>
          </div>
        </div>
      </div>
      <div className="w-full">
        {earthquakeData ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex lg:flex-wrap gap-2 sm:gap-4 text-xs sm:text-sm">
            <span className="flex items-center gap-1">
              <span className="font-medium text-slate-900 dark:text-slate-100">Updated:</span>
              <span className="text-slate-800 dark:text-slate-200 text-xs sm:text-sm">{formatTime(earthquakeData.metadata.generated)}</span>
            </span>
            <span className="flex items-center gap-1">
              <span className="font-medium text-slate-900 dark:text-slate-100">Showing:</span>
              <span className="text-blue-700 dark:text-blue-300 font-semibold">{filteredEarthquakes.length}</span>
              <span className="text-slate-800 dark:text-slate-200">of {earthquakeData.features.length}</span>
            </span>
            <span className="flex items-center gap-1">
              <span className="font-medium text-slate-900 dark:text-slate-100">Source:</span>
              <span className="text-emerald-700 dark:text-emerald-300 font-medium">USGS</span>
            </span>
            <span className="flex items-center gap-1">
              <span className="font-medium text-slate-900 dark:text-slate-100">Period:</span>
              <span className="text-amber-700 dark:text-amber-300 font-medium">Last 24h</span>
            </span>
          </div>
        ) : (
          <div className="text-sm text-slate-700 dark:text-slate-300">
            {loading ? "Loading earthquake data..." : "Real-time earthquake monitoring from USGS • Global coverage • Updated continuously"}
          </div>
        )}
      </div>
    </div>
  )
}
