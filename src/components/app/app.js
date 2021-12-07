import React from 'react';
import Header from "../app-header/app-header";
import Main from "../main/main";
import allIngredientsApi from "../../utils/main-api";
import { BurgerContext } from "../../contexts/burger-context";

function App() {

  const [foodData, setFoodData] = React.useState([]);
  const [isFailed, setIsFailed] = React.useState(false);

  React.useEffect(() => {
    allIngredientsApi.getIngredients()
    .then((res) => {
      setIsFailed(false)
      setFoodData(res.data)
    })
    .catch((err) => {
      setIsFailed(true)
      console.log(err)
    })
  }, [])

  return (
    <div>
      <Header />
      <BurgerContext.Provider 
        value={foodData}
      >
        <Main 
          data={foodData}
          isFailed={isFailed}
          setIsFailed={setIsFailed}
        />
      </BurgerContext.Provider>
    </div>
  )
}

export default App;
