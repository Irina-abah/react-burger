import React from 'react';
import Header from "../app-header/app-header";
import Main from "../main/main";
import allIngredientsApi from "../../utils/main-api";
import { useDispatch } from 'react-redux';
import { getIngredients } from '../../services/actions/ingredients';
// import { BurgerContext } from "../../contexts/burger-context"; 

function App() {

  const [isFailed, setIsFailed] = React.useState(false);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getIngredients())
  }, [dispatch])

  return (
    <div>
      <Header />
      {/* <BurgerContext.Provider 
        value={foodData}
      > */}
        <Main
          isFailed={isFailed}
          setIsFailed={setIsFailed}
        />
      {/* </BurgerContext.Provider> */}
    </div>
  )
}

export default App;
