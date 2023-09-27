import { createBrowserRouter } from 'react-router-dom';

import { AuthLayout } from '../layouts/auth-layout';
import { RootLayout } from '../layouts/root-layout';
import { UnauthLayout } from '../layouts/unauth-layout';
import { ErrorPage } from '../pages/error-page';
import { HomePage } from '../pages/home-page';
import { Login } from '../pages/login/login';
import { Registration } from '../pages/registration';

export const Router = createBrowserRouter([
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
            path: '/',
            element: <Registration />,
          },
        ],
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: 'error',
        element: <ErrorPage />,
      },
    ],
  },
]);
