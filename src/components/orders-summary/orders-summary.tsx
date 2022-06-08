import { FunctionComponent } from 'react';
import summaryStyles from './orders-summary.module.css';
import { TOrders, TOrder } from '../../utils/types';

interface IOrdersSummary {
  allOrders: TOrders;
}

const OrdersSummary: FunctionComponent<IOrdersSummary> = ({allOrders}) => {

  const completedOrders = allOrders.orders.filter((item) => item.status === 'done');
  const progressOrders = allOrders.orders.filter((item) => item.status !== 'done');

  return (
    <div className={`${summaryStyles.container} mt-25 mb-4 pr-4`}>
      <div className={summaryStyles.status}>
        <div className={summaryStyles.complete}>
          <p className={`${summaryStyles.subtitle} mb-4 text text_type_main-medium`}>
            Готовы:
          </p>
          <ul className={summaryStyles.complete_list}>
            {completedOrders.map((item: TOrder, i) => (
              <li key={item._id}>
                <p className="text text_type_digits-default text_color_inactive">
                  {item.number}
                </p>
              </li>
            ))}
          </ul>
        </div>
        <div className={summaryStyles.progress}>
        <p className={`${summaryStyles.subtitle} mb-4 text text_type_main-medium`}>
            В работе:
          </p>
          <ul className={summaryStyles.complete_list}>
            {progressOrders.map((item: TOrder) => (
              <li key={item._id}>
                <p className="text text_type_digits-default">
                  {item.number}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className={summaryStyles.total}>
        <p className="text text_type_main-medium mt-15">
          Выполнено за все время:
        </p>
        <p className="text text_type_digits-large">{allOrders.total}</p>
      </div>
      <div className={summaryStyles.total}>
        <p className="text text_type_main-medium mt-15">Выполнено за сегодня:</p>
        <p className="text text_type_digits-large">{allOrders.totalToday}</p>
      </div>
    </div>
  )
};

export default OrdersSummary;