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
  fetchEarthquakeData,
  loading,
  className = ""
}: SidebarSectionProps & { className?: string }) {
  return (
    <div className={`flex flex-col h-full space-y-2 mb-2 lg:mb-0 w-full max-w-xs mx-auto ${className}`} style={{ minHeight: 0 }}>
      <SidebarStats stats={stats} minHeight="min-h-[100px]" />
      <SidebarFilter
        selectedMagnitude={selectedMagnitude}
        setSelectedMagnitude={setSelectedMagnitude}
        fetchEarthquakeData={fetchEarthquakeData}
        loading={loading}
        minHeight="min-h-[120px]"
      />
      <div className="flex-1 min-h-0">
        <SidebarScale minHeight="h-full max-h-full overflow-y-auto" />
      </div>
    </div>
  )
}
