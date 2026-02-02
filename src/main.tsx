import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {Provider} from "react-redux";
import './styles/index.scss'
import {store} from "./stores/store.ts";
import App from './components/App/App.tsx'

createRoot(document.getElementById('root')!).render(
   <StrictMode>
      <Provider store={store}>
         <App/>
      </Provider>
   </StrictMode>,
)
