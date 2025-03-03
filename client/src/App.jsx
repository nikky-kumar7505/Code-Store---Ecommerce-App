import {createBrowserRouter, RouterProvider} from "react-router-dom"
import Home from "./pages/Home"
import Success from "./pages/Success"
import { ThemeProvider } from "./components/provider/theme-provider"
import Footer from "./components/custom/Footer"
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import Product from "./pages/Product"
import Checkout from "./pages/Checkout"
import AdminLogin from "./pages/AdminLogin"
import Error from "./pages/Error"
import RootLayout from "../src/layouts/RootLayout"
import AdminLayout from "./layouts/AdminLayout"
import CreateProducts from "./components/custom/CreateProducts"
import AllProducts from "./components/custom/AllProducts"
import Analytics from "./components/custom/Analytics"
import Orders from "./components/custom/Orders"
import Settings from "./components/custom/Settings"
import { Provider } from "react-redux"
import { store } from "@/redux/store"
import MyOrders from "./pages/MyOrders"
import Sonner from "./components/ui/sonner.jsx"
import ProtectedRoute from "./components/custom/ProtectedRoute"




export default function App() {
  const router = createBrowserRouter([
    {
      path : "/",
      element: (
        <ProtectedRoute>
          <RootLayout childern={<Home/>} />
        </ProtectedRoute>
      )
    },
    {
      path : "/signup",
      element:(
        <ProtectedRoute>
          <RootLayout childern={<Signup/>} />
        </ProtectedRoute>
      )
    },
    {
      path: "/login",
      element : (
        <ProtectedRoute>
         <RootLayout childern={ <Login/>} />
        </ProtectedRoute>
      )
    },
    {
      path : "/product/:productName",
      element : (
        <RootLayout childern={<Product/>} />
      )
    },
    {
      path: "/checkout",
      element: (
        <ProtectedRoute>
          <RootLayout childern={ <Checkout/>} />
        </ProtectedRoute>
      )
    },
    {
      path: "/orders",
      element: (
        <ProtectedRoute>
          <RootLayout childern={ <MyOrders/>} />
        </ProtectedRoute>
      )
    },
    {
      path: "/admin/login",
      element: (
        <ProtectedRoute>
          <RootLayout childern={<AdminLogin/>} />
        </ProtectedRoute>
      )
    },
    {
      path: "/admin/dashboard",
      element : (
        <ProtectedRoute>
          <AdminLayout childern={<CreateProducts/>} />
        </ProtectedRoute>
      )
    },
    {
      path: "/admin/dashboard/all-products",
      element : (
        <ProtectedRoute>
         <AdminLayout childern={<AllProducts/>} />
        </ProtectedRoute>
      )
    },
    {
      path: "/admin/dashboard/analytics",
      element : (
        <ProtectedRoute>
          <AdminLayout childern={<Analytics/>} />
        </ProtectedRoute>
      )
    },
    {
      path: "/admin/dashboard/orders",
      element : (
        <ProtectedRoute>
          <AdminLayout childern={<Orders/>} />
        </ProtectedRoute>
      )
    },
    {
      path: "/admin/dashboard/settings",
      element : (
        <ProtectedRoute>
          <AdminLayout childern={<Settings/>} />
        </ProtectedRoute>
      )
    },
    {
      path: "/*",
      element: <Error/>
    },
    {
      path: "/success",
      element: <Success/>
    },
    
  ])

  return (
    <>
      <ThemeProvider>
        <Provider store={store} >
          <Sonner/>
          <RouterProvider router = {router}/>
        </Provider>
      </ThemeProvider>
    </>
  )
}