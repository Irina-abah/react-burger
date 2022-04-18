import React from "react";
import doneIcon from "../../images/done-icon.gif";
import orderStyles from "./order-details.module.css";
import { LOAD_ERROR } from "../../utils/constants";
import PropTypes from "prop-types";
import { useSelector } from 'react-redux';

function OrderDetails({orderFailed}) {

  const number = useSelector((store) => store.order.number);

  return (
    <>
      {orderFailed ? <p className={`${orderStyles.error} text text_type_main-medium pt-15`}>{LOAD_ERROR}</p> : (
      <>
        <span className={`${orderStyles.orderNumber} text text_type_digits-large`}>{number}
          <p className={`${orderStyles.title} text text_type_main-medium mt-8`}>идентификатор заказа</p>
        </span>
        <img className={`mt-15 mb-15`} src={doneIcon} alt="Done" />
        <p className={`text text_type_main-default mb-2`}>Ваш заказ начали готовить</p>
        <p className={`${orderStyles.status} text text_type_main-default text_color_inactive mb-15`}>Дождитесь готовности на орбитальной станции</p>
      </>)} 
    </>
  )
}

OrderDetails.propTypes = {
  orderFailed: PropTypes.bool.isRequired
}

export default OrderDetails;