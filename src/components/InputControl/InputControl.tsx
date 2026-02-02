import * as React from "react";
import {useEffect, useEffectEvent, useState} from "react";
import classnames from "classnames";
import {z} from "zod";
import style from './InputControl.module.scss'
import {useAppDispatch, useAppSelector} from "../../stores/billHook.ts";
import {ICON_TYPE_BILL, ICON_TYPE_PEOPLE, type IconTypeBillOrPeople, type OptionsType} from "../../lib/types.ts";
import IconControl from "../IconControl/IconControl.tsx";

type InputBillProps = {
   options: OptionsType
};

export default function InputControl({options}: InputBillProps) {
   const [inputText, setInputText] = useState('');
   const [errorMessage, setErrorMessage] = useState('');

   const reset = useAppSelector(state => state.reset);
   const dispatch = useAppDispatch();

   const {iconType, labelText, validationSchema, storeAction} = options;

   //region Reset input
   const resetInput = useEffectEvent(() => {
      setInputText('');
      setErrorMessage('');
   })

   useEffect(() => {
      if (reset) {
         resetInput();
      }
   }, [reset]);
   //endregion

   //handle Blur and validation
   const handleBlur =
      (event: React.FocusEvent<HTMLInputElement>) => {
         const value = event.currentTarget.value;

         if (value.length === 0) {
            //nothing typed in the input
            dispatch(storeAction(0));
            setErrorMessage('');
            return;
         }

         const validateInput = validationSchema.safeParse(value);
         if (!validateInput.success) {
            //validation failed
            dispatch(storeAction(0));
            setErrorMessage(z.treeifyError(validateInput.error).errors[0]);
            return;
         }

         //validation OK
         setErrorMessage('')
         dispatch(storeAction(validateInput.data));
      }

   function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
      const value = event.target.value;
      setInputText(value);
   }

   return (
      <div className={style['inputContainerGlobal']}>
         <div className={style['textContainer']}>
            <label htmlFor="input" className={style["labelText"]}>{labelText}</label>
            <span className={style['errorMessage']}>{errorMessage}</span>
         </div>

         <div className={classnames(style['inputContainer'])}>
            {getIconToShow(iconType)}
            <input type={"text"}
                   id="input"
                   className={
                      classnames(
                         style['input'],
                         {[style['errorBorder']]: errorMessage !== ''}
                      )
                   }
                   placeholder={"0"}
                   value={inputText}
                   onChange={handleChange}
                   onBlur={handleBlur}
            />
         </div>
      </div>
   )
}


function getIconToShow(iconType: IconTypeBillOrPeople) {
   return iconType === ICON_TYPE_BILL
      ? <IconControl type={ICON_TYPE_BILL}/>
      : iconType === ICON_TYPE_PEOPLE
         ? <IconControl type={ICON_TYPE_PEOPLE}/>
         : <IconControl type={ICON_TYPE_BILL}/>;
}