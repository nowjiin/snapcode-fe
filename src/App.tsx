import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Header } from './components/Header';
import { HomePage } from './pages/HomePage';
import { PersonalPage } from './pages/PersonalPage';
import { LoginPage } from './pages/LoginPage';
import { MyPage } from './pages/MyPage';
import { SignUpPage } from './pages/SignUpPage';
import { TestPage } from './pages/TestPage';
import { AdminPage } from './pages/AdminPage';

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
          <Route path='/my' element={<MyPage />} />
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
