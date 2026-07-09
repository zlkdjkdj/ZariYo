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
    <div className="space-y-2 w-full font-sans">
      <div className="flex justify-between items-center px-1">
        <label className="text-[10px] font-extrabold text-[#4e5968] dark:text-neutral-400 tracking-wider uppercase pl-0.5">
          {label}
        </label>
        {rightElement}
      </div>
      <div className="relative select-none">
        <Icon className="absolute left-4 top-4.5 w-4 h-4 text-[#3182f6]" />
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className={`w-full bg-white dark:bg-black/40 border ${
            error
              ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
              : 'border-neutral-200 dark:border-white/10 focus:border-[#3182f6] dark:focus:border-[#3182f6] focus:ring-[#3182f6]/20 dark:focus:ring-[#3182f6]/20'
          } rounded-xl pl-11 pr-4 py-4 text-xs text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-500 focus:outline-none focus:ring-4 transition-all duration-200`}
        />
      </div>
      {error && (
        <div className="flex items-center gap-1.5 text-[11px] text-red-500 pl-0.5 pt-0.5 animate-fadeIn">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span className="font-semibold">{error}</span>
        </div>
      )}
    </div>
  );
}


