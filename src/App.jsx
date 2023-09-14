import './styles/main.scss';

import { ThemeProvider } from '@mui/material/styles';
import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { ErrorPage } from './pages/error-page';
import { Registration } from './pages/registration';
import { theme } from './styles/theme';

const router = createBrowserRouter([
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
