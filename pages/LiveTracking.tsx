import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import L from 'leaflet';

// Pune Center Coordinates (Swargate area)
const PUNE_CENTER = { lat: 18.5018, lng: 73.8636 };

// Interfaces
interface BusStop {
  id: number;
  lat: number;
  lng: number;
  name: string;
}

interface Bus {
  id: string;
  route: string;
  lat: number;
  lng: number;
  bearing: number;
  status: string;
  destination: string;
  occupancy: string;
  nextStop: string;
  targetStopIndex: number; // Index of the stop moving towards
}

const LiveTracking: React.FC = () => {
  const navigate = useNavigate();
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const markersRef = useRef<{ [key: string]: L.Marker }>({});
  const stopMarkersRef = useRef<L.CircleMarker[]>([]);
  
  const [stops, setStops] = useState<BusStop[]>([]);
  const [buses, setBuses] = useState<Bus[]>([]);
  const [selectedBus, setSelectedBus] = useState<Bus | null>(null);
  const [loading, setLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(document.documentElement.classList.contains('dark'));

  // Observe dark mode changes
  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          setIsDarkMode(document.documentElement.classList.contains('dark'));
        }
      });
    });
    observer.observe(document.documentElement, { attributes: true });
    return () => observer.disconnect();
  }, []);

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    // Fix for default marker icons
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
      iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    });

    const map = L.map(mapContainerRef.current, {
      center: [PUNE_CENTER.lat, PUNE_CENTER.lng],
      zoom: 15,
      zoomControl: false,
      attributionControl: false
    });

    mapRef.current = map;

    // Add User Location Marker (Simulated at Swargate)
    const userIcon = L.divIcon({
      className: 'bg-transparent',
      html: `
        <div class="relative flex items-center justify-center size-6 bg-blue-400/30 rounded-full animate-pulse">
            <div class="size-3 bg-blue-400 rounded-full border-2 border-white shadow-lg"></div>
        </div>
      `,
      iconSize: [24, 24],
      iconAnchor: [12, 12]
    });

    L.marker([PUNE_CENTER.lat, PUNE_CENTER.lng], { icon: userIcon }).addTo(map);

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // Update Tile Layer based on Theme
  useEffect(() => {
    if (!mapRef.current) return;
    const map = mapRef.current;
    
    map.eachLayer((layer) => {
      if (layer instanceof L.TileLayer) {
        map.removeLayer(layer);
      }
    });

    const tileUrl = isDarkMode 
      ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
      : 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';
    
    L.tileLayer(tileUrl, {
      maxZoom: 20,
      subdomains: 'abcd',
    }).addTo(map);
  }, [isDarkMode]);

  // Fetch Real Data from Overpass API (OpenStreetMap)
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Query for bus stops around Pune Center
        const query = `
          [out:json][timeout:25];
          node["highway"="bus_stop"](around:3000, ${PUNE_CENTER.lat}, ${PUNE_CENTER.lng});
          out 30;
        `;
        const response = await fetch(`https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`);
        const data = await response.json();

        const fetchedStops: BusStop[] = data.elements.map((el: any) => ({
          id: el.id,
          lat: el.lat,
          lng: el.lon,
          name: el.tags.name || el.tags.description || "Local Stop"
        }));

        setStops(fetchedStops);

        // Generate Buses based on real stops
        const newBuses: Bus[] = [];
        const routeNumbers = ['24', '115', '101', '305', '98', '204', '10'];
        const destinations = ['Katraj', 'Shivajinagar', 'Kothrud', 'Nigdi', 'Hadapsar'];
        
        // Spawn 8 buses at random stops
        for (let i = 0; i < 8; i++) {
          const startStopIndex = Math.floor(Math.random() * fetchedStops.length);
          const startStop = fetchedStops[startStopIndex];
          const targetIndex = (startStopIndex + 1) % fetchedStops.length;
          
          newBuses.push({
            id: `bus-${i}`,
            route: routeNumbers[i % routeNumbers.length],
            lat: startStop.lat,
            lng: startStop.lng,
            bearing: Math.random() * 360,
            status: Math.random() > 0.8 ? 'Delayed' : 'On Time',
            destination: destinations[i % destinations.length],
            occupancy: Math.random() > 0.7 ? 'High' : (Math.random() > 0.4 ? 'Medium' : 'Low'),
            nextStop: fetchedStops[targetIndex].name,
            targetStopIndex: targetIndex
          });
        }
        
        setBuses(newBuses);
        if (newBuses.length > 0) setSelectedBus(newBuses[0]);
        setLoading(false);

      } catch (error) {
        console.error("Failed to fetch OSM data", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Display Stops on Map
  useEffect(() => {
    if (!mapRef.current || stops.length === 0) return;
    
    // Clear old stop markers
    stopMarkersRef.current.forEach(m => m.remove());
    stopMarkersRef.current = [];

    stops.forEach(stop => {
      const circle = L.circleMarker([stop.lat, stop.lng], {
        radius: 4,
        fillColor: isDarkMode ? '#ffffff' : '#555555',
        color: 'transparent',
        weight: 1,
        opacity: 1,
        fillOpacity: 0.5
      }).addTo(mapRef.current!);
      
      circle.bindPopup(`<div class="text-xs font-bold">${stop.name}</div>`);
      stopMarkersRef.current.push(circle);
    });

  }, [stops, isDarkMode]);

  // Simulate Bus Movement between Real Stops
  useEffect(() => {
    if (stops.length === 0) return;

    const interval = setInterval(() => {
      setBuses(currentBuses => 
        currentBuses.map(bus => {
          const targetStop = stops[bus.targetStopIndex];
          
          // Calculate distance to target
          const dLat = targetStop.lat - bus.lat;
          const dLng = targetStop.lng - bus.lng;
          const dist = Math.sqrt(dLat * dLat + dLng * dLng);

          // If arrived (close enough), pick next stop
          if (dist < 0.0005) {
             const nextIndex = (bus.targetStopIndex + Math.floor(Math.random() * 3) + 1) % stops.length;
             return {
                ...bus,
                targetStopIndex: nextIndex,
                nextStop: stops[nextIndex].name,
                // Stay put for a moment in a real app, but here we just turn
             };
          }

          // Move towards target
          const speed = 0.00008; // movement speed
          const moveLat = (dLat / dist) * speed;
          const moveLng = (dLng / dist) * speed;
          
          // Calculate bearing
          const y = Math.sin(dLng) * Math.cos(targetStop.lat);
          const x = Math.cos(bus.lat) * Math.sin(targetStop.lat) - Math.sin(bus.lat) * Math.cos(targetStop.lat) * Math.cos(dLng);
          const brng = (Math.atan2(y, x) * 180 / Math.PI + 360) % 360; // Just an approximation for visualization

          return {
            ...bus,
            lat: bus.lat + moveLat,
            lng: bus.lng + moveLng,
            bearing: brng
          };
        })
      );
    }, 100); // Smooth animation at 100ms

    return () => clearInterval(interval);
  }, [stops]);

  // Update Bus Markers
  useEffect(() => {
    if (!mapRef.current) return;

    buses.forEach(bus => {
      const isSelected = selectedBus?.id === bus.id;
      
      const busHtml = `
        <div class="flex flex-col items-center gap-1 cursor-pointer transition-transform duration-300 ${isSelected ? 'scale-110 z-50' : 'z-10 hover:scale-105'}">
          ${isSelected ? `<div class="bg-surface-dark px-2 py-1 rounded text-[10px] font-bold shadow-lg border border-slate-700 whitespace-nowrap text-white">Bus ${bus.route} • ${bus.status}</div>` : ''}
          <div class="relative flex items-center justify-center w-10 h-10 ${isSelected ? 'bg-primary' : 'bg-surface-dark'} rounded-full shadow-lg border-2 ${isSelected ? 'border-white dark:border-[#111418]' : 'border-slate-600'} transform transition-colors">
            <span class="material-symbols-outlined ${isSelected ? 'text-white' : 'text-primary'} text-[20px]" style="transform: rotate(${bus.bearing}deg)">navigation</span>
          </div>
        </div>
      `;

      const icon = L.divIcon({
        className: 'bg-transparent',
        html: busHtml,
        iconSize: [40, 50],
        iconAnchor: [20, 25]
      });

      if (markersRef.current[bus.id]) {
        const marker = markersRef.current[bus.id];
        marker.setLatLng([bus.lat, bus.lng]);
        marker.setIcon(icon);
        marker.setZIndexOffset(isSelected ? 1000 : 0);
      } else {
        const marker = L.marker([bus.lat, bus.lng], { icon })
          .addTo(mapRef.current)
          .on('click', () => {
             // We need to find the bus in the current state to set it, 
             // but here we just set the local bus object which is fine for ID matching
             // Ideally we'd look it up from the state to get fresh data
             setSelectedBus(bus); 
             mapRef.current?.flyTo([bus.lat, bus.lng], 16, { duration: 1.5 });
          });
        markersRef.current[bus.id] = marker;
      }
    });
  }, [buses, selectedBus]);

  // Update selected bus object from state for UI freshness
  useEffect(() => {
    if (selectedBus) {
      const freshBus = buses.find(b => b.id === selectedBus.id);
      if (freshBus) setSelectedBus(freshBus);
    }
  }, [buses]);

  return (
    <div className="h-full w-full flex flex-col relative bg-background-dark text-white font-display overflow-hidden">
      
      {/* Interactive Map Container */}
      <div id="map" ref={mapContainerRef} className="absolute inset-0 z-0 bg-background-light dark:bg-background-dark"></div>

      {loading && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
           <div className="flex flex-col items-center">
             <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mb-2"></div>
             <p className="text-sm font-medium text-white">Fetching PMPML Data...</p>
           </div>
        </div>
      )}

      {/* Top Search Area */}
      <div className="relative z-20 w-full px-4 pt-4 pointer-events-none">
        <div className="pointer-events-auto flex items-center gap-3 w-full max-w-md mx-auto">
             <button onClick={() => navigate(-1)} className="w-12 h-12 bg-white/95 dark:bg-surface-dark/95 backdrop-blur-md rounded-full shadow-lg border border-slate-200 dark:border-slate-700/50 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                <span className="material-symbols-outlined text-slate-700 dark:text-white">arrow_back</span>
             </button>
            <div className="flex-1 h-12 bg-white/95 dark:bg-surface-dark/95 backdrop-blur-md rounded-full shadow-lg border border-slate-200 dark:border-slate-700/50 flex items-center px-4 transition-all focus-within:ring-2 focus-within:ring-primary/50">
                <span className="material-symbols-outlined text-text-secondary">search</span>
                <input className="w-full bg-transparent border-none text-slate-900 dark:text-white placeholder-text-secondary focus:ring-0 text-sm ml-2 font-medium focus:outline-none" type="text" placeholder="Search Bus No. or Route" />
                <button className="p-1 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
                    <span className="material-symbols-outlined text-text-secondary">mic</span>
                </button>
            </div>
        </div>
      </div>

      {/* FABs */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-20">
        <button className="w-10 h-10 bg-white/90 dark:bg-surface-dark/90 backdrop-blur rounded-lg shadow-lg border border-slate-200 dark:border-slate-700/50 flex items-center justify-center hover:bg-primary hover:border-primary transition-colors group">
            <span className="material-symbols-outlined text-slate-700 dark:text-white group-hover:text-white">layers</span>
        </button>
        <button className="w-10 h-10 bg-white/90 dark:bg-surface-dark/90 backdrop-blur rounded-lg shadow-lg border border-slate-200 dark:border-slate-700/50 flex items-center justify-center hover:bg-primary hover:border-primary transition-colors group">
            <span className="material-symbols-outlined text-slate-700 dark:text-white group-hover:text-white">traffic</span>
        </button>
      </div>

       <div className="absolute right-4 bottom-80 z-20">
            <button 
                onClick={() => {
                   mapRef.current?.flyTo([PUNE_CENTER.lat, PUNE_CENTER.lng], 15);
                }}
                className="size-12 bg-white text-slate-900 rounded-full shadow-xl flex items-center justify-center hover:bg-gray-100 transition-colors"
            >
                <span className="material-symbols-outlined">my_location</span>
            </button>
        </div>

      {/* Bottom Sheet */}
      {selectedBus && (
        <div className="absolute bottom-0 left-0 right-0 z-30 flex flex-col justify-end pointer-events-none h-full">
            <div className="w-full bg-white dark:bg-background-dark border-t border-slate-200 dark:border-slate-800 rounded-t-3xl shadow-[0_-5px_30px_rgba(0,0,0,0.2)] dark:shadow-[0_-5px_30px_rgba(0,0,0,0.5)] pointer-events-auto transition-transform duration-300 ease-out flex flex-col max-h-[60%]">
                <div className="w-full flex justify-center pt-3 pb-1 cursor-grab active:cursor-grabbing">
                    <div className="w-12 h-1.5 bg-slate-300 dark:bg-slate-600 rounded-full"></div>
                </div>
                
                <div className="px-5 pt-2 pb-4">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-4">
                            <div className="flex items-center justify-center size-12 rounded-xl bg-primary/10 text-primary border border-primary/20">
                                <span className="material-symbols-outlined text-[28px]">directions_bus</span>
                            </div>
                            <div>
                                <div className="flex items-center gap-2">
                                    <h2 className="text-xl font-bold text-slate-900 dark:text-white leading-tight">Bus {selectedBus.route}</h2>
                                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold border uppercase tracking-wide ${selectedBus.status === 'Delayed' ? 'bg-red-500/10 text-red-500 border-red-500/20' : 'bg-green-500/20 text-green-600 dark:text-green-400 border-green-500/30'}`}>{selectedBus.status}</span>
                                </div>
                                <p className="text-sm text-text-secondary font-medium">Towards {selectedBus.destination}</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-2xl font-bold text-primary">Live</p>
                        </div>
                    </div>

                    <div className="flex gap-3">
                        <button className="flex-1 h-11 bg-primary hover:bg-blue-600 text-white font-medium rounded-xl flex items-center justify-center gap-2 transition-colors shadow-lg shadow-primary/20">
                            <span className="material-symbols-outlined">near_me</span>
                            Start Navigation
                        </button>
                        <button className="size-11 flex-shrink-0 bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-white rounded-xl flex items-center justify-center transition-colors">
                            <span className="material-symbols-outlined">share</span>
                        </button>
                        <button className="size-11 flex-shrink-0 bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-white rounded-xl flex items-center justify-center transition-colors">
                            <span className="material-symbols-outlined">favorite</span>
                        </button>
                    </div>
                </div>

                <div className="h-px bg-slate-200 dark:bg-slate-800 w-full"></div>

                <div className="flex-1 overflow-y-auto px-5 py-4 space-y-6 bg-background-light dark:bg-background-dark pb-8">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white dark:bg-surface-dark p-3 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-col gap-1">
                            <span className="text-xs text-text-secondary uppercase font-semibold">Crowd</span>
                            <div className="flex items-center gap-2">
                                <span className={`material-symbols-outlined text-lg ${selectedBus.occupancy === 'High' ? 'text-red-500' : 'text-green-500'}`}>groups</span>
                                <span className="text-sm font-medium text-slate-900 dark:text-white">{selectedBus.occupancy} Occupancy</span>
                            </div>
                        </div>
                        <div className="bg-white dark:bg-surface-dark p-3 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-col gap-1">
                            <span className="text-xs text-text-secondary uppercase font-semibold">Moving Towards</span>
                            <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary text-lg">signpost</span>
                                <span className="text-sm font-medium text-slate-900 dark:text-white truncate max-w-[120px]" title={selectedBus.nextStop}>{selectedBus.nextStop}</span>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-text-secondary mb-3 uppercase tracking-wider">Route Info</h3>
                        <div className="relative pl-2">
                            <div className="absolute left-[19px] top-2 bottom-4 w-0.5 bg-slate-300 dark:bg-slate-700"></div>
                            
                            <div className="relative flex items-start gap-4 mb-6 group">
                                <div className="relative z-10 flex items-center justify-center size-10 rounded-full bg-white dark:bg-surface-dark border-2 border-primary shadow-[0_0_0_4px_rgba(19,127,236,0.1)]">
                                    <span className="material-symbols-outlined text-primary text-sm">directions_bus</span>
                                </div>
                                <div className="flex-1 pt-1">
                                    <div className="flex justify-between items-center">
                                        <span className="text-base font-bold text-slate-900 dark:text-white">Current Location</span>
                                        <span className="text-sm font-bold text-primary">Now</span>
                                    </div>
                                    <p className="text-sm text-text-secondary text-xs">Lat: {selectedBus.lat.toFixed(4)}, Lng: {selectedBus.lng.toFixed(4)}</p>
                                </div>
                            </div>

                            <div className="relative flex items-start gap-4 mb-6 group">
                                <div className="relative z-10 flex items-center justify-center size-10 rounded-full bg-slate-100 dark:bg-background-dark border-2 border-slate-400 dark:border-slate-600">
                                    <div className="size-2.5 rounded-full bg-slate-400"></div>
                                </div>
                                <div className="flex-1 pt-1 opacity-80">
                                    <div className="flex justify-between items-center">
                                        <span className="text-base font-medium text-slate-900 dark:text-white">{selectedBus.nextStop}</span>
                                        <span className="text-sm text-text-secondary">Next</span>
                                    </div>
                                    <p className="text-sm text-text-secondary">Arriving soon</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default LiveTracking;