import { useState, useEffect } from 'react'
import type { EarthquakeData } from '@/types/earthquake'

export const useEarthquakeData = () => {
  const [earthquakeData, setEarthquakeData] = useState<EarthquakeData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchEarthquakeData = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson")
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data: EarthquakeData = await response.json()
      setEarthquakeData(data)
    } catch (err) {
      console.error("Error fetching earthquake data:", err)
      setError("Failed to fetch earthquake data. Please check your internet connection and try again.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchEarthquakeData()
  }, [])

  return {
    earthquakeData,
    loading,
    error,
    fetchEarthquakeData
  }
}
