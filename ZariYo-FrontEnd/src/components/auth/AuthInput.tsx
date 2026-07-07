import React from 'react';
import { AlertCircle } from 'lucide-react';

interface AuthInputProps {
  label: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: () => void;
  error?: string;
  icon: React.ComponentType<{ className?: string }>;
  rightElement?: React.ReactNode;
}

export function AuthInput({
  label,
  type,
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  icon: Icon,
  rightElement,
}: AuthInputProps) {
  return (
    <div className="space-y-1.5 w-full">
      <div className="flex justify-between items-center px-1">
        <label className="text-[11px] font-semibold text-[#86868b] tracking-wider uppercase pl-1">
          {label}
        </label>
        {rightElement}
      </div>
      <div className="relative">
        <Icon className="absolute left-4 top-3.5 w-4 h-4 text-[#86868b]" />
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className={`w-full bg-white dark:bg-[#1c1c1e]/80 border ${
            error
              ? 'border-red-500/80 focus:border-red-500 focus:ring-red-500/30'
              : 'border-[#e5e5e7] dark:border-[#2c2c2e] focus:border-[#3182f6] focus:ring-[#3182f6]/30'
          } rounded-xl pl-11 pr-4 py-3.5 text-sm text-black dark:text-white placeholder-[#86868b] dark:placeholder-[#48484a] focus:outline-none focus:ring-1 transition-all duration-200`}
        />
      </div>
      {error && (
        <div className="flex items-center gap-1 text-[11px] text-red-400 pl-1 pt-0.5 animate-fadeIn">
          <AlertCircle className="w-3.5 h-3.5" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}
