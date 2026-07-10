import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import type { HTMLMotionProps } from 'framer-motion';
import { cn } from '../../utils/cn';

export interface ButtonProps extends Omit<HTMLMotionProps<"button">, "ref"> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    
    const variants = {
      primary: "bg-[#3182f6] text-white hover:bg-blue-600 shadow-md hover:shadow-[#3182f6]/30",
      secondary: "bg-gray-100 text-[#191f28] hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700",
      outline: "border-2 border-gray-200 bg-transparent text-[#4e5968] hover:border-[#3182f6] hover:text-[#3182f6] dark:border-gray-700 dark:text-gray-300",
      danger: "bg-red-50 text-red-500 hover:bg-red-100 dark:bg-red-500/10 dark:hover:bg-red-500/20",
      ghost: "bg-transparent text-[#4e5968] hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
    };

    const sizes = {
      sm: "px-3 py-1.5 text-sm rounded-lg",
      md: "px-4 py-2 text-base rounded-xl",
      lg: "px-6 py-3 text-lg rounded-2xl"
    };

    return (
      <motion.button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/50 disabled:opacity-50 disabled:pointer-events-none",
          variants[variant],
          sizes[size],
          className
        )}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';
