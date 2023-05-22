import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {BrowserRouter} from 'react-router-dom';
import {Routes, Route} from 'react-router-dom';

import {LANDING_PAGE, CATEGORIAS, PROVEEDORES, FAQ, DEFAULT, SEARCH_PAGE, REGISTER, LOGIN, APPLICATION, ADMIN, PRODUCT_PAGE,SUPPLIER_PROFILE, CATALOGO} from './routes/Url';
import {LandingPage} from './views/LandingPage';
import {Layout} from './views/Layout';
import {Providers} from './views/Providers';
import {Faq} from './views/Faq';
import { SearchPage } from './views/SearchPage';
import { Error } from './views/Error';
import {RegisterPage} from './views/RegisterPage'
import { LoginPage } from './views/LoginPage';
import { ApplicationPage } from './views/ApplicationPage';
import { PrivateRouteDoc } from './components/PrivateRoute';
import { AdminView } from './views/adminView';
import { ProductPage } from './views/ProductPage';
import {SupplierProfile} from './views/SupplierProfile';
import {Catalogo} from './views/Catalogo';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout/>}>
          <Route path={LANDING_PAGE} element={<LandingPage/>} />
          <Route path={PROVEEDORES} element={<Providers/>} />
          <Route path={CATEGORIAS} element={<Providers/>} />    
          <Route path={FAQ} element={<Faq/>} />
          <Route path={SEARCH_PAGE} element={<SearchPage/>} />
          <Route path={DEFAULT} element={<Error/>} />
          <Route path={REGISTER} element={<RegisterPage/>}/>
          <Route path={LOGIN} element={<LoginPage/>}/>
          <Route path={APPLICATION} element={<ApplicationPage/>}/>
          <Route path={ADMIN} element={<PrivateRouteDoc><AdminView/></PrivateRouteDoc>}/>
          <Route path={PRODUCT_PAGE} element={<ProductPage/>} />
          <Route path={SUPPLIER_PROFILE} element={<SupplierProfile/>} />
          <Route path={CATALOGO} element={<Catalogo/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)

