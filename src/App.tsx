import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Header } from './components/Header';
import { HomePage } from './pages/HomePage';
import { PersonalPage } from './pages/PersonalPage';
import { LoginPage } from './pages/LoginPage';
import { MyPage } from './pages/MyPage';
import { SignUpPage } from './pages/SignUpPage';

const queryClient = new QueryClient();

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Header />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/personal' element={<PersonalPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/signup' element={<SignUpPage />} />
          <Route path='/mypage' element={<MyPage />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}
