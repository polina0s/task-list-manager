import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { AuthForm } from '../../components/auth-form';
import { loginUser } from '../../store/user';

export function LoginForm() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (data) => {
    dispatch(loginUser(data))
      .unwrap()
      .then(() => navigate('/home'));
  };

  const redirect = () => navigate('/');

  return (
    <AuthForm
      isLoading={user.isLoading}
      onSubmit={handleSubmit}
      header="Login"
      btnText="Login"
      underBthText="register"
      onClick={redirect}
    />
  );
}
