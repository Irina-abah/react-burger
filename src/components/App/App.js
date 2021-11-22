import React from 'react';
import MainStyles from "./App.module.css";
import Header from "../AppHeader/AppHeader";
import Main from "../Main/Main";
import Modal from "../Modal/Modal";
import OrderDetails from "../OrderDetails/OrderDetails";
// import ingredients from "../../utils/data";
import allIngredientsApi from "../../utils/MainApi";

function App() {

  const [foodData, setFoodData] = React.useState([]);
  const [isOpen, setisOpen] = React.useState(false);

  function handleModal() {
    setisOpen(!isOpen)
  }

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
      <Main 
      data={foodData}
      onOrderDetails={handleModal}/>
      <Modal 
      title=''
      isOpen={isOpen} 
      onClose={handleModal}>
        <OrderDetails />
      </Modal>
    </div>
  )
}

export default App;
