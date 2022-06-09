import { FunctionComponent } from 'react';
import summaryStyles from './feed-summary.module.css';
import { TOrders, TOrder } from '../../utils/types';

interface IOrdersSummary {
  allOrders: TOrders;
}

const FeedSummary: FunctionComponent<IOrdersSummary> = ({ allOrders }) => {

  const completedOrders = allOrders.orders.filter((item) => item.status === 'done');
  const progressOrders = allOrders.orders.filter((item) => item.status !== 'done');

  return (
    <div className={`${summaryStyles.container}`}>
      <div className={summaryStyles.status}>
        <div className={summaryStyles.status_column}>
          <p className={`${summaryStyles.subtitle} mb-4 text text_type_main-medium`}>
            Готовы:
          </p>
          <ul className={summaryStyles.list}>
            {completedOrders.map((item: TOrder) => (
              <li key={item._id}>
                <p className={`${summaryStyles.number} text text_type_digits-default`}>
                  {item.number}
                </p>
              </li>
            ))}
          </ul>
        </div>
        <div className={summaryStyles.status_column}>
        <p className={`${summaryStyles.subtitle} mb-4 text text_type_main-medium`}>
            В работе:
          </p>
          <ul className={summaryStyles.list}>
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
        <p className="text text_type_main-medium mt-15">Выполнено за все время:</p>
        <p className="text text_type_digits-large">{allOrders.total}</p>
      </div>
      <div className={summaryStyles.total}>
        <p className="text text_type_main-medium mt-15">Выполнено за сегодня:</p>
        <p className="text text_type_digits-large">{allOrders.totalToday}</p>
      </div>
    </div>
  )
};

export default FeedSummary;