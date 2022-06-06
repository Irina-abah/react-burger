import { TItem } from "../../utils/types";

export const OPEN_MODAL: "OPEN_MODAL" = "OPEN_MODAL";
export const CLOSE_MODAL: "CLOSE_MODAL" = "CLOSE_MODAL";
export interface IOpenModalAction {
  readonly type: typeof OPEN_MODAL;
  item: TItem
};
export interface ICloseModalAction {
  readonly type: typeof CLOSE_MODAL;
  item: {};
}

export type TModalActions = 
  | IOpenModalAction
  | ICloseModalAction;