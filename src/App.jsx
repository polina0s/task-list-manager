import './styles/main.scss';

// import { ThemeProvider } from '@mui/material/styles';
// import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  addCustomerAction,
  removeCustomerAction,
} from './store/user/customerReducer';
// import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// import { ErrorPage } from './pages/error-page';
// import { Registration } from './pages/registration';
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
  const dispatch = useDispatch();
  const cash = useSelector((state) => state.cash.cash);
  const customers = useSelector((state) => state.customers.customers);
  console.log(cash);

  const addCash = (cash) => {
    dispatch({ type: 'ADD_CASH', payload: cash });
  };
  const getCash = (cash) => {
    dispatch({ type: 'GET_CASH', payload: cash });
  };

  const addCustomer = (name) => {
    const customer = {
      name,
      id: Date.now(),
    };
    dispatch(addCustomerAction(customer));
  };
  const removeCustomer = (customer) => {
    dispatch(removeCustomerAction(customer.id));
  };

  return (
    <>
      <div style={{ display: 'flex' }}>
        <div>{cash}</div>
        <button onClick={() => addCash(+prompt())}>пополнить счет</button>
        <button onClick={() => getCash(+prompt())}>снять co счета</button>
        <button onClick={() => addCustomer(prompt())}>добавить клиента</button>
      </div>
      <div>
        {customers.length > 0 ? (
          <div>
            {customers.map((customer) => (
              <div onClick={() => removeCustomer(customer)}>
                {customer.name}
              </div>
            ))}
          </div>
        ) : (
          <div>Клиенты отсутствуют</div>
        )}
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
