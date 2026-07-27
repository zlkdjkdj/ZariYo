import { useState, useEffect, useRef } from 'react';
import { MapPin, Navigation, Compass, Radio } from 'lucide-react';

interface GoogleStoreMapProps {
  apiKey: string;
  address: string;
  storeName: string;
}

declare global {
  interface Window {
    google: any;
    initGoogleMapCallback?: () => void;
  }
}

export function GoogleStoreMap({ apiKey, address, storeName }: GoogleStoreMapProps) {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<any>(null);
  const markerInstanceRef = useRef<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isGeocoding, setIsGeocoding] = useState(false);
  const [currentCoords, setCurrentCoords] = useState<{ lat: number; lng: number }>({ lat: 37.5000, lng: 127.0360 });

  // 1. Load Google Maps JS API script
  useEffect(() => {
    if (window.google && window.google.maps) {
      setIsLoaded(true);
      return;
    }

    const scriptId = 'google-maps-js-sdk';
    let script = document.getElementById(scriptId) as HTMLScriptElement;

    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places,geometry`;
      script.async = true;
      script.defer = true;
      script.onload = () => setIsLoaded(true);
      script.onerror = (err) => console.error('Google Maps API failed to load', err);
      document.head.appendChild(script);
    } else {
      script.addEventListener('load', () => setIsLoaded(true));
    }
  }, [apiKey]);

  // 2. Initialize Google Map Instance
  useEffect(() => {
    if (!isLoaded || !mapContainerRef.current || mapInstanceRef.current) return;

    try {
      const mapOptions = {
        center: currentCoords,
        zoom: 16,
        disableDefaultUI: true,
        zoomControl: true,
        styles: [
          { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
          { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
          { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
          {
            featureType: 'administrative.locality',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#d59563' }],
          },
          {
            featureType: 'poi',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#d59563' }],
          },
          {
            featureType: 'road',
            elementType: 'geometry',
            stylers: [{ color: '#38414e' }],
          },
          {
            featureType: 'road',
            elementType: 'geometry.stroke',
            stylers: [{ color: '#212a37' }],
          },
          {
            featureType: 'road',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#9ca5b3' }],
          },
          {
            featureType: 'water',
            elementType: 'geometry',
            stylers: [{ color: '#17263c' }],
          },
        ],
      };

      const map = new window.google.maps.Map(mapContainerRef.current, mapOptions);
      mapInstanceRef.current = map;

      const marker = new window.google.maps.Marker({
        position: currentCoords,
        map: map,
        title: storeName || '내 매장',
        animation: window.google.maps.Animation.DROP,
      });
      markerInstanceRef.current = marker;

    } catch (e) {
      console.error('Error initializing Google Map', e);
    }
  }, [isLoaded]);

  // 3. Geocode address change and update marker
  useEffect(() => {
    if (!isLoaded || !mapInstanceRef.current || !address) return;

    setIsGeocoding(true);
    const geocoder = new window.google.maps.Geocoder();

    geocoder.geocode({ address: address }, (results: any, status: any) => {
      setIsGeocoding(false);
      if (status === 'OK' && results && results[0]) {
        const loc = results[0].geometry.location;
        const newCoords = { lat: loc.lat(), lng: loc.lng() };
        setCurrentCoords(newCoords);

        mapInstanceRef.current.setCenter(newCoords);
        mapInstanceRef.current.setZoom(16);

        if (markerInstanceRef.current) {
          markerInstanceRef.current.setPosition(newCoords);
          markerInstanceRef.current.setTitle(storeName || '내 매장');
        }
      } else {
        console.warn('Google Maps Geocoding failed:', status);
      }
    });
  }, [isLoaded, address, storeName]);

  return (
    <div className="w-full bg-neutral-900 border border-neutral-800 rounded-none overflow-hidden select-none relative group shadow-2xl">
      
      {/* Top Header Bar */}
      <div className="px-4 py-3 bg-[#09090b] border-b border-white/10 flex items-center justify-between z-10 relative">
        <div className="flex items-center gap-2">
          <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
          <span className="text-xs font-black text-white font-mono tracking-wider uppercase">
            GOOGLE MAPS LIVE ENGINE
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[9.5px] font-mono font-bold text-neutral-400 bg-white/10 px-2 py-0.5 rounded">
            LAT: {currentCoords.lat.toFixed(4)} | LNG: {currentCoords.lng.toFixed(4)}
          </span>
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
        </div>
      </div>

      {/* Google Maps Container */}
      <div className="relative w-full h-[250px] overflow-hidden bg-[#111115]">
        
        {/* Loading Overlay */}
        {(!isLoaded || isGeocoding) && (
          <div className="absolute inset-0 z-20 bg-black/70 backdrop-blur-sm flex items-center justify-center text-xs font-extrabold text-white font-mono gap-2">
            <div className="w-4 h-4 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin" />
            <span>Google Maps 지점 좌표 해석 중...</span>
          </div>
        )}

        {/* Map Canvas */}
        <div ref={mapContainerRef} className="w-full h-full" />

        {/* Compass Overlay */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1 pointer-events-none">
          <div className="p-1.5 bg-black/80 border border-white/10 backdrop-blur-md text-neutral-300">
            <Navigation className="w-3.5 h-3.5 transform -rotate-45" />
          </div>
          <div className="p-1.5 bg-black/80 border border-white/10 backdrop-blur-md text-neutral-300">
            <Compass className="w-3.5 h-3.5" />
          </div>
        </div>

      </div>

      {/* Bottom Address Bar */}
      <div className="px-4 py-2.5 bg-[#09090b] border-t border-white/10 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2 truncate">
          <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="font-bold text-neutral-300 truncate">
            {address || '구글 맵 주소 지점 연동 완료'}
          </span>
        </div>
        <span className="text-[9px] font-mono text-neutral-500 shrink-0 uppercase">
          GOOGLE API CONNECTED
        </span>
      </div>

    </div>
  );
}
