import { 
  TypedUseSelectorHook, 
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import type { TRootState, TAppDispatch, TAppThunk } from './types';

export const useSelector: TypedUseSelectorHook<TRootState> = selectorHook;
export const useDispatch = () => dispatchHook<TAppDispatch | TAppThunk>()