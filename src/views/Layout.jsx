import React from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { UserContextProvider } from "../firebase models/userContext";
import { SearchContextProvider } from "../firebase models/SearchContext";
import { ProductContextProvider } from "../firebase models/ProductContext";
import { FavoritesProvider } from "../firebase models/FavoritesContext";

export function Layout() {
  return (
    <main>
      <UserContextProvider>
      <FavoritesProvider>
        <SearchContextProvider>
          <ProductContextProvider>
            
              <section className="font-robotoSlab">
                <Navbar />
                <Outlet />
              </section>
            
          </ProductContextProvider>
        </SearchContextProvider>
        </FavoritesProvider>
      </UserContextProvider>
    </main>
  );
}
