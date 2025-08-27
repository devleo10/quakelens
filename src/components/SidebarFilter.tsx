import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Loader2, Activity, Layers } from "lucide-react"

interface SidebarFilterProps {
  selectedMagnitude: number
  setSelectedMagnitude: (n: number) => void
  fetchEarthquakeData: () => void
  loading: boolean
}

export default function SidebarFilter({
  selectedMagnitude,
  setSelectedMagnitude,
  fetchEarthquakeData,
  loading,
  minHeight = ""
}: SidebarFilterProps & { minHeight?: string }) {
  return (
    <Card className={`bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-0 shadow-lg flex flex-col justify-center ${minHeight}`}>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-sm">
          <Layers className="h-4 w-4 text-blue-500" />
          <span>Filter</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 p-3">
        <div className="text-center">
          <div className="text-xl font-bold text-blue-600 dark:text-blue-400">
            {selectedMagnitude.toFixed(1)}
          </div>
          <div className="text-xs text-slate-600 dark:text-slate-400">Min Magnitude</div>
        </div>
        <div className="space-y-2">
          <input
            type="range"
            min="0"
            max="8"
            step="0.5"
            value={selectedMagnitude}
            onChange={e => setSelectedMagnitude(Number(e.target.value))}
            className="w-full h-3 rounded-lg appearance-none cursor-pointer bg-gradient-to-r from-green-400 via-yellow-400 via-orange-400 to-red-500 slider"
          />
          <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400">
            <span className="text-green-700 dark:text-green-300">0</span>
            <span className="text-yellow-700 dark:text-yellow-300">4</span>
            <span className="text-red-700 dark:text-red-300">8+</span>
          </div>
        </div>
        {/*
        <Button
          onClick={fetchEarthquakeData}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm py-2 h-9 border-0 shadow-md"
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
              Refreshing...
            </>
          ) : (
            <>
              <Activity className="h-4 w-4 mr-2" />
              Refresh Data
            </>
          )}
        </Button>
        */}
      </CardContent>
    </Card>
  )
}
