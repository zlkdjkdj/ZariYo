import { forwardRef } from 'react';
import type { HTMLAttributes } from 'react';
import { cn } from '../../utils/cn';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  glass?: boolean;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, glass = false, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-3xl border border-gray-100 overflow-hidden",
          glass
            ? "bg-white/80 backdrop-blur-xl dark:bg-[#101012]/80 dark:border-gray-800 shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
            : "bg-white dark:bg-[#101012] dark:border-gray-800 shadow-sm",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';
