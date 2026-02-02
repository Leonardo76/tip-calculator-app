import style from './TipCard.module.scss'
import classnames from 'classnames'
import {useAppDispatch, useAppSelector} from "../../stores/billHook.ts";
import {resetBill} from "../../stores/billSlice.ts";
import {writeNumberAsStringWithTwoDecimals} from "../../lib/utils.ts";

export default function TipCard() {
   const tip = useAppSelector(state => state.tip);
   const billValue = useAppSelector(state => state.billValue);
   const numberOfPeople = useAppSelector(state => state.numberOfPeople);
   const dispatch = useAppDispatch();

   const tipAmount = calculateTipAmountPerPerson(tip, billValue, numberOfPeople);
   const totalAmount = calculateTotalAmountPerPerson(tip, billValue, numberOfPeople);

   const nonEmpty = totalAmount !== "0.00";

   return (
      <section className={style["container"]} aria-label={"Tip Card"}>
         <h2 style={{display: 'none'}}>Expenses calculator</h2>
         <div className={style["tipAndTotalContainer"]}>
            <section className={style["tipAmountContainer"]}>
               <div className={style["tipAmountLabelContainer"]}>
                  <p className={style["tipAmountLabel"]}>Tip Amount</p>
                  <p className={style["tipAmountLabelPerPerson"]}>/ person</p>
               </div>
               <p className={style["tipAmount"]}>${tipAmount}</p>
            </section>

            <section className={style["totalAmountContainer"]}>
               <div className={style["totalAmountLabelContainer"]}>
                  <p className={style["totalAmountLabel"]}>Total</p>
                  <p className={style["totalAmountLabelPerPerson"]}>/ person</p>
               </div>
               <p className={style["totalAmount"]}>${totalAmount}</p>
            </section>
         </div>

         <button className={classnames(style["resetButton"], {[style["nonEmpty"]]: nonEmpty})}
         onClick={()=>dispatch(resetBill())}>
            Reset
         </button>
      </section>
   )
}

//region Utils
function calculateTipAmountPerPerson(tip: number, billValue: number, numberOfPeople: number) {
   if (numberOfPeople === 0 || tip === 0 || billValue === 0) {
      return "0.00";
   }

   const totalTip = billValue * tip / 100;
   const totalTipPerPerson = totalTip / numberOfPeople;

   return writeNumberAsStringWithTwoDecimals(totalTipPerPerson);
}

function calculateTotalAmountPerPerson(tip: number, billValue: number, numberOfPeople: number) {
   if (numberOfPeople === 0 || billValue === 0) {
      return "0.00";
   }

   const totalTip = billValue * tip / 100;
   const totalTipPerPerson = totalTip / numberOfPeople;
   const totalBillPerPerson = billValue / numberOfPeople;
   const totalPerPerson = totalBillPerPerson + totalTipPerPerson;

   return writeNumberAsStringWithTwoDecimals(totalPerPerson);
}
//endregion