import { Routes, Route } from "react-router-dom";
import { LANDING_PAGE, CATEGORIAS, PROVEEDORES, FAQ, SUPPLIER_PROFILE, CHAT3 } from "../routes/Url";
import  LandingPage  from "../views/LandingPage";
import  Layout  from "../views/Layout";
import  Providers  from "../views/Providers";
import  Faq  from "../views/Faq";
import SupplierProfile from "../views/SupplierProfile";
import Chat3 from "../components/Chat3";

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
          <Route path={CHAT3} element={<Chat3/>} />
      </Routes>
    </>
  );
}

