import { Link as RouterLink } from 'react-router-dom';

import { Button } from '../../components/button';
import { Title } from '../../components/title';
import logo from '../../pictures/logo.png';
import error from './errorPage.module.scss';

export function ErrorPage() {
  return (
    <div className={error.errorPageCont}>
      <Title size="h5" color="secondary" component="div">
        Sorry, an unexpected error has occurred
      </Title>
      <img src={logo} className={error.errorImg} />
      <Button component={RouterLink} to="/" size="large">
        Go to home page
      </Button>
    </div>
  );
}
