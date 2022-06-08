import orderPageStyles from "./order-page.module.css";
import { useParams } from 'react-router-dom';
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from '../../utils/hooks';
import { TOrder, TExtendedItem } from "../../utils/types";
import { sayDate } from '../../utils/say-date';

function OrderPage() {

  const { orderId } = useParams<{orderId: string}>();
  const { orders } = useSelector((store) => store.ws.messages);
  const order = orders.find((c: TOrder) => c._id === orderId);
  const ingredients = useSelector((store) => store.ingredients.foodData);

  const orderIngredients = order?.ingredients.map((i: string) => {
    return ingredients.filter((item: TExtendedItem) => item._id === i);
  }).flat(1);
  console.log(orderIngredients)

  const totalPrice = orderIngredients?.reduce(
    function (sum: number, item: TExtendedItem) {
        return sum + item.price
    }, 0
  )

  const statusOrder = () => {
    if (order?.status === "done") {
      return "Выполнен"
    } else if (order?.status === "pending") {
      return "Выполняется"
    } else {
      return "Создан"
    }
  }

  return (
    <>
    {order ? (
      <section className={`${orderPageStyles.main} mr-2 mb-4 p-6`}>
        <p className={`text text_type_digits-default mr-2`}>#{order.number}</p>
        <div className={`mb-15`}>
          <h2 className={`${orderPageStyles.title} text text_type_main-medium mb-6`}>{order.name}</h2>
          <p>{statusOrder}</p>
        </div>
        <h2 className={`${orderPageStyles.title} text text_type_main-medium mb-6`}>Состав:</h2>
    
    <div className={orderPageStyles.ingredients}>
        {orderIngredients?.map((item: TExtendedItem, i) => (
          <>
          <div className={orderPageStyles.image} key={i}>
            <img
            alt="Фото"
            src={item.image_mobile}
            className={orderPageStyles.round}
            />
          </div>
          <h3>{item.name}</h3>
          <div className={orderPageStyles.prices}>
            <p className={orderPageStyles.quantity + " text text_type_digits-default"}>
              {orderIngredients &&
                `${item.count} x ${item.price}`}
            </p>
            <CurrencyIcon type="primary" />
          </div>
          </>
        ))}
      <div>
        <p className={`text text_type_main-default text_color_inactive`}>{sayDate(order.createdAt)}</p>
        <div className={`${orderPageStyles.total} mt-2 mb-2`}>
          <p className={`text text_type_digits-default mr-2`}>{totalPrice}</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
      
    </div>
    </section>
    ) : null}
    </> 
  )
}

export default OrderPage;