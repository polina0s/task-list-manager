import './styles/main.scss';

import { ThemeProvider } from '@mui/material/styles';
import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { UnauthLayout } from '.';
import { AuthLayout } from './layouts/auth-layout';
import { RootLayout } from './layouts/root-layout';
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
    path: '/',
    element: <RootLayout />,
    children: [
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
        element: <UnauthLayout />,
        path: '/',
        children: [
          {
            path: '',
            element: <Registration />,
          },
        ],
      },
      {
        path: 'error',
        element: <ErrorPage />,
      },
    ],
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
