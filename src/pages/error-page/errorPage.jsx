import { Button } from '../../components/button';
import { Title } from '../../components/title';
import logo from '../../pictures/logo.png';
import error from './errorPage.module.scss';

export function ErrorPage() {
  return (
    <div className={error.errorPageCont}>
      <Title
        size="h4"
        color="secondary"
        name="Sorry, an unexpected error has occurred"
        component="div"
      />
      <img src={logo} className={error.errorImg} />
      <Button name="Go to home page" size="large" href="./" />
    </div>
  );
}
