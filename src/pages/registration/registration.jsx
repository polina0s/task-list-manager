import { useNavigate } from 'react-router-dom';

import { Header } from '../../components/header';
import { RegForm } from '../../widgets/registration-form';

export function Registration() {
  const navigate = useNavigate();
  const redirect = () => {
    navigate('/login');
  };

  return (
    <>
      <Header btnText="Login" onClick={redirect} />
      <RegForm />
    </>
  );
}
