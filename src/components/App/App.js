import React from 'react';
import MainStyles from "./App.module.css";
import Header from "../AppHeader/AppHeader";
import Main from "../Main/Main";
// import ingredients from "../../utils/data";
import allIngredientsApi from "../../utils/MainApi";

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
    <div className={MainStyles.App}>
      <Header />
      <Main data={foodData}/>
    </div>
  )
}

export default App;
