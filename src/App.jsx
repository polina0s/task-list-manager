import './styles/main.scss';

// import { ThemeProvider } from '@mui/material/styles';
// import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

// import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// import { ErrorPage } from './pages/error-page';
// import { Registration } from './pages/registration';
import { decrementCreator, incrementCreator } from './store/user/countReducer';
// import { theme } from './styles/theme';

// const router = createBrowserRouter([
//   {
//     path: '/registration',
//     element: <Registration />,
//     errorElement: <ErrorPage />,
//   },
//   {
//     path: '/',
//     element: <Registration />,
//     errorElement: <ErrorPage />,
//   },
//   {
//     path: 'error',
//     element: <ErrorPage />,
//   },
// ]);

export function App() {
  const count = useSelector((state) => state.countReducer.count);
  const users = useSelector((state) => state.userReducer.users);
  const dispatch = useDispatch();

  return (
    <>
      <div>{count}</div>
      <div>
        <button onClick={() => dispatch(incrementCreator())}>INCREMENT</button>
        <button onClick={() => dispatch(decrementCreator())}>DECREMENT</button>
        <button>GET USERS</button>
      </div>
      <div>
        {users.map((user) => (
          <div key={user.name}>{user.name}</div>
        ))}
      </div>
    </>
  );
  // return (
  //   <React.StrictMode>
  //     <ThemeProvider theme={theme}>
  //       <RouterProvider router={router} />
  //     </ThemeProvider>
  //   </React.StrictMode>
  // );
}
