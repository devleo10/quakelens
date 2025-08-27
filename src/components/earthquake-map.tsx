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
        const [longitude, latitude, depth] = earthquake.geometry.coordinates
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

          const popupContent = `
            <div style="padding: 16px; min-width: 280px; max-width: 320px; font-family: inherit; color: hsl(var(--card-foreground));">
              <h3 style="font-weight: bold; font-size: 18px; margin-bottom: 12px; color: hsl(var(--card-foreground)); line-height: 1.2;">${earthquake.properties.title}</h3>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; font-size: 14px; margin-bottom: 12px;">
                <div style="display: flex; flex-direction: column; gap: 8px;">
                  <div>
                    <span style="color: hsl(var(--muted-foreground)); display: block; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em;">Magnitude</span>
                    <span style="font-weight: bold; font-size: 18px; color: ${getMagnitudeColor(magnitude)}">${magnitude.toFixed(1)}</span>
                  </div>
                  <div>
                    <span style="color: hsl(var(--muted-foreground)); display: block; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em;">Depth</span>
                    <span style="font-weight: 600;">${depth.toFixed(1)} km</span>
                  </div>
                </div>
                <div style="display: flex; flex-direction: column; gap: 8px;">
                  <div>
                    <span style="color: hsl(var(--muted-foreground)); display: block; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em;">Time</span>
                    <span style="font-weight: 600; font-size: 12px;">${formatTime(earthquake.properties.time)}</span>
                  </div>
                  <div>
                    <span style="color: hsl(var(--muted-foreground)); display: block; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em;">Coordinates</span>
                    <span style="font-family: monospace; font-size: 12px;">${latitude.toFixed(3)}, ${longitude.toFixed(3)}</span>
                  </div>
                </div>
              </div>
              <div style="margin-bottom: 12px;">
                <span style="color: hsl(var(--muted-foreground)); display: block; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 4px;">Location</span>
                <span style="font-weight: 500; font-size: 14px;">${earthquake.properties.place}</span>
              </div>
              ${
                earthquake.properties.tsunami
                  ? '<div style="margin-bottom: 12px; padding: 12px; background-color: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.2); border-radius: 8px;"><div style="display: flex; align-items: center; gap: 8px; color: #dc2626; font-size: 14px; font-weight: 600;">🌊 Tsunami Warning</div></div>'
                  : ""
              }
              ${
                earthquake.properties.alert
                  ? `<div style="margin-bottom: 12px; padding: 8px; background-color: rgba(251, 191, 36, 0.1); border: 1px solid rgba(251, 191, 36, 0.2); border-radius: 6px; color: #d97706; font-size: 14px; font-weight: 500;">⚠️ Alert Level: ${earthquake.properties.alert.toUpperCase()}</div>`
                  : ""
              }
              <div style="padding-top: 12px; border-top: 1px solid hsl(var(--border));">
                <a 
                  href="${earthquake.properties.url}" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style="display: inline-flex; align-items: center; gap: 4px; color: hsl(var(--primary)); font-size: 14px; font-weight: 600; text-decoration: none; transition: color 0.2s ease;"
                  onmouseover="this.style.color='hsl(var(--primary)/0.8)'"
                  onmouseout="this.style.color='hsl(var(--primary))'"
                >
                  View USGS Details
                  <svg style="width: 12px; height: 12px;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                  </svg>
                </a>
              </div>
            </div>
          `

          marker.bindPopup(popupContent, {
            maxWidth: 350,
            className: "earthquake-popup",
            closeButton: true,
            autoPan: true,
            autoPanPaddingTopLeft: [10, 10],
            autoPanPaddingBottomRight: [10, 10],
            autoClose: true,
            closeOnClick: false,
            keepInView: true,
            offset: [0, -10],
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
