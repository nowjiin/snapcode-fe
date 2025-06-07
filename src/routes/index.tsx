import { createBrowserRouter } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { AdminPage } from '../pages/admin/AdminPage';
import { LoginPage } from '../pages/auth/LoginPage';
import { SignUpPage } from '../pages/auth/SignUpPage';
import { HomePage } from '../pages/home/HomePage';
import { MyPage } from '../pages/mypage/MyPage';
import { PersonalPage } from '../pages/personal/PersonalPage';
import { SubmissionCompletePage } from '../pages/personal/SubmissionCompletePage';
import { TestPage } from '../pages/test/TestPage';
import { CustomPage } from '../pages/custom/CustomPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Layout>
        <HomePage />
      </Layout>
    ),
  },
  {
    path: '/custom',
    element: (
      <Layout>
        <CustomPage />
      </Layout>
    ),
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/signup',
    element: <SignUpPage />,
  },
  {
    path: '/mypage',
    element: (
      <Layout>
        <MyPage />
      </Layout>
    ),
  },
  {
    path: '/mypage/submissions/:submissionId',
    element: (
      <Layout>
        <MyPage />
      </Layout>
    ),
  },
  {
    path: '/personal',
    element: (
      <Layout>
        <PersonalPage />
      </Layout>
    ),
  },
  {
    path: '/personal/complete',
    element: (
      <Layout>
        <SubmissionCompletePage />
      </Layout>
    ),
  },
  {
    path: '/test',
    element: (
      <Layout>
        <TestPage />
      </Layout>
    ),
  },
  {
    path: '/admin',
    element: (
      <Layout>
        <AdminPage />
      </Layout>
    ),
  },
]);
