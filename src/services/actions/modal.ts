import { TExtendedItem, TOrder } from "../../utils/types";

export const OPEN_MODAL: "OPEN_MODAL" = "OPEN_MODAL";
export const CLOSE_MODAL: "CLOSE_MODAL" = "CLOSE_MODAL";
export const OPEN_MODAL_ORDER: "OPEN_MODAL_ORDER" = "OPEN_MODAL_ORDER";

export interface IOpenModalAction {
  readonly type: typeof OPEN_MODAL;
  item: TExtendedItem
};
export interface ICloseModalAction {
  readonly type: typeof CLOSE_MODAL;
}

export interface IOpenModalOrderAction {
  readonly type: typeof OPEN_MODAL_ORDER;
  item: TOrder
};

export type TModalActions = 
  | IOpenModalAction
  | IOpenModalOrderAction
  | ICloseModalAction;