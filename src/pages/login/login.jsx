import { useNavigate } from 'react-router-dom';

import { Header } from '../../components/header';
import { LoginForm } from '../../widgets/login-form';

export function Login() {
  const navigate = useNavigate();
  const redirect = () => {
    navigate('./');
  };

  return (
    <>
      <Header btnText="Register" onClick={redirect} />
      <LoginForm />
    </>
  );
}
