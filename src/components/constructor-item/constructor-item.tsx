import { useRef, FunctionComponent, SyntheticEvent } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch } from 'react-redux';
import { useDrop, useDrag, DropTargetMonitor, XYCoord } from 'react-dnd';
import itemStyles from "./constructor-item.module.css";
import { REMOVE_INNER_ITEM } from "../../services/actions/constructor";
import { TExtendedItem } from '../../utils/types';

interface IConstructorItem {
  item: TExtendedItem,
  index: number,
  moveCard: (dragIndex: number, hoverIndex: number) => void
}

type dropItem = {
  index: number,
  id: string
}

const ConstructorItem: FunctionComponent<IConstructorItem> = ({ item, index, moveCard }) => {

  const ref = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();

  function deleteIngredient(item: TExtendedItem) {
    dispatch({
      type: REMOVE_INNER_ITEM,
      item: item,
      dragId: uuidv4()
    })
  }
  
  // const [{ handlerIdL }, drop] = useDrop({
    const [, drop] = useDrop({
    accept: 'component',
    // collect(monitor) {
    //   return {
    //     handlerId: monitor.getHandlerId()
    //   }
    // },
    hover(item: dropItem, monitor) {
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
      const hoverClientY = clientOffset && clientOffset.y - hoverBoundingRect.top;
      if(dragIndex && hoverClientY) {
        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
          return;
        } if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
          return;
        }
      }   
      moveCard(dragIndex, hoverIndex);
      item.index = hoverIndex;
    }
  })

  const [{ isDragging }, drag] = useDrag({
    type: 'component',
    item: () => ({ id: item._id, index }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;

  if (item.type !== 'bun') drag(drop(ref));
  const preventDefault = (e: SyntheticEvent) => e.preventDefault();

  return (
  // <div ref={ref} style={{ opacity }} onDrop={preventDefault} data-handler-id={handlerId} className={itemStyles.food_item}>
    <div ref={ref} style={{ opacity }} onDrop={preventDefault} className={itemStyles.food_item}> 
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

export default ConstructorItem;