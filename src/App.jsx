import React from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from "./components/Home/Home"
import Register from "./components/Register/Register"
import Login from "./components/Login/Login"
import Brands from "./components/Brands/Brands"
import Cart from "./components/Cart/Cart"
import Notfound from "./components/Notfound/Notfound"
import Products from "./components/Products/Products"
import Categories from "./components/Categories/Categories"
import Layout from './components/Layout/Layout'
import UserContextProvider from './Context/UserContext'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import ProductDetails from './components/ProductDetails/ProductDetails';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import CartContextProvider from './Context/CartContext'
import { Toaster } from 'react-hot-toast';
import WishlistContextProvider from './Context/WishlistContext'
import Wishlist from './components/Wishlist/Wishlist'
import Checkout from './components/Checkout/Checkout'
import Orders from './components/Orders/Orders'
import Password from './components/Password/Password'
import Verify from './components/VerifyCode/Verify'
import NewPassword from './components/NewPassword/NewPassword'
import ChangePassword from './components/ChangePassword/ChangePassword'
let query = new QueryClient()


let x = createBrowserRouter([

  {
    path: "", element: <Layout />, children: [
      { index: true, element: <ProtectedRoute><Home /></ProtectedRoute> },
      { path: "categories", element: <ProtectedRoute><Categories /></ProtectedRoute> },
      { path: "brands", element: <ProtectedRoute><Brands /></ProtectedRoute> },
      { path: "products", element: <ProtectedRoute><Products /></ProtectedRoute> },
      { path: "cart", element: <ProtectedRoute><Cart /></ProtectedRoute> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "forgot-password", element: <Password /> },
      { path: "verify", element: <Verify /> },
      { path: "reset-password", element: <NewPassword /> },
      { path: "wishlist", element: <ProtectedRoute><Wishlist /></ProtectedRoute> },
      { path: "change-password", element:<ProtectedRoute><ChangePassword /></ProtectedRoute>},
      { path: "orders/:cartID", element: <ProtectedRoute><Orders /></ProtectedRoute> },
      { path: "checkout/:cartID", element: <ProtectedRoute><Checkout /></ProtectedRoute> },
      { path: "productdetails/:id/:category", element: <ProtectedRoute><ProductDetails /></ProtectedRoute> },
      { path: "*", element: <ProtectedRoute><Notfound /></ProtectedRoute> }
    ]
  }

])

function App() {

  return (
    <>
      <UserContextProvider>
        <QueryClientProvider client={query}>
          <CartContextProvider>
            <WishlistContextProvider>
              <RouterProvider router={x}></RouterProvider>
              <Toaster />
            </WishlistContextProvider>
          </CartContextProvider>
          <ReactQueryDevtools />
        </QueryClientProvider>
      </UserContextProvider>

    </>
  )
}

export default App
