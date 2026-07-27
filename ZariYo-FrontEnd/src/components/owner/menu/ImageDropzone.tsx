import { useState, useRef } from 'react';
import type { DragEvent, ChangeEvent } from 'react';
import { UploadCloud, CheckCircle, RefreshCw } from 'lucide-react';

interface ImageDropzoneProps {
  value: string;
  onChange: (imageUrl: string) => void;
}

export function ImageDropzone({ value, onChange }: ImageDropzoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // 파일 인코딩 헬퍼 (File ➔ Data URL)
  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('이미지 파일(JPG, PNG, WEBP 등)만 업로드할 수 있습니다.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        onChange(e.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFile(e.target.files[0]);
    }
  };

  return (
    <div className="space-y-2 select-none">
      
      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />

      {/* Drag & Drop Target Area */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`relative border-2 border-dashed rounded-none p-4 text-center cursor-pointer transition-all duration-200 flex flex-col items-center justify-center gap-2 ${
          isDragging
            ? 'border-emerald-400 bg-emerald-500/10 scale-[1.01]'
            : value
            ? 'border-emerald-500/50 bg-[#111115] hover:border-emerald-400'
            : 'border-neutral-300 dark:border-white/20 bg-neutral-50 dark:bg-[#111115] hover:border-neutral-400 dark:hover:border-white/40'
        }`}
      >
        
        {value ? (
          <div className="w-full flex flex-col items-center gap-2">
            <div className="relative w-full h-32 overflow-hidden bg-black border border-white/10 group">
              <img src={value} alt="Preview" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-xs font-black text-white gap-1.5 backdrop-blur-xs">
                <RefreshCw className="w-4 h-4 text-emerald-400" />
                <span>새 이미지 드래그 또는 클릭하여 변경</span>
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-500 dark:text-emerald-400">
              <CheckCircle className="w-3.5 h-3.5" />
              <span>이미지 로드 완료 (클릭하여 파일 변경)</span>
            </div>
          </div>
        ) : (
          <>
            <div className="p-3 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 dark:text-emerald-400">
              <UploadCloud className="w-6 h-6 animate-bounce" />
            </div>
            <div>
              <p className="text-xs font-black text-neutral-800 dark:text-white">
                이미지 파일 드래그 앤 드롭 (Drag & Drop)
              </p>
              <p className="text-[10px] text-neutral-400 font-semibold mt-0.5">
                컴퓨터의 사진 파일을 끌어다 놓거나 <span className="text-emerald-500 dark:text-emerald-400 underline font-bold">클릭하여 파일 선택</span>
              </p>
            </div>
          </>
        )}

      </div>

    </div>
  );
}
