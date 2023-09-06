import { Btn } from '../../components/button';
import { Title } from '../../components/title';
import error from './errorPage.module.scss';

export function ErrorPage() {
  return (
    <div className={error.errorPageCont}>
      <Title
        size="h4"
        color="secondary"
        name="Sorry, an unexpected error has occurred"
      />
      <img src="/src/pictures/logo.png" className={error.errorImg} />
      <Btn name="Go to home page" size="large" />
    </div>
  );
}
