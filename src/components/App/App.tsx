import logo from '../../assets/images/logo.svg'
import style from './App.module.scss'
import TipCard from "../TipCard/TipCard.tsx";
import BillDataInput from "../BillDataInput/BillDataInput.tsx";

function App() {

   return (
      <main className={style['mainContainer']}>
         <img src={logo} alt="Splitter logo" className={style['logo']}/>
         <h1 className={style['titleHidden']}>Splitter calculator</h1>
         <article className={style['contentContainer']} aria-label={"Content"}>
            <BillDataInput/>
            <TipCard/>
         </article>
      </main>
   )
}

export default App
