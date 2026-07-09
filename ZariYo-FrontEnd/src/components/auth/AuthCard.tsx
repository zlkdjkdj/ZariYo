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
    <div className="max-w-md w-full backdrop-blur-2xl bg-white dark:bg-neutral-900/60 border border-[#f2f4f6] dark:border-neutral-800 rounded-2xl p-8 md:p-10 shadow-[0_30px_60px_rgba(0,0,0,0.015)] dark:shadow-[0_30px_100px_rgba(0,0,0,0.8)] relative z-10 transition-all duration-300">
      
      {/* Logo and Greeting */}
      <div className="flex flex-col items-center mb-8 text-center select-none">
        <div className="flex items-center gap-2 mb-4 bg-gradient-to-tr from-[#3182f6] to-[#4894fe] p-2.5 rounded-xl shadow-[0_4px_15px_rgba(49,130,246,0.2)]">
          <LayoutGrid className="w-5 h-5 text-white" />
        </div>
        <h2 className="text-xl md:text-2xl font-black tracking-tight text-[#191f28] dark:text-white mb-2">
          {title}
        </h2>
        <p className="text-xs text-[#4e5968] dark:text-neutral-400 font-semibold">
          {description}
        </p>
      </div>

      {/* Main Content (Forms/Inputs) */}
      {children}

      {/* Footer Link Area */}
      {footer && (
        <div className="mt-8 pt-6 border-t border-[#f2f4f6] dark:border-white/5 text-center">
          {footer}
        </div>
      )}
    </div>
  );
}


