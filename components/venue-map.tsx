'use client'

import { useEffect, useRef } from 'react'

// Leaflet loaded from CDN at runtime (no build dependency). We attach the
// map to a ref'd div after the script loads. Minimal typing to avoid `any`.
interface LeafletMarker {
  addTo(map: LeafletMap): LeafletMarker
  bindPopup(html: string): LeafletMarker
  openPopup(): LeafletMarker
}
interface LeafletTileLayer {
  addTo(map: LeafletMap): LeafletTileLayer
}
interface LeafletMap {
  setView(coords: [number, number], zoom: number): LeafletMap
  remove(): void
}
interface LeafletStatic {
  map(el: HTMLElement, opts?: Record<string, unknown>): LeafletMap
  tileLayer(url: string, opts?: Record<string, unknown>): LeafletTileLayer
  marker(coords: [number, number]): LeafletMarker
}

declare global {
  interface Window {
    L?: LeafletStatic
  }
}

interface VenueMapProps {
  lat: number
  lng: number
  label: string
}

const LEAFLET_CSS = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
const LEAFLET_JS = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'

// CARTO dark basemap tiles — matches the site's dark aesthetic. Still OSM data.
const DARK_TILES = 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
const ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions" target="_blank" rel="noopener">CARTO</a>'

function ensureLeaflet(): Promise<LeafletStatic> {
  return new Promise((resolve, reject) => {
    if (window.L) {
      resolve(window.L)
      return
    }

    // Inject CSS once.
    if (!document.querySelector(`link[href="${LEAFLET_CSS}"]`)) {
      const link = document.createElement('link')
      link.rel = 'stylesheet'
      link.href = LEAFLET_CSS
      document.head.appendChild(link)
    }

    // Inject JS once.
    const existing = document.querySelector<HTMLScriptElement>(`script[src="${LEAFLET_JS}"]`)
    if (existing) {
      existing.addEventListener('load', () => (window.L ? resolve(window.L) : reject(new Error('Leaflet failed to load'))))
      existing.addEventListener('error', () => reject(new Error('Leaflet failed to load')))
      return
    }

    const script = document.createElement('script')
    script.src = LEAFLET_JS
    script.async = true
    script.onload = () => (window.L ? resolve(window.L) : reject(new Error('Leaflet failed to load')))
    script.onerror = () => reject(new Error('Leaflet failed to load'))
    document.body.appendChild(script)
  })
}

export function VenueMap({ lat, lng, label }: VenueMapProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<LeafletMap | null>(null)

  useEffect(() => {
    let cancelled = false

    ensureLeaflet()
      .then((L) => {
        if (cancelled || !containerRef.current || mapRef.current) return
        const map = L.map(containerRef.current, {
          center: [lat, lng],
          zoom: 15,
          scrollWheelZoom: false,
          attributionControl: true,
        })
        L.tileLayer(DARK_TILES, { attribution: ATTRIBUTION, maxZoom: 19 }).addTo(map)
        L.marker([lat, lng]).addTo(map).bindPopup(label).openPopup()
        mapRef.current = map
      })
      .catch(() => {
        // Leaflet failed to load (offline/CDN blocked) — leave the fallback text.
      })

    return () => {
      cancelled = true
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
      }
    }
  }, [lat, lng, label])

  return (
    <div
      ref={containerRef}
      className="h-44 w-full bg-[#0d1220] text-xs text-white/40"
      aria-label={`Map showing ${label}`}
    >
      {/* Fallback shown until Leaflet initializes (or if it fails to load). */}
      <span className="flex h-full items-center justify-center">Loading map…</span>
    </div>
  )
}
