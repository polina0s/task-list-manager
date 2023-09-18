import './styles/main.scss';

import { Home } from '@mui/icons-material';
import { ThemeProvider } from '@mui/material/styles';
import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { AuthLayout } from './components/auth-layout/authLayout';
import { ErrorPage } from './pages/error-page';
import { Registration } from './pages/registration';
import { theme } from './styles/theme';

function HomePage() {
  return (
    <div
      style={{ backgroundColor: 'black', width: '100px', height: '100px' }}
    ></div>
  );
}

const router = createBrowserRouter([
  {
    path: '/home',
    element: <AuthLayout />,
    children: [
      {
        path: '',
        element: <HomePage />,
      },
    ],
  },
  {
    path: '/registration',
    element: <Registration />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/',
    element: <Registration />,
    errorElement: <ErrorPage />,
  },
  {
    path: 'error',
    element: <ErrorPage />,
  },
]);

export function App() {
  return (
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </React.StrictMode>
  );
}
