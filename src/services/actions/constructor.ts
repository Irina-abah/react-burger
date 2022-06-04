import { TExtendedItem } from "../../utils/types";

export const ADD_BUN: "ADD_BUN" = "ADD_BUN";
export const ADD_INNER_ITEM: "ADD_INNER_ITEM" = "ADD_INNER_ITEM";
export const REMOVE_INNER_ITEM: "REMOVE_INNER_ITEM" = "REMOVE_INNER_ITEM";
export const UPDATE_CONSTRUCTOR_LIST: "UPDATE_CONSTRUCTOR_LIST" = "UPDATE_CONSTRUCTOR_LIST";
export const RESET_CONSTRUSTOR: "RESET_CONSTRUSTOR" = "RESET_CONSTRUSTOR";
export interface IAddBunAction {
  readonly type: typeof ADD_BUN;
  bun: TExtendedItem
};
export interface IAddInnerItemAction {
  readonly type: typeof ADD_INNER_ITEM;
  innerItems: Array<TExtendedItem>;
  item: TExtendedItem;
}
export interface IRemoveInnerItemAction {
  readonly type: typeof REMOVE_INNER_ITEM;
  innerItems: Array<TExtendedItem>;
  item: TExtendedItem;
}
export interface IUpdateListAction {
  readonly type: typeof UPDATE_CONSTRUCTOR_LIST;
  updatedItems: Array<TExtendedItem>;
}
export interface IResetListAction {
  readonly type: typeof RESET_CONSTRUSTOR;
  innerItems: Array<TExtendedItem>[];
}

export type TConstructorActions = 
  | IAddBunAction
  | IAddInnerItemAction
  | IRemoveInnerItemAction
  | IUpdateListAction 
  | IResetListAction;