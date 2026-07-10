import { forwardRef } from 'react';
import type { InputHTMLAttributes } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label className="text-sm font-medium text-[#4e5968] dark:text-gray-300">
            {label}
          </label>
        )}
        <div className="relative">
          <input
            ref={ref}
            className={cn(
              "w-full px-4 py-3 bg-[#f9fafb] border border-gray-200 rounded-xl",
              "text-[#191f28] placeholder:text-gray-400 outline-none transition-all duration-200",
              "focus:border-[#3182f6] focus:bg-white focus:ring-4 focus:ring-[#3182f6]/10",
              "dark:bg-[#1a1b1e] dark:border-gray-800 dark:text-white dark:focus:bg-[#101012]",
              error && "border-red-500 focus:border-red-500 focus:ring-red-500/10 bg-red-50 dark:bg-red-500/5",
              className
            )}
            {...props}
          />
        </div>
        {error && (
          <motion.span 
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm text-red-500 font-medium pl-1"
          >
            {error}
          </motion.span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
