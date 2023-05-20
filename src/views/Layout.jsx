import React from 'react'
import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { UserContextProvider } from '../firebase models/userContext';
import { SearchContextProvider } from '../firebase models/SearchContext';


export function Layout() {
  return (
    <main>
      <UserContextProvider>
        <SearchContextProvider>
        <Navbar />
        <Outlet />
        </SearchContextProvider>
      </UserContextProvider>
    </main>
  )
}
