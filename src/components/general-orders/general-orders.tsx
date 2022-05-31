import { FunctionComponent } from 'react';
import ordersStyles from './general-orders.module.css';

const GeneralOrders: FunctionComponent = () => {
  return (
    <section className={`${ordersStyles.orders} pl-5 pr-5 pb-10 pt-10`}>
      <h1 className={`text text_type_main-large mb-5`}>Лента заказов</h1> 
      <div className={`mr-15`}>
      </div>
    </section>
  )
}

export default GeneralOrders;