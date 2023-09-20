import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { logout } from '../store/user/user.actions';
import { tokenService } from './tokenService';

export function useLogout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return function () {
    dispatch(logout());
    tokenService.removeTokens();
    navigate('/');
  };
}
