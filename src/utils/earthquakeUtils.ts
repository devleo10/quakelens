import type { EarthquakeData } from '@/types/earthquake'

export const getMagnitudeColor = (magnitude: number): string => {
  if (magnitude >= 7) return "#dc2626" // Red 600
  if (magnitude >= 6) return "#ea580c" // Orange 600
  if (magnitude >= 5) return "#d97706" // Amber 600
  if (magnitude >= 4) return "#ca8a04" // Yellow 600
  if (magnitude >= 3) return "#65a30d" // Lime 600
  if (magnitude >= 2) return "#16a34a" // Green 600
  return "#059669" // Emerald 600
}

export const getMagnitudeSize = (magnitude: number): number => {
  return Math.max(4, Math.min(20, magnitude * 3))
}

export const formatTime = (timestamp: number): string => {
  return new Date(timestamp).toLocaleString()
}

export const getStats = (earthquakeData: EarthquakeData | null) => {
  if (!earthquakeData) return null
  
  const magnitudes = earthquakeData.features.map(eq => eq.properties.mag).filter(mag => mag !== null)
  const total = earthquakeData.features.length
  const maxMagnitude = Math.max(...magnitudes)
  const avgMagnitude = (magnitudes.reduce((sum, mag) => sum + mag, 0) / magnitudes.length).toFixed(1)
  
  return { total, maxMagnitude, avgMagnitude }
}
