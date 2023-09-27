import { TaskBoard } from '../../components/task-board';
import { useLogout } from '../../utils/logout';
import { Header } from '../../widgets/header';

export function HomePage() {
  const logout = useLogout();

  return (
    <>
      <Header btnText="Logout" onClick={logout} />
      <TaskBoard />
    </>
  );
}
