import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';

import { login } from '../../store/user';
import { tokenService } from '../../utils/tokenService';

export function RootLayout() {
  const dispatch = useDispatch();
  const authToken = tokenService.getTokens().access;

  useEffect(() => {
    if (authToken) dispatch(login());
  }, [authToken, dispatch]);

  return <Outlet />;
}
