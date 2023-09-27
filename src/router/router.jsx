import { createBrowserRouter } from 'react-router-dom';

export const Router = createBrowserRouter([
  {
    path: '/',
    async lazy() {
      let { RootLayout } = await import('../layouts/root-layout');
      return { Component: RootLayout };
    },
    children: [
      {
        path: '/home',
        async lazy() {
          let { AuthLayout } = await import('../layouts/auth-layout');
          return { Component: AuthLayout };
        },
        children: [
          {
            path: '',
            async lazy() {
              let { HomePage } = await import('../pages/home-page');
              return { Component: HomePage };
            },
          },
        ],
      },
      {
        async lazy() {
          let { UnauthLayout } = await import('../layouts/unauth-layout');
          return { Component: UnauthLayout };
        },
        path: '/',
        children: [
          {
            path: '/',
            async lazy() {
              let { Registration } = await import('../pages/registration');
              return { Component: Registration };
            },
          },
        ],
      },
      {
        path: '/login',
        async lazy() {
          let { Login } = await import('../pages/login');
          return { Component: Login };
        },
      },
      {
        path: 'error',
        async lazy() {
          let { ErrorPage } = await import('../pages/error-page');
          return { Component: ErrorPage };
        },
      },
    ],
  },
]);
