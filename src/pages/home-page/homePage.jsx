import { Outlet } from 'react-router-dom';

import { useLogout } from '../../utils';
import { Header } from '../../widgets/header';
import { TaskBoard } from '../../widgets/task-board';

export function HomePage() {
  const logout = useLogout();

  return (
    <>
      <Header btnText="Logout" onClick={logout} />
      <TaskBoard />
      <Outlet />
    </>
  );
}
