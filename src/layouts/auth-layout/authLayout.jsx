import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

import { tokenService } from '../../utils/tokenService';

export function AuthLayout() {
  const user = useSelector((state) => state.user);
  const authToken = tokenService.getTokens().access;

  if (user.isLogged || authToken) return <Outlet />;

  return <Navigate to="/" />;
}
