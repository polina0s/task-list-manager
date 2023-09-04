import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './styles/main.scss';

import React from 'react';
import ReactDOM from 'react-dom/client';

import { App } from './App.jsx';

// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <Catalog />,
//     errorElement: <ErrorPage />,
//   },
// {
//   path: 'cat/:catId',
//   element: <CatPage />,
//   errorElement: <ErrorPage />,
// },

// {
//   path: 'error',
//   element: <ErrorPage />,
// },
// ]);

// export function App() {
//   return (
//     <React.StrictMode>
//       <RouterProvider router={router} />
//     </React.StrictMode>
//   );
// }

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
