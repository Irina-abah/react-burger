import { FunctionComponent } from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import notFoundStyles from './not-found.module.css'

const PageNotFound: FunctionComponent = () => {

  const history = useHistory();

  return (
    <section className={notFoundStyles.main}>
      <h2 className="text text_type_digits-large mt-10">404</h2>
      <p className="text text_type_main-large mt-10 mb-10">Страница не найдена</p>
      <Button type="primary" size="medium" onClick={() => history.goBack()}>Назад</Button>
    </section>
  )
};

export default PageNotFound;