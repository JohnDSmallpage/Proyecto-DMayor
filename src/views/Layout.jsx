import React from 'react'
import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { UserContextProvider } from '../firebase models/userContext';

export function Layout() {
  return (
    <main>
      <UserContextProvider>
        <Navbar />
        <Outlet />
      </UserContextProvider>
    </main>
  )
}
