import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

import { login } from '../../store/user';
import { tokenService } from '../../utils/tokenService';

export function UnauthLayout() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const authToken = tokenService.getTokens().access;

  useEffect(() => {
    if (authToken) dispatch(login());
  }, [authToken, dispatch]);

  if (user.isLogged || authToken) return <Navigate to="/home" />;

  return <Outlet />;
}
