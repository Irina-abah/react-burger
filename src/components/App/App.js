import React from 'react';
import Header from "../app-header/app-header";
import Main from "../main/main";
import allIngredientsApi from "../../utils/main-api";

function App() {

  const [foodData, setFoodData] = React.useState([]);

  React.useEffect(() => {
    allIngredientsApi.getIngredients()
    .then((res) => {
      console.log(res)
      setFoodData(res.data)
    })
    .catch((err) => {
      console.log(err);
    })
  }, [])

  return (
    <div>
      <Header />
      <Main 
      data={foodData}
      />
    </div>
  )
}

export default App;
