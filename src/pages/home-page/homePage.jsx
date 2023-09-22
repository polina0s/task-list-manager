import { Header } from '../../components/header';
import { useLogout } from '../../utils/logout';

export function HomePage() {
  const logout = useLogout();
  return <Header btnText="Logout" onClick={logout} />;
}
