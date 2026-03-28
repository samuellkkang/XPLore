"use client";

import { useEffect, useState, memo } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { useRouter } from "next/navigation";
import type { Opportunity } from "@/lib/mock-data";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface EventsMapProps {
  opportunities: Opportunity[];
}

// Hardcoded coordinates for Blacksburg/Christiansburg locations (MVP)
const locationCoordinates: Record<string, { lat: number; lng: number }> = {
  "Huckleberry Trail, Blacksburg, VA": { lat: 37.2296, lng: -80.4139 },
  "Blacksburg Community Garden, Blacksburg, VA": { lat: 37.2296, lng: -80.4239 },
  "Montgomery County Food Pantry, Christiansburg, VA": { lat: 37.1298, lng: -80.4089 },
  "Various Neighborhoods, Blacksburg, VA": { lat: 37.2296, lng: -80.4139 },
  "Blacksburg Middle School, Blacksburg, VA": { lat: 37.2346, lng: -80.4189 },
  "Montgomery-Floyd Regional Library, Christiansburg, VA": { lat: 37.1398, lng: -80.4089 },
  "Montgomery County Animal Shelter, Christiansburg, VA": { lat: 37.1248, lng: -80.4189 },
  "Virginia Tech Drillfield, Blacksburg, VA": { lat: 37.2284, lng: -80.4234 },
  "Heritage Park, Blacksburg, VA": { lat: 37.2196, lng: -80.4089 },
  "Downtown Blacksburg, Blacksburg, VA": { lat: 37.2296, lng: -80.4139 },
  "Main Street, Christiansburg, VA": { lat: 37.1298, lng: -80.4089 },
};

// Default center: Blacksburg, VA
const DEFAULT_CENTER: [number, number] = [37.2296, -80.4139];

// Fix for default marker icons in Leaflet with Next.js - Dark green markers for regular events
const greenIcon = L.icon({
  iconUrl: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 36' fill='%232D6A4F'%3E%3Cpath d='M12 0C7.58 0 4 3.58 4 8c0 5.5 8 13 8 13s8-7.5 8-13c0-4.42-3.58-8-8-8zm0 11c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z'/%3E%3C/svg%3E",
  iconSize: [30, 45],
  iconAnchor: [15, 45],
  popupAnchor: [0, -45],
});

// Yellow markers for highly recommended events
const yellowIcon = L.icon({
  iconUrl: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 36' fill='%23EAB308'%3E%3Cpath d='M12 0C7.58 0 4 3.58 4 8c0 5.5 8 13 8 13s8-7.5 8-13c0-4.42-3.58-8-8-8zm0 11c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z'/%3E%3C/svg%3E",
  iconSize: [30, 45],
  iconAnchor: [15, 45],
  popupAnchor: [0, -45],
});

// Blue icon for user location
const userLocationIcon = L.icon({
  iconUrl: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%233B82F6'%3E%3Ccircle cx='12' cy='12' r='8'/%3E%3C/svg%3E",
  iconSize: [20, 20],
  iconAnchor: [10, 10],
  popupAnchor: [0, -10],
});

// Component to handle user location
function UserLocationMarker() {
  const [position, setPosition] = useState<[number, number] | null>(null);
  const map = useMap();

  useEffect(() => {
    // Request user's location
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const userPos: [number, number] = [pos.coords.latitude, pos.coords.longitude];
          setPosition(userPos);
          // Optionally center map on user location
          // map.setView(userPos, 13);
        },
        (error) => {
          console.log("Location permission denied or unavailable:", error);
        }
      );
    }
  }, [map]);

  return position === null ? null : (
    <Marker position={position} icon={userLocationIcon}>
      <Popup>
        <div className="p-2">
          <p className="font-semibold text-sm text-blue-600">Your Location</p>
        </div>
      </Popup>
    </Marker>
  );
}

// Memoized to prevent unnecessary re-renders
const EventsMap = memo(function EventsMap({ opportunities }: EventsMapProps) {
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  // Only render map on client side
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="h-[400px] flex items-center justify-center bg-gray-50 rounded-lg border border-border shadow-sm">
        <p className="text-muted-foreground">Loading map...</p>
      </div>
    );
  }

  return (
    <div className="h-[400px] w-full rounded-lg shadow-sm overflow-hidden border border-black">
      <MapContainer
        center={DEFAULT_CENTER}
        zoom={12}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* User location marker */}
        <UserLocationMarker />
        
        {/* Opportunity markers */}
        {opportunities.map((opportunity) => {
          const coordinates = locationCoordinates[opportunity.location];
          if (!coordinates) return null;

          // Use yellow icon for recommended events, dark green for regular events
          const markerIcon = opportunity.recommended ? yellowIcon : greenIcon;

          return (
            <Marker
              key={opportunity.id}
              position={[coordinates.lat, coordinates.lng]}
              icon={markerIcon}
            >
              <Popup>
                <div className="p-2 min-w-[200px]">
                  {opportunity.recommended && (
                    <span className="inline-block px-2 py-0.5 mb-1 text-xs font-semibold bg-yellow-100 text-yellow-800 rounded">
                      Highly Recommended
                    </span>
                  )}
                  <h3 className="font-semibold text-sm text-gray-900 mb-1">
                    {opportunity.title}
                  </h3>
                  <p className="text-xs text-gray-600 mb-2">
                    {opportunity.location}
                  </p>
                  <button
                    onClick={() => router.push(`/opportunities/${opportunity.id}`)}
                    className="w-full bg-[#2D6A4F] text-white px-3 py-1.5 rounded text-xs font-medium hover:bg-[#245a42] transition-colors"
                  >
                    View Details
                  </button>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
});

export default EventsMap;
