import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { LandingPage } from './pages/LandingPage';
import { AboutGuidePage } from './pages/AboutGuidePage';
import { LoginPage } from './pages/auth/LoginPage';
import { SignupPage } from './pages/auth/SignupPage';
import { StartPage } from './pages/StartPage';
import { ReservePage } from './pages/customer/ReservePage';
import { StoreBuilderPage } from './pages/owner/StoreBuilderPage';
import { DashboardPage } from './pages/owner/DashboardPage';
import { AnalyticsPage } from './pages/owner/AnalyticsPage';
import { MenuManagementPage } from './pages/owner/MenuManagementPage';
import { OrderHistoryPage } from './pages/owner/OrderHistoryPage';

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/kiosk" element={<ReservePage />} />
          <Route path="/reserve" element={<ReservePage />} />
          <Route path="/guide" element={<AboutGuidePage />} />
          <Route path="/about" element={<AboutGuidePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/owner" element={<StartPage />} />
          <Route path="/owner/store/new" element={<StoreBuilderPage />} />
          <Route path="/owner/store-builder" element={<StoreBuilderPage />} />
          <Route path="/owner/dashboard" element={<DashboardPage />} />
          <Route path="/owner/analytics" element={<AnalyticsPage />} />
          <Route path="/owner/menu-management" element={<MenuManagementPage />} />
          <Route path="/owner/order-history" element={<OrderHistoryPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
