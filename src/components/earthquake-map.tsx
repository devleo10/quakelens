import { useEffect, useRef } from "react"
import L from "leaflet"
import "leaflet/dist/leaflet.css"

interface Earthquake {
  id: string
  properties: {
    mag: number
    place: string
    time: number
    title: string
    url: string
    type: string
    alert: string | null
    tsunami: number
  }
  geometry: {
    coordinates: [number, number, number] // [longitude, latitude, depth]
  }
}

interface EarthquakeMapProps {
  earthquakes: Earthquake[]
  getMagnitudeColor: (magnitude: number) => string
  getMagnitudeSize: (magnitude: number) => number
  formatTime: (timestamp: number) => string
  onSelectEarthquake?: (earthquake: Earthquake) => void // added callback for details
}

export default function EarthquakeMap({
  earthquakes,
  getMagnitudeColor,
  getMagnitudeSize,
  formatTime,
  onSelectEarthquake, // destructure the new prop
}: EarthquakeMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<L.Map | null>(null)
  const markersRef = useRef<L.CircleMarker[]>([])

  useEffect(() => {
    if (!mapRef.current) return

    // Initialize map
    if (!mapInstanceRef.current) {
      try {
        mapInstanceRef.current = L.map(mapRef.current, {
          center: [20, 0],
          zoom: 2,
          minZoom: 2,
          maxZoom: 18,
          zoomControl: true,
          scrollWheelZoom: true,
          doubleClickZoom: true,
          boxZoom: true,
          keyboard: true,
          dragging: true,
          touchZoom: true,
          worldCopyJump: false, // Disable world wrapping
          maxBounds: [
            [-90, -180],
            [90, 180],
          ], // Constrain to world bounds
          maxBoundsViscosity: 1.0, // Strong boundary enforcement
          preferCanvas: false, // Use SVG for better performance with many markers
        })

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: "© OpenStreetMap contributors",
          maxZoom: 18,
          noWrap: true, // Prevent tile wrapping
          bounds: [
            [-90, -180],
            [90, 180],
          ], // Tile bounds
        }).addTo(mapInstanceRef.current)

        mapInstanceRef.current.on("zoomend", () => {
          updateMarkers()
        })

        mapInstanceRef.current.on("moveend", () => {
          const map = mapInstanceRef.current
          if (map) {
            const center = map.getCenter()

            // Ensure we stay within world bounds
            if (center.lng < -180 || center.lng > 180) {
              map.panTo([center.lat, Math.max(-180, Math.min(180, center.lng))])
            }
          }
        })

        // Force Leaflet to recalculate size after mount - multiple attempts for reliability
        setTimeout(() => {
          mapInstanceRef.current?.invalidateSize();
        }, 0);
        
        setTimeout(() => {
          mapInstanceRef.current?.invalidateSize();
        }, 100);
        
        setTimeout(() => {
          mapInstanceRef.current?.invalidateSize();
        }, 300);
      } catch (error) {
        console.error('Error initializing map:', error);
      }
    }

    const updateMarkers = () => {
      // Clear existing markers
      markersRef.current.forEach((marker) => {
        mapInstanceRef.current?.removeLayer(marker)
      })
      markersRef.current = []

      if (!mapInstanceRef.current) return

      const zoom = mapInstanceRef.current.getZoom()
      const baseScale = Math.pow(1.8, zoom - 2) // More responsive scaling
      const markerScale = Math.max(0.3, Math.min(8, baseScale)) // Wider scale range
      const borderScale = Math.max(0.8, Math.min(3, baseScale * 0.6))

      // Add earthquake markers with improved zoom-responsive sizing
      earthquakes.forEach((earthquake) => {
        const [longitude, latitude] = earthquake.geometry.coordinates
        const magnitude = earthquake.properties.mag

        if (latitude && longitude && mapInstanceRef.current) {
          const baseSizeFromMagnitude = getMagnitudeSize(magnitude)
          const scaledRadius = (baseSizeFromMagnitude / 2.5) * markerScale
          const finalRadius = Math.max(3, Math.min(60, scaledRadius))

          const marker = L.circleMarker([latitude, longitude], {
            radius: finalRadius,
            fillColor: getMagnitudeColor(magnitude),
            color: "#ffffff",
            weight: Math.max(1, 2.5 * borderScale),
            opacity: 1,
            fillOpacity: 0.85,
            className: "earthquake-marker",
          })

          marker.addTo(mapInstanceRef.current)
          markersRef.current.push(marker)

          // Add click event to marker for selecting earthquake
          marker.on("click", () => {
            if (onSelectEarthquake) {
              onSelectEarthquake(earthquake)
            }
          })
        }
      })
    }

    updateMarkers()

    return () => {
      // Cleanup markers
      markersRef.current.forEach((marker) => {
        mapInstanceRef.current?.removeLayer(marker)
      })
      markersRef.current = []
    }
  }, [earthquakes, getMagnitudeColor, getMagnitudeSize, formatTime, onSelectEarthquake])

  // Add effect to handle container resize
  useEffect(() => {
    const handleResize = () => {
      if (mapInstanceRef.current) {
        setTimeout(() => {
          mapInstanceRef.current?.invalidateSize();
        }, 50);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [])

  return (
    <div 
      ref={mapRef} 
      className="w-full h-full rounded-lg min-h-[200px]" 
      style={{ 
        overflow: 'hidden', 
        position: 'relative', 
        zIndex: 1,
        background: '#f8fafc' // Fallback background while map loads
      }} 
    />
  )
}
