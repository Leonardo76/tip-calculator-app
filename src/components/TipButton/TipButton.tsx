import classnames from 'classnames'
import style from './TipButton.module.scss'
import {type ReactNode, useEffect, useEffectEvent, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../stores/billHook.ts";
import {setTip} from "../../stores/billSlice.ts";
import {BUTTON_TYPE_CUSTOM, BUTTON_TYPE_NORMAL, type TipButtonTypeNormalOrCustom} from "../../lib/types.ts";

type TipButtonProps = {
   type?: TipButtonTypeNormalOrCustom
   children?: ReactNode,
}

export default function TipButton({type = BUTTON_TYPE_NORMAL, children}: TipButtonProps) {
   const [selected, setSelected] = useState(false);

   const dispatch = useAppDispatch();
   const currentTip = useAppSelector(state => state.tip);

   const custom = (type === BUTTON_TYPE_CUSTOM);
   const isNumber = (typeof children === "number");// is not Custom button
   const tipValue = isNumber ? children : 0;

   //region useEffect -> Take out selected design if not selected tip
   const takeOutSelected = useEffectEvent(() => {
      setSelected(false)
   })

   useEffect(() => {
      // if is not the selected tip button, take out selected design
      if (currentTip !== tipValue) {
         takeOutSelected();
      }
   }, [currentTip, tipValue]);
   //endregion

   const handleClick = () => {
      if (isNumber) {
         setSelected(true);
         dispatch(setTip(tipValue));
      }
   }

   const handleClickCustom = () => {
      alert("Implement custom case");
   }

   return (
      <>
         <button className={
            classnames(
               style['tipButton'], //normal
               {[style['selected']]: selected}, //selected
               {[style['custom']]: custom && !selected}, //custom
            )
         }
                 onClick={isNumber ? handleClick : handleClickCustom}
                 aria-label={`Select ${children} percent tip`}
         >
            {isNumber ? `${children}%` : children}
         </button>

      </>
   )
}

