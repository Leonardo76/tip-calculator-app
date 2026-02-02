import style from './IconControl.module.scss'
import {ICON_TYPE_BILL, ICON_TYPE_PEOPLE} from "../../lib/types.ts";
import dollar from '../../assets/images/icon-dollar.svg'
import person from '../../assets/images/icon-person.svg'

type IconControlType = {
   type?: typeof ICON_TYPE_BILL | typeof ICON_TYPE_PEOPLE
}

export default function IconControl({type}: IconControlType) {
   const image =
      type === ICON_TYPE_BILL
         ? dollar
         : type === ICON_TYPE_PEOPLE
            ? person
            : dollar;

   return (
      <img src={image} alt="Dollar icon" className={style['icon']}/>
   )
}
