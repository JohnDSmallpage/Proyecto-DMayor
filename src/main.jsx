import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {BrowserRouter} from 'react-router-dom';
import {Routes, Route} from 'react-router-dom';

<<<<<<< HEAD
import {LANDING_PAGE, CATEGORIAS, PROVEEDORES, FAQ, DEFAULT, SEARCH_PAGE, REGISTER, LOGIN, APPLICATION, ADMIN, PRODUCT_PAGE,SUPPLIER_PROFILE, CLIENT_PROFILE, CHECKOUT, CHAT} from './routes/Url';
=======
import {LANDING_PAGE, CATEGORIAS, PROVEEDORES, FAQ, DEFAULT, SEARCH_PAGE, REGISTER, LOGIN, APPLICATION, ADMIN, PRODUCT_PAGE,SUPPLIER_PROFILE, CATALOGO} from './routes/Url';
>>>>>>> 7801a758b4b80294c0c624af4f45e61cfca59a94
import {LandingPage} from './views/LandingPage';
import {Layout} from './views/Layout';
import {Providers} from './views/Providers';
import {Faq} from './views/Faq';
import { SearchPage } from './views/SearchPage';
import { Error } from './views/Error';
import {RegisterPage} from './views/RegisterPage'
import { LoginPage } from './views/LoginPage';
import { ApplicationPage } from './views/ApplicationPage';
import { PrivateRoute } from './components/PrivateRoute';
import { AdminView } from './views/adminView';
import { ProductPage } from './views/ProductPage';
import {SupplierProfile} from './views/SupplierProfile';
<<<<<<< HEAD
import { PrivateSupplier } from './components/PrivateSupplier';
import { ClientProfile } from './views/ClientProfile';
import { PrivateRouteClient } from './components/PrivateRouteClient';
import { CheckoutPage } from './views/CheckoutPage';
import { Chat } from './components/Chat';
import { AddProduct } from './views/AddProduct';
import { ADD_PRODUCT }   from './routes/Url';
import { CATALOG } from './routes/Url';
import { SupplierCatalog } from './views/SupplierCatalog';
import { SUPPLIER_INFO } from './routes/Url';
import { SupplierInfo } from './views/SupplierInfo';

=======
import {Catalogo} from './views/Catalogo';
>>>>>>> 7801a758b4b80294c0c624af4f45e61cfca59a94

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
          <Route path={ADMIN} element={<PrivateRoute><AdminView/></PrivateRoute>}/>
          <Route path={PRODUCT_PAGE} element={<ProductPage/>} />
<<<<<<< HEAD
          <Route path={SUPPLIER_PROFILE} element={<PrivateSupplier><SupplierProfile/></PrivateSupplier>} />
          <Route path={CHECKOUT} element={<PrivateRouteClient> <CheckoutPage/> </PrivateRouteClient>} /> 
          <Route path={CLIENT_PROFILE} element={<PrivateRouteClient><ClientProfile/></PrivateRouteClient>}/>
          <Route path={CHAT} element={<PrivateRouteClient><Chat/></PrivateRouteClient>}/>
          <Route path={ADD_PRODUCT} element={<PrivateSupplier><AddProduct/></PrivateSupplier>}/>
          <Route path={CATALOG} element={<PrivateSupplier><SupplierCatalog/></PrivateSupplier>}/>
          <Route path={SUPPLIER_INFO} element={<PrivateSupplier><SupplierInfo/></PrivateSupplier>}/>

=======
          <Route path={SUPPLIER_PROFILE} element={<SupplierProfile/>} />
          <Route path={CATALOGO} element={<Catalogo/>} />
>>>>>>> 7801a758b4b80294c0c624af4f45e61cfca59a94
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)

