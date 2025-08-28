import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Layers } from "lucide-react"

interface SidebarFilterProps {
  selectedMagnitude: number
  setSelectedMagnitude: (n: number) => void
}

export default function SidebarFilter({
  selectedMagnitude,
  setSelectedMagnitude,
  minHeight = ""
}: SidebarFilterProps & { minHeight?: string }) {
  return (
    <Card className={`bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-0 shadow-lg flex flex-col justify-center ${minHeight}`}>
      <CardHeader className="pb-1 sm:pb-2 px-2 sm:px-6 pt-2 sm:pt-6">
        <CardTitle className="flex items-center gap-2 text-xs sm:text-sm">
          <Layers className="h-3 w-3 sm:h-4 sm:w-4 text-blue-500" />
          <span>Filter</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 sm:space-y-3 p-2 sm:p-3">
        <div className="text-center">
          <div className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            {selectedMagnitude.toFixed(1)}
          </div>
          <div className="text-[10px] sm:text-xs text-slate-600 dark:text-slate-400">Min Magnitude</div>
        </div>
        <div className="space-y-1 sm:space-y-2">
          <input
            type="range"
            min="0"
            max="8"
            step="0.5"
            value={selectedMagnitude}
            onChange={e => setSelectedMagnitude(Number(e.target.value))}
            className="w-full h-2 sm:h-3 rounded-lg appearance-none cursor-pointer bg-gradient-to-r from-green-400 via-yellow-400 to-red-500 slider"
          />
          <div className="flex justify-between text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 px-1">
            <span className="text-green-700 dark:text-green-300">0</span>
            <span className="text-yellow-700 dark:text-yellow-300">4</span>
            <span className="text-red-700 dark:text-red-300">8+</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
