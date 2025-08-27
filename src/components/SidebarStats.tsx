import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Activity } from "lucide-react"

interface SidebarStatsProps {
  stats: { total: number; maxMagnitude: number; avgMagnitude: string } | null
}

export default function SidebarStats({ stats, minHeight = "" }: SidebarStatsProps & { minHeight?: string }) {
  if (!stats) return null
  return (
    <Card className={`bg-white/90 dark:bg-slate-900/90 border-0 shadow-lg px-3 py-3 flex flex-col justify-center ${minHeight}`}>
      <CardHeader className="pb-2 px-2">
        <CardTitle className="flex items-center gap-2.5 text-base font-semibold text-slate-700 dark:text-slate-300">
          <Activity className="h-5 w-5 text-blue-500" />
          Live Statistics
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-row lg:flex-col justify-between items-center gap-4 px-2 py-2 flex-1">
        <div className="flex flex-col items-center flex-1 min-w-0 gap-1">
          <span className="text-2xl font-bold text-blue-600 dark:text-blue-400 leading-tight">{stats.total}</span>
          <span className="text-xs text-slate-500 dark:text-slate-400">Events</span>
        </div>
        <div className="flex flex-col items-center flex-1 min-w-0 border-x border-slate-200 dark:border-slate-700 px-3 gap-1">
          <span className="text-2xl font-bold text-orange-600 dark:text-orange-400 leading-tight">{stats.maxMagnitude.toFixed(1)}</span>
          <span className="text-xs text-slate-500 dark:text-slate-400">Max Mag</span>
        </div>
        <div className="flex flex-col items-center flex-1 min-w-0 gap-1">
          <span className="text-2xl font-bold text-green-600 dark:text-green-400 leading-tight">{stats.avgMagnitude}</span>
          <span className="text-xs text-slate-500 dark:text-slate-400">Avg Mag</span>
        </div>
      </CardContent>
    </Card>
  )
}
