import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import React from 'react';
import ReactDOM from 'react-dom/client';

// import { createBrowserRouter } from 'react-router-dom';
import { App } from './App.jsx';
// import { Registration } from './pages/registration/registration.jsx';

// const router = createBrowserRouter([
//   {
//     path: '/registration',
//     element: <Registration />,
//     errorElement: <ErrorPage />
//   },
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
