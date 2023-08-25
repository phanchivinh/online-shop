import React from "react";
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'
import Home from "./pages/Home";
import Products from "./pages/Products";
import Product from "./pages/Product";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CartPage from "./pages/CartPage";

import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Announcement from "./components/Announcement";
import { useSelector } from "react-redux";


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
        path: '/products/:gender/:page',
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
])

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
