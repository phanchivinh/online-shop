import React from "react";
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'
import Home from "./pages/Home";
import Products from "./pages/Products";
import Product from "./pages/Product";
import Login from "./pages/Login";
import Register from "./pages/Register";

import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Annoucement from "./components/Annoucement";

const Layout = () => {
  return (
    <div className="app">
      <Annoucement />
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  )
}

const router = createBrowserRouter([
  {
    path:'/',
    element: <Layout />,
    children: [
      {
        path:'/',
        element:<Home />
      },
      {
        path:'/products/:gender',
        element:<Products />
      },
      {
        path:'/product/:id',
        element:<Product />
      },
      {
        path:'/login',
        element: <Login />
      },
      {
        path:'/register',
        element: <Register />
      },
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
