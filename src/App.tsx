import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Header } from './components/Header';
import { HomePage } from './pages/home/HomePage';
import { PersonalPage } from './pages/personal/PersonalPage';
import { MyPage } from './pages/my/MyPage';
import { LoginPage } from './pages/auth/LoginPage';
import { SignUpPage } from './pages/auth/SignUpPage';
import { TestPage } from './pages/test/TestPage';
import { AdminPage } from './pages/admin/AdminPage';

const queryClient = new QueryClient();

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Header />
        <Routes>
          <Route path='/' element={<HomePage />} />
          {/* Login Page */}
          <Route path='/login' element={<LoginPage />} />
          <Route path='/signup' element={<SignUpPage />} />
          {/* My Page */}
          <Route path='/mypage' element={<MyPage />} />
          {/* Personal Page */}
          <Route path='/personal' element={<PersonalPage />} />
          {/* Test Page */}
          <Route path='/test' element={<TestPage />} />
          <Route path='/admin' element={<AdminPage />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}
