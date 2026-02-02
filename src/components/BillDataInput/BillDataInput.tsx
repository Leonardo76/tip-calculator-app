import style from './BillDataInput.module.scss'
import TipButton from "../TipButton/TipButton.tsx";
import {Fragment} from "react";
import InputControl from "../InputControl/InputControl.tsx";
import {BUTTON_TYPE_CUSTOM, ICON_TYPE_BILL, ICON_TYPE_PEOPLE, type OptionsType} from "../../lib/types.ts";
import {setBill, setNumberOfPeople} from "../../stores/billSlice.ts";
import z from "zod";

export default function BillDataInput() {
   const buttonsText = [5, 10, 15, 25, 50];

   return (
      <section className={style['billGlobalContainer']} aria-label={'Bill'}>
         <h2 className={style['titleHidden']}>Data input</h2>
         <InputControl options={billOptions}/>

         <section className={style['tipContainer']} aria-label={'Tip choice section'}>
            <h3 className={style["selectTipText"]}>Select tip %</h3>
            <div className={style["tipOptionsContainer"]}>
               {buttonsText.map((buttonText, index) => (
                  <Fragment key={index + new Date().getTime()}>
                     <TipButton>{buttonText}</TipButton>
                  </Fragment>
               ))}
               <TipButton type={BUTTON_TYPE_CUSTOM}>Custom</TipButton>
            </div>
         </section>

         <InputControl options={peopleOptions}/>
      </section>
   )
}

//region Input options
//define the input type and validation
const billOptions: OptionsType = {
   iconType: ICON_TYPE_BILL,
   labelText: "Bill",
   validationSchema: z
      .coerce.number<number>("Input a number")
      .gt(0, "Can't be zero or less than 0"),
   storeAction: setBill //for setting the bill amount in RTK store
}

const peopleOptions: OptionsType = {
   iconType: ICON_TYPE_PEOPLE,
   labelText: "Number of People",
   validationSchema: z
      .coerce.number<number>("Input a number")
      .gt(0, "Can't be zero or less than 0")
      .int("Must be an integer"),
   storeAction: setNumberOfPeople //for setting the number of people in RTK store
}
//endregion