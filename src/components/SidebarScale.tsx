import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { MapPin } from "lucide-react"

export default function SidebarScale({ minHeight = "" }: { minHeight?: string }) {
  return (
    <Card className={`bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-0 shadow-lg flex flex-col justify-center ${minHeight}`} style={{ height: '100%', maxHeight: '100%' }}>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-sm">
          <MapPin className="h-4 w-4 text-purple-500" />
          <span>Magnitude Scale</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 p-3">
        {[
          { range: "7+", color: "#dc2626", label: "Major", desc: "Sev." },
          { range: "6-7", color: "#ea580c", label: "Strong", desc: "Mod." },
          { range: "5-6", color: "#d97706", label: "Moderate", desc: "Light" },
          { range: "4-5", color: "#ca8a04", label: "Light", desc: "Felt" },
          { range: "3-4", color: "#65a30d", label: "Minor", desc: "Often" },
          { range: "2-3", color: "#16a34a", label: "Micro", desc: "Rare" },
          { range: "<2", color: "#059669", label: "Micro", desc: "None" },
        ].map(item => (
          <div
            key={item.range}
            className="flex items-center gap-2 py-1 px-1 rounded min-h-0"
            style={{ lineHeight: 1.2 }}
          >
            <div
              className="w-3 h-3 rounded-full flex-shrink-0 shadow-sm"
              style={{ backgroundColor: item.color }}
            />
            <div className="flex-1 flex flex-row items-center justify-between min-w-0">
              <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 w-8">{item.range}</span>
              <span className="text-sm font-medium text-slate-600 dark:text-slate-400 w-12 text-right">{item.label}</span>
              <span className="text-xs text-slate-500 dark:text-slate-500 w-10 text-right">{item.desc}</span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
