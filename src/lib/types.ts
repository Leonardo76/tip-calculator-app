import type {ZodCoercedNumber} from "zod";
import type {ActionCreatorWithPayload} from "@reduxjs/toolkit";

//region Input control options
export const ICON_TYPE_BILL = 'BILL';
export const ICON_TYPE_PEOPLE = 'PEOPLE';
export type IconTypeBillOrPeople = typeof ICON_TYPE_BILL | typeof ICON_TYPE_PEOPLE

export type OptionsType = {
   iconType: IconTypeBillOrPeople,
   labelText: string,
   validationSchema: ZodCoercedNumber<number>
   storeAction: ActionCreatorWithPayload<number>
}
//endregion

//region Tip button options
export const BUTTON_TYPE_NORMAL = 'NORMAL';
export const BUTTON_TYPE_CUSTOM = 'CUSTOM';
export type TipButtonTypeNormalOrCustom= typeof BUTTON_TYPE_NORMAL | typeof BUTTON_TYPE_CUSTOM;
//endregion