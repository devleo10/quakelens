import SidebarStats from "@/components/SidebarStats"
import SidebarFilter from "@/components/SidebarFilter"
import SidebarScale from "@/components/SidebarScale"
import type { EarthquakeStats } from "@/types/earthquake"

interface SidebarSectionProps {
  stats: EarthquakeStats | null
  selectedMagnitude: number
  setSelectedMagnitude: (magnitude: number) => void
  fetchEarthquakeData: () => void
  loading: boolean
}

export default function SidebarSection({
  stats,
  selectedMagnitude,
  setSelectedMagnitude,
 
  className = ""
}: SidebarSectionProps & { className?: string }) {
  return (
    <div className={`flex flex-col lg:h-full space-y-2 mb-2 lg:mb-0 w-full ${className}`} style={{ minHeight: 0 }}>
      {/* Mobile: horizontal layout for stats and filter, Desktop: vertical */}
      <div className="flex flex-col sm:flex-row lg:flex-col gap-2 lg:space-y-0">
        <div className="flex-1 sm:flex-1 lg:flex-none">
          <SidebarStats stats={stats} minHeight="min-h-[80px] sm:min-h-[100px]" />
        </div>
        <div className="flex-1 sm:flex-1 lg:flex-none">
          <SidebarFilter
            selectedMagnitude={selectedMagnitude}
            setSelectedMagnitude={setSelectedMagnitude}
            minHeight="min-h-[100px] sm:min-h-[120px]"
          />
        </div>
      </div>
      <div className="flex-1 min-h-0 lg:flex-1">
        <SidebarScale minHeight="h-full max-h-[200px] lg:max-h-full overflow-y-auto" />
      </div>
    </div>
  )
}
