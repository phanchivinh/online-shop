import React from "react";
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'
import Home from "./pages/Home";
import Products from "./pages/Products";
import Product from "./pages/Product";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CartPage from "./pages/CartPage";
import UserInfo from "./pages/UserInfo";

import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Announcement from "./components/Announcement";
import { useSelector } from "react-redux";
import NotFound from "./pages/NotFound";


const Layout = () => {
  return (
    <div className="app">
      <Announcement />
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  )
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/userInfo',
        element: <UserInfo />
      },
      {
        path: '/products/:category/:page',
        element: <Products />
      },
      {
        path: '/product/:id',
        element: <Product />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/register',
        element: <Register />
      },
      {
        path: '/cart',
        element: <CartPage />
      }
    ],
  },
  {
    path: '*',
    element: <NotFound />
  }
])

function App() {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
