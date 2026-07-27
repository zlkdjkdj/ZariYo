import { useState, useEffect, useRef } from 'react';
import { Navigation, Compass, Radio, ShieldCheck, Search } from 'lucide-react';
import { GoogleStoreMap } from './GoogleStoreMap';

interface InteractiveStoreMapProps {
  address: string;
  storeName: string;
}

declare global {
  interface Window {
    L: any;
  }
}

// 주소 텍스트 1차 오프라인 맵핑 헬퍼 (초기 렌더링 속도 보장)
function getCoordinatesByAddress(address: string): { lat: number; lng: number; locationName: string } {
  const addr = address.trim();
  if (addr.includes('부산') || addr.includes('해운대')) {
    return { lat: 35.1587, lng: 129.1604, locationName: '부산 해운대 센터' };
  } else if (addr.includes('대구')) {
    return { lat: 35.8714, lng: 128.6014, locationName: '대구 중앙 센터' };
  } else if (addr.includes('인천')) {
    return { lat: 37.4563, lng: 126.7052, locationName: '인천 송도 센터' };
  } else if (addr.includes('대전')) {
    return { lat: 36.3504, lng: 127.3845, locationName: '대전 둔산 센터' };
  } else if (addr.includes('광주')) {
    return { lat: 35.1595, lng: 126.8526, locationName: '광주 상무 센터' };
  } else if (addr.includes('판교') || addr.includes('분당')) {
    return { lat: 37.3948, lng: 127.1112, locationName: '성남 판교 테크노밸리' };
  } else if (addr.includes('홍대') || addr.includes('마포')) {
    return { lat: 37.5563, lng: 126.9227, locationName: '서울 홍대입구' };
  } else if (addr.includes('여의도')) {
    return { lat: 37.5216, lng: 126.9242, locationName: '서울 여의도 금융센터' };
  } else {
    return { lat: 37.5000, lng: 127.0360, locationName: '서울 강남 테헤란로 본점' };
  }
}

