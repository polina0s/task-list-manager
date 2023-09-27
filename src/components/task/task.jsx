import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

import { Title } from '../title';
import task from './task.module.scss';

export function Task({ name }) {
  return (
    <div className={task.cont}>
      <div className={task.titleCont}>
        <AutoAwesomeIcon className={task.titleIcon} color="secondary" />
        <Title name={name} color="secondary" />
      </div>
    </div>
  );
}
