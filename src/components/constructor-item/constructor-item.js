import { useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch } from 'react-redux';
import { useDrop, useDrag } from 'react-dnd';
import itemStyles from "./constructor-item.module.css";
import { REMOVE_INNER_ITEM } from "../../services/actions/constructor";
import PropTypes from 'prop-types';
import ingredientType from '../../utils/types';
function ConstructorItem({item, index, moveCard}) {

  const ref = useRef(null);
  const dispatch = useDispatch();

  function deleteIngredient(item) {
    dispatch({
      type: REMOVE_INNER_ITEM,
      item: item,
      dragId: uuidv4()
    })
  }
  
  const [{ handlerId }, drop] = useDrop({
    accept: 'component',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId()
      }
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      } if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      moveCard(dragIndex, hoverIndex);
      item.index = hoverIndex;
    }
  })

  const [{ isDragging }, drag] = useDrag({
    type: 'component',
    item: () => ({ id: item.id, index }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;

  if (item.type !== 'bun') drag(drop(ref));
  const preventDefault = (e) => e.preventDefault();

  return (
  <div ref={ref} style={{ opacity }} onDrop={preventDefault} data-handler-id={handlerId} moveCard={moveCard} className={itemStyles.food_item}>
      <DragIcon type="primary" />
      <ConstructorElement
        text={item.name}
        price={item.price}
        thumbnail={item.image}
        handleClose={() => deleteIngredient(item)}
      />
    </div>
  )
}

ConstructorItem.propTypes = {
  item: ingredientType.isRequired,
  index: PropTypes.number,
  moveCard: PropTypes.func.isRequired,
};

export default ConstructorItem;