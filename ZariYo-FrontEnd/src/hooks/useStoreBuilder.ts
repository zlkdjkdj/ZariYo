import { useState, useRef } from 'react';
import type { MouseEvent } from 'react';
import type { StoreInfo, PlacedElement } from '../types/store';
import { storeApi } from '../api/storeApi';

export function useStoreBuilder() {
  const [step, setStep] = useState<1 | 2>(1);

  const [info, setInfo] = useState<StoreInfo>(() => {
    const saved = localStorage.getItem('zariyo_store_info');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return {
      name: '',
      address: '',
      weekdayStart: '09:00',
      weekdayEnd: '22:00',
      weekendStart: '10:00',
      weekendEnd: '21:00',
      breakStart: '15:00',
      breakEnd: '17:00',
      holiday: '연중무휴',
    };
  });

  const [placedElements, setPlacedElements] = useState<PlacedElement[]>(() => {
    const saved = localStorage.getItem('zariyo_store_layout');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return [];
      }
    }
    return [
      { id: '1', type: 'counter', label: '카운터', x: 280, y: 40, width: 160, height: 50, isReservable: false, isTempOccupiedEnabled: false },
      { id: '2', type: 'door', label: '입구', x: 40, y: 380, width: 80, height: 30, isReservable: false, isTempOccupiedEnabled: false },
      { id: '3', type: 'table-4', label: 'T-1', x: 120, y: 160, width: 100, height: 60, isReservable: true, isTempOccupiedEnabled: true },
      { id: '4', type: 'table-2', label: 'T-2', x: 320, y: 160, width: 60, height: 60, isReservable: true, isTempOccupiedEnabled: true },
      { id: '5', type: 'table-2', label: 'T-3', x: 440, y: 160, width: 60, height: 60, isReservable: true, isTempOccupiedEnabled: true },
      { id: '6', type: 'table-bar', label: '바석-A', x: 160, y: 280, width: 140, height: 40, isReservable: true, isTempOccupiedEnabled: false },
    ];
  });

  const [selectedId, setSelectedId] = useState<string | null>(null);

  const canvasRef = useRef<HTMLDivElement>(null);
  const dragInfo = useRef<{
    elementId: string;
    startOffsetX: number;
    startOffsetY: number;
  } | null>(null);

  const isInfoValid = info.name.trim().length > 0 && info.address.trim().length > 0;

  const handleInputChange = (field: keyof StoreInfo, value: string) => {
    setInfo((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddElement = (type: PlacedElement['type']) => {
    const sizes: Record<PlacedElement['type'], { w: number; h: number }> = {
      'table-2': { w: 60, h: 60 },
      'table-4': { w: 100, h: 60 },
      'table-bar': { w: 140, h: 40 },
      socket: { w: 50, h: 50 },
      counter: { w: 160, h: 50 },
      door: { w: 80, h: 30 },
      toilet: { w: 60, h: 50 },
    };

    const size = sizes[type];
    let label: string = type;
    if (type.startsWith('table-')) {
      const tableCount = placedElements.filter((e) => e.type.startsWith('table-')).length + 1;
      label = `T-${tableCount}`;
    } else if (type === 'socket') {
      const socketCount = placedElements.filter((e) => e.type === 'socket').length + 1;
      label = `C-${socketCount}`;
    } else if (type === 'counter') {
      label = '카운터';
    } else if (type === 'door') {
      label = '입구';
    } else if (type === 'toilet') {
      label = '화장실';
    }

    const newElement: PlacedElement = {
      id: Date.now().toString(),
      type,
      label,
      x: 100,
      y: 100,
      width: size.w,
      height: size.h,
      isReservable: type.startsWith('table-') || type === 'socket',
      isTempOccupiedEnabled: type.startsWith('table-'),
    };

    setPlacedElements((prev) => [...prev, newElement]);
    setSelectedId(newElement.id);
  };

  const handleRemoveElement = (id: string) => {
    setPlacedElements((prev) => prev.filter((e) => e.id !== id));
    if (selectedId === id) {
      setSelectedId(null);
    }
  };

  const handleUpdateElement = (id: string, updates: Partial<PlacedElement>) => {
    setPlacedElements((prev) =>
      prev.map((e) => (e.id === id ? { ...e, ...updates } : e))
    );
  };

  const handleMouseDown = (e: MouseEvent, id: string) => {
    if (step !== 2) return;
    e.stopPropagation();
    setSelectedId(id);

    const canvas = canvasRef.current;
    if (!canvas) return;

    const element = placedElements.find((el) => el.id === id);
    if (!element) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = e.clientX - rect.left;
    const clientY = e.clientY - rect.top;

    dragInfo.current = {
      elementId: id,
      startOffsetX: clientX - element.x,
      startOffsetY: clientY - element.y,
    };
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!dragInfo.current || !canvasRef.current) return;
    e.preventDefault();

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const clientX = e.clientX - rect.left;
    const clientY = e.clientY - rect.top;

    const element = placedElements.find((el) => el.id === dragInfo.current?.elementId);
    if (!element) return;

    let rawX = clientX - dragInfo.current.startOffsetX;
    let rawY = clientY - dragInfo.current.startOffsetY;

    const snappedX = Math.round(rawX / 20) * 20;
    const snappedY = Math.round(rawY / 20) * 20;

    const maxX = rect.width - element.width;
    const maxY = rect.height - element.height;
    const finalX = Math.max(0, Math.min(snappedX, maxX));
    const finalY = Math.max(0, Math.min(snappedY, maxY));

    handleUpdateElement(dragInfo.current.elementId, { x: finalX, y: finalY });
  };

  const handleMouseUp = () => {
    dragInfo.current = null;
  };

  const selectedElement = placedElements.find((el) => el.id === selectedId);

  const handleSaveStore = async (overrideOwnerId?: number) => {
    try {
      localStorage.setItem('zariyo_store_layout', JSON.stringify(placedElements));
      
      let effectiveOwnerId = overrideOwnerId || 1;
      const savedUserStr = localStorage.getItem('zariyo_user');
      if (savedUserStr) {
        try {
          const user = JSON.parse(savedUserStr);
          if (user && user.id) effectiveOwnerId = user.id;
        } catch (e) {}
      }

      const res = await storeApi.saveStore({
        ...info,
        ownerId: effectiveOwnerId,
        elements: placedElements,
      });
      return { success: true, store: res };
    } catch (err: any) {
      console.error('Failed to save store info to backend API', err);
      // LocalStorage fallback saved
      return { success: true, isLocalFallback: true };
    }
  };

  return {
    step,
    setStep,
    info,
    isInfoValid,
    handleInputChange,
    placedElements,
    selectedId,
    setSelectedId,
    selectedElement,
    canvasRef,
    handleAddElement,
    handleRemoveElement,
    handleUpdateElement,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleSaveStore,
  };
}
