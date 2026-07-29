import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { LandingPage } from './pages/LandingPage';
import { GuidePage } from './pages/GuidePage';
import { StartPage } from './pages/StartPage';
import { LoginPage } from './pages/auth/LoginPage';
import { SignupPage } from './pages/auth/SignupPage';
import { KakaoCallbackPage } from './pages/auth/KakaoCallbackPage';
import { ReservePage } from './pages/customer/ReservePage';
import { StoreSelectPage } from './pages/owner/StoreSelectPage';
import { StoreBuilderPage } from './pages/owner/StoreBuilderPage';
import { DashboardPage } from './pages/owner/DashboardPage';
import { AnalyticsPage } from './pages/owner/AnalyticsPage';
import { MenuManagementPage } from './pages/owner/MenuManagementPage';
import { OrderHistoryPage } from './pages/owner/OrderHistoryPage';
import { AdminUserManagementPage } from './pages/admin/AdminUserManagementPage';

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          {/* 1. Public & Landing Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/guide" element={<GuidePage />} />
          <Route path="/about" element={<GuidePage />} />

          {/* 2. Authentication Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/auth/kakao/callback" element={<KakaoCallbackPage />} />

          {/* 3. Customer Reservation & Kiosk Routes */}
          <Route path="/reserve" element={<ReservePage />} />
          <Route path="/kiosk" element={<ReservePage />} />

          {/* 4. Store Owner Dashboard Routes */}
          <Route path="/owner" element={<StartPage />} />
          <Route path="/owner/stores" element={<StoreSelectPage />} />
          <Route path="/owner/store/new" element={<StoreBuilderPage />} />
          <Route path="/owner/store-builder" element={<StoreBuilderPage />} />
          <Route path="/owner/dashboard" element={<DashboardPage />} />
          <Route path="/owner/analytics" element={<AnalyticsPage />} />
          <Route path="/owner/menu-management" element={<MenuManagementPage />} />
          <Route path="/owner/order-history" element={<OrderHistoryPage />} />

          {/* 5. System Admin Routes */}
          <Route path="/admin" element={<AdminUserManagementPage />} />
          <Route path="/admin/users" element={<AdminUserManagementPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
