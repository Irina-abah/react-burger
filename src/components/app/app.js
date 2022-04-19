import React from 'react';
import Header from "../app-header/app-header";
import Main from "../main/main";
import { useDispatch } from 'react-redux';
import { getIngredients } from '../../services/actions/ingredients';

function App() {

  const [isFailed, setIsFailed] = React.useState(false);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getIngredients())
  }, [dispatch])

  return (
    <div>
      <Header />
        <Main
          isFailed={isFailed}
          setIsFailed={setIsFailed}
        />
    </div>
  )
}

export default App;
