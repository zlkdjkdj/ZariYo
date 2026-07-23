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
          <label className="text-sm font-medium text-[var(--text-muted)]">
            {label}
          </label>
        )}
        <div className="relative">
          <input
            ref={ref}
            className={cn(
              "w-full px-6 py-4 bg-transparent border border-neutral-350 dark:border-neutral-700 rounded-none shadow-none", // input bordered (sharp square)
              "text-[var(--text-main)] placeholder:text-neutral-400 outline-none transition-all duration-200",
              "focus:border-black dark:focus:border-white focus:bg-neutral-50/5",
              error && "border-red-500 focus:border-red-500 bg-red-50/5 dark:bg-red-500/5",
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