export function InteractiveStoreMap({ address, storeName }: InteractiveStoreMapProps) {
  const googleApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  // 구글 맵 API 키가 설정된 경우 Google Maps 엔진으로 전환
  if (googleApiKey && googleApiKey.trim().length > 0 && googleApiKey !== 'YOUR_GOOGLE_MAPS_API_KEY_HERE') {
    return <GoogleStoreMap apiKey={googleApiKey} address={address} storeName={storeName} />;
  }

  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<any>(null);
  const markerRef = useRef<any>(null);

  const [isLeafletLoaded, setIsLeafletLoaded] = useState(false);
  const [isGeocoding, setIsGeocoding] = useState(false);
  const [coords, setCoords] = useState(() => getCoordinatesByAddress(address));

  // 1. Leaflet Map Engine CSS 및 JS 비동기 로더
  useEffect(() => {
    if (window.L) {
      setIsLeafletLoaded(true);
      return;
    }

    // Load Leaflet CSS
    const cssId = 'leaflet-css';
    if (!document.getElementById(cssId)) {
      const link = document.createElement('link');
      link.id = cssId;
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(link);
    }

    // Load Leaflet JS
    const jsId = 'leaflet-js';
    let script = document.getElementById(jsId) as HTMLScriptElement;
    if (!script) {
      script = document.createElement('script');
      script.id = jsId;
      script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
      script.async = true;
      script.onload = () => setIsLeafletLoaded(true);
      document.head.appendChild(script);
    } else {
      script.addEventListener('load', () => setIsLeafletLoaded(true));
    }
  }, []);

  // 2. Leaflet Interactive Map 캔버스 초기화
  useEffect(() => {
    if (!isLeafletLoaded || !mapContainerRef.current || mapInstanceRef.current) return;

    try {
      const L = window.L;
      const initialPos = [coords.lat, coords.lng];

      // Create Leaflet Map Instance
      const map = L.map(mapContainerRef.current, {
        center: initialPos,
        zoom: 16,
        zoomControl: true,
        attributionControl: false,
      });

      // High Contrast High Readability Map Tile Layer (CartoDB Voyager)
      L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        maxZoom: 19,
        subdomains: 'abcd',
      }).addTo(map);

      // High Visibility Premium Custom Marker Icon
      const customIcon = L.divIcon({
        className: 'custom-map-marker',
        html: `
          <div style="position: relative; display: flex; flex-direction: column; align-items: center; filter: drop-shadow(0 4px 10px rgba(0,0,0,0.3));">
            <div style="width: 38px; height: 38px; background: #09090b; border: 3px solid #10b981; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 0 20px rgba(16,185,129,0.7);">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="#10b981" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3" fill="#ffffff"/></svg>
            </div>
            <div style="margin-top: 6px; padding: 4px 10px; background: #09090b; border: 2px solid #10b981; font-size: 11px; font-weight: 900; color: #ffffff; border-radius: 4px; white-space: nowrap; font-family: sans-serif; box-shadow: 0 4px 12px rgba(0,0,0,0.5);">
              📍 ${storeName || '내 매장 지점'}
            </div>
          </div>
        `,
        iconSize: [44, 56],
        iconAnchor: [22, 50],
      });

      const marker = L.marker(initialPos, { icon: customIcon }).addTo(map);
      mapInstanceRef.current = map;
      markerRef.current = marker;

    } catch (e) {
      console.error('Error initializing Leaflet map', e);
    }
  }, [isLeafletLoaded]);

  // 3. 주소 변경 시 Nominatim Geocoding API 실시간 요청 및 FlyTo 카메라 이동
  useEffect(() => {
    if (!address || address.trim().length === 0) return;

    setIsGeocoding(true);
    const query = address.trim();

    const fetchGeocoding = async () => {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`
        );
        const data = await response.json();

        if (data && data.length > 0) {
          const lat = parseFloat(data[0].lat);
          const lng = parseFloat(data[0].lon);
          const newPos: [number, number] = [lat, lng];

          setCoords({ lat, lng, locationName: data[0].display_name.split(',')[0] });

          if (mapInstanceRef.current) {
            mapInstanceRef.current.flyTo(newPos, 16, { duration: 1.2 });
            if (markerRef.current) {
              markerRef.current.setLatLng(newPos);
            }
          }
        } else {
          // Geocoding 미발견 시 오프라인 정산 헬퍼 사용
          const fallback = getCoordinatesByAddress(query);
          setCoords(fallback);
          if (mapInstanceRef.current) {
            mapInstanceRef.current.flyTo([fallback.lat, fallback.lng], 16, { duration: 1.0 });
            if (markerRef.current) {
              markerRef.current.setLatLng([fallback.lat, fallback.lng]);
            }
          }
        }
      } catch (e) {
        const fallback = getCoordinatesByAddress(query);
        setCoords(fallback);
      } finally {
        setIsGeocoding(false);
      }
    };

    const timer = setTimeout(fetchGeocoding, 400);
    return () => clearTimeout(timer);
  }, [address]);

  return (
    <div className="w-full bg-neutral-900 border border-neutral-800 rounded-none overflow-hidden select-none relative group shadow-2xl">
      
      {/* Top Header Bar */}
      <div className="px-4 py-3 bg-[#09090b] border-b border-white/10 flex items-center justify-between z-10 relative">
        <div className="flex items-center gap-2">
          <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
          <span className="text-xs font-black text-white font-mono tracking-wider uppercase">
            REAL INTERACTIVE MAP API
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[9.5px] font-mono font-bold text-neutral-400 bg-white/10 px-2 py-0.5 rounded">
            LAT: {coords.lat.toFixed(4)} | LNG: {coords.lng.toFixed(4)}
          </span>
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
        </div>
      </div>

      {/* Real Interactive Leaflet Canvas Container */}
      <div className="relative w-full h-[280px] overflow-hidden bg-[#f4f4f5]">
        
        {/* Geocoding Loading Indicator */}
        {isGeocoding && (
          <div className="absolute top-3 right-3 z-[1000] bg-black/90 border border-emerald-400 px-3.5 py-1.5 rounded backdrop-blur-md flex items-center gap-2 text-xs font-black font-mono text-emerald-400 shadow-xl">
            <Search className="w-4 h-4 animate-spin text-emerald-400" />
            <span>실시간 지점 좌표 맵핑 중...</span>
          </div>
        )}

        {/* Map Canvas */}
        <div ref={mapContainerRef} className="w-full h-full z-0 filter saturate-[1.1]" />

        {/* Compass Overlay */}
        <div className="absolute top-3 left-3 z-[1000] flex flex-col gap-1 pointer-events-none">
          <div className="p-2 bg-black/80 border border-white/20 backdrop-blur-md text-white shadow-lg">
            <Navigation className="w-4 h-4 transform -rotate-45" />
          </div>
          <div className="p-2 bg-black/80 border border-white/20 backdrop-blur-md text-white shadow-lg">
            <Compass className="w-4 h-4" />
          </div>
        </div>

      </div>

      {/* Bottom Address Bar */}
      <div className="px-4 py-3 bg-[#09090b] border-t border-white/10 flex items-center justify-between text-xs sm:text-sm">
        <div className="flex items-center gap-2.5 truncate">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="font-extrabold text-white truncate">
            {address || '주소를 입력하면 지점이 자동으로 실시간 맵핑됩니다'}
          </span>
        </div>
        <span className="text-[10px] font-mono font-bold text-neutral-400 shrink-0 uppercase bg-white/10 px-2 py-0.5 rounded">
          HIGH CONTRAST MAP
        </span>
      </div>

    </div>
  );
}
