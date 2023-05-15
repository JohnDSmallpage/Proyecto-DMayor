import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {BrowserRouter} from 'react-router-dom';
import {Routes, Route} from 'react-router-dom';
import {LANDING_PAGE, CATEGORIAS, PROVEEDORES, FAQ, DEFAULT} from './routes/Url';
import {LandingPage} from './views/LandingPage';
import {Layout} from './views/Layout';
import {Providers} from './views/Providers';
import {Faq} from './views/Faq';
import { Error } from './views/Error';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout/>}>
          <Route path={LANDING_PAGE} element={<LandingPage/>} />
          <Route path={PROVEEDORES} element={<Providers/>} />
          <Route path={CATEGORIAS} element={<Providers/>} />    
          <Route path={FAQ} element={<Faq/>} />
          <Route path={DEFAULT} element={<Error/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)

