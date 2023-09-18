import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

import { login } from '../../store/user';
import { tokenService } from '../../utils/tokenService';

export function AuthLayout() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const isLogged = user.isLogged;
  const authToken = tokenService.getTokens().access;

  useEffect(() => {
    if (authToken) dispatch(login());
  }, [authToken, dispatch]);

  if (isLogged || authToken) return <Outlet />;

  return <Navigate to="/" />;
}
