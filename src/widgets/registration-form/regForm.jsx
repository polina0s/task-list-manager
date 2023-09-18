import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { AuthForm } from '../../components/auth-form';
import { registerUser } from '../../store/user';

export function RegForm() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (data) => {
    dispatch(registerUser(data))
      .unwrap()
      .then(() => navigate('/home'));
  };

  return (
    <AuthForm
      isLoading={user.isLoading}
      header="Registration"
      btnText="Register"
      onSubmit={handleSubmit}
    />
  );
}
