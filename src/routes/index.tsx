import { createBrowserRouter } from 'react-router-dom';
import { AdminPage } from '../pages/admin/AdminPage';
import { LoginPage } from '../pages/auth/LoginPage';
import { SignUpPage } from '../pages/auth/SignUpPage';
import { HomePage } from '../pages/home/HomePage';
import { PersonalPage } from '../pages/personal/PersonalPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <SignUpPage />,
  },
  {
    path: '/admin',
    element: <AdminPage />,
  },
  {
    path: '/personal',
    element: <PersonalPage />,
  },
]);
