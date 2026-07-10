import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Tailwind CSS 클래스들을 안전하게 병합해주는 유틸리티 함수입니다.
 * clsx로 조건부 클래스를 결합하고, tailwind-merge로 충돌하는 스타일(예: p-4 p-2)을 해결합니다.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
