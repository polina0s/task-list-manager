import { useDispatch, useSelector } from 'react-redux';

import { AuthForm } from '../../components/auth-form';
import { registerUser } from '../../store/user';

export function RegForm() {
  const user = useSelector((state) => state.user);
  console.log(user);
  const dispatch = useDispatch();

  const handleSubmit = (data) => {
    dispatch(registerUser(data));
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
