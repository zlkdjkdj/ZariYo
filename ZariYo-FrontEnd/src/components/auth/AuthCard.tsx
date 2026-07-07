import React from 'react';
import { LayoutGrid } from 'lucide-react';

interface AuthCardProps {
  title: string;
  description: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export function AuthCard({ title, description, children, footer }: AuthCardProps) {
  return (
    <div className="max-w-md w-full backdrop-blur-xl bg-[#f5f5f7]/60 dark:bg-[#1c1c1e]/40 border border-[#e5e5e7] dark:border-[#2c2c2e]/60 rounded-3xl p-8 md:p-10 shadow-[0_24px_50px_-12px_rgba(0,0,0,0.1)] dark:shadow-[0_24px_50px_-12px_rgba(0,0,0,0.7)] relative z-10 transition-all duration-300">
      {/* Logo and Greeting */}
      <div className="flex flex-col items-center mb-8 text-center">
        <div className="flex items-center gap-2 mb-3 bg-black/5 dark:bg-[#2c2c2e]/50 border border-[#e5e5e7] dark:border-[#3a3a3c] rounded-full p-2.5">
          <LayoutGrid className="w-5 h-5 text-[#3182f6]" />
        </div>
        <h2 className="text-xl md:text-2xl font-bold tracking-tight text-black dark:text-white mb-1.5">
          {title}
        </h2>
        <p className="text-xs text-[#86868b]">
          {description}
        </p>
      </div>

      {/* Main Content (Forms/Inputs) */}
      {children}

      {/* Footer Link Area */}
      {footer && (
        <div className="mt-8 pt-6 border-t border-[#e5e5e7] dark:border-[#2c2c2e]/40 text-center">
          {footer}
        </div>
      )}
    </div>
  );
}
