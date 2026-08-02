import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { authStorage } from '../../utils/authStorage';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

export function ProtectedRoute({ children, requireAdmin = false }: ProtectedRouteProps) {
  const location = useLocation();
  const token = authStorage.getAccessToken();
  const user = authStorage.getUser<{ role?: string; name?: string }>();

  // 1. 비로그인 상태일 경우 로그인 페이지로 이동 (현재 시도하려던 경로 저장)
  if (!token || !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 2. 어드민 권한이 필요한 페이지인데 어드민이 아닌 경우
  if (requireAdmin && user.role !== 'ROLE_ADMIN') {
    alert('해당 메뉴는 시스템 어드민 전용 권한이 필요합니다.');
    return <Navigate to="/owner/stores" replace />;
  }

  return children;
}
