import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/auth/LoginPage';
import { SignupPage } from './pages/auth/SignupPage';
import { StartPage } from './pages/StartPage';
import { ReservePage } from './pages/MockPages';
import { StoreBuilderPage } from './pages/owner/StoreBuilderPage';
import { DashboardPage } from './pages/owner/DashboardPage';

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/owner" element={<StartPage />} />
          <Route path="/reserve" element={<ReservePage />} />
          <Route path="/owner/store/new" element={<StoreBuilderPage />} />
          <Route path="/owner/dashboard" element={<DashboardPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
