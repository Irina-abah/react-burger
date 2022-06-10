import { useState, useCallback, useMemo, FunctionComponent } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useHistory } from 'react-router-dom';
import { useDrop, DropTargetMonitor } from 'react-dnd';
import { makeOrder } from '../../services/actions/order';
import { ADD_BUN, RESET_CONSTRUSTOR, ADD_INNER_ITEM, UPDATE_CONSTRUCTOR_LIST } from '../../services/actions/ingredients';
import { TExtendedItem } from '../../utils/types';
import { useSelector, useDispatch } from '../../utils/hooks';
import { ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import constructorStyles from './burder-constructor.module.css';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import ConstructorItem from '../constructor-item/constructor-item';

const BurgerConstructor: FunctionComponent = () => {

  const dispatch = useDispatch();
  const history = useHistory();
  const { innerItems } = useSelector((store) => store.ingredients.constructor);
  const { selectedBun } = useSelector((store: any) => store.ingredients.constructor);
  const auth = useSelector((store) => store.login.isAuthenticated);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const allBurgerItems = useMemo(() => {
      return selectedBun ? innerItems.concat([selectedBun, selectedBun]) : innerItems;
  }, [innerItems, selectedBun]);

  const [{ isHover }, dropTargerRef] = useDrop({
    accept: 'ingredient',
    collect: (monitor: DropTargetMonitor) => ({
      isHover: monitor.isOver()
    }),
    drop(item: TExtendedItem) {
      if (item.type === "bun") {
        dispatch({
          type: ADD_BUN,
          bun: item
        })
      } else {
        dispatch({
          type: ADD_INNER_ITEM,
          item: {
            ...item,
            dragId: uuidv4()
          }
        })
      }
    }
  });

  const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
    const dragCard = innerItems[dragIndex];
    const newCards = [...innerItems]
    newCards.splice(dragIndex, 1)
    newCards.splice(hoverIndex, 0, dragCard)
    dispatch({
      type: UPDATE_CONSTRUCTOR_LIST,
      updatedItems: newCards,
    })
  }, [innerItems, dispatch]);

  const totalPrice = allBurgerItems.reduce(
    function (sum: number, item: TExtendedItem) {
        return sum + item.price
    }, 0
  )
  
  function checkPrice(price: number) {
    if (isNaN(price)) {
      return 0
    } else {
      return price
    }
  }

  function handleCloseModal() {
    setIsOpen(!isOpen)
    dispatch({
      type: RESET_CONSTRUSTOR 
    })
  }

  function handleSubmit() {
    const items = allBurgerItems.map((item: TExtendedItem) => item._id);
    if (auth) {
      dispatch(makeOrder(items))
      setIsOpen(!isOpen)
    } else {
      history.replace({ pathname: "/login" });
    }
      
  }

  return (
    <>
    <div ref={dropTargerRef} className={`${constructorStyles.container} mt-15 pl-4 ${isHover ? constructorStyles.hover : ''}`}>
      <div className={`${constructorStyles.wrapper} mb-10`}>
        <div className={`pr-4`}>
          {selectedBun.type &&(<ConstructorElement
            type="top"
            isLocked={true}
            text={`${selectedBun.name} (верх)`}
            price={selectedBun.price}
            thumbnail={selectedBun.image}
          />)}
        </div>
        <div className={`${constructorStyles.food_list} pr-2`}>
          {innerItems.map((item: TExtendedItem, i: any) => (
            <ConstructorItem key={item.dragId} index={i} item={item} moveCard={moveCard}/>
          ))}
        </div>
        <div className={`pr-4`}>
          {selectedBun.type && (<ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${selectedBun.name} (низ)`}
            price={selectedBun.price}
            thumbnail={selectedBun.image}
          />)}
        </div> 
      </div>
      <div className={`${constructorStyles.order} pr-4`}>
        <span className={`${constructorStyles.price} text text_type_digits-medium mr-10`}>{checkPrice(totalPrice)} 
          <CurrencyIcon type="primary" />
        </span>
        {selectedBun.type && <Button type="primary" size="large" onClick={handleSubmit}>
          Оформить заказ 
        </Button>} 
      </div>
    </div>
    {isOpen && auth && (<Modal 
      title=""
      onClose={handleCloseModal}>
        <OrderDetails />
    </Modal>)}
    </>
  )
}

export default BurgerConstructor;