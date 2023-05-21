import { Routes, Route } from "react-router-dom";
import { LANDING_PAGE, CATEGORIAS, PROVEEDORES, FAQ, SUPPLIER_PROFILE } from "../routes/Url";
import  LandingPage  from "../views/LandingPage";
import  Layout  from "../views/Layout";
import  Providers  from "../views/Providers";
import  Faq  from "../views/Faq";
import SupplierProfile from "../views/SupplierProfile";


export function App() {

  return (
    <>
      <Routes>
        <Route element={<Layout/>}/>
          <Route path={LANDING_PAGE} element={<LandingPage/>} />
          <Route path={CATEGORIAS}/>
          <Route path={PROVEEDORES} element={<Providers/>} />
          <Route path={FAQ} element={<Faq/>} />
          <Route path={SUPPLIER_PROFILE} element={<SupplierProfile/>} />

      </Routes>
    </>
  );
}

