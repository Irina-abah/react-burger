import doneIcon from "../../images/done-icon.gif";
import orderStyles from "./OrderDetails.module.css";

function OrderDetails() {
  return (
    <>
      <span className={`${orderStyles.orderNumber} text text_type_digits-large`}>034536
        <p className={`${orderStyles.title} text text_type_main-medium mt-8`}>идентификатор заказа</p>
      </span>
      <img className={`mt-15 mb-15`} src={doneIcon} alt="Done" />
      <p className={`text text_type_main-default mb-2`}>Ваш заказ начали готовить</p>
      <p className={`${orderStyles.status} text text_type_main-default text_color_inactive mb-15`}>Дождитесь готовности на орбитальной станции</p>
    </>
  )
}

export default OrderDetails;