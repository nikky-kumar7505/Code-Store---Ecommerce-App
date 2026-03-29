import {createBrowserRouter, RouterProvider, Outlet} from "react-router-dom"
import Home from "./pages/Home"
import Success from "./pages/Success"
import { ThemeProvider } from "./components/provider/theme-provider"
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import Product from "./pages/Product"
import Checkout from "./pages/Checkout"
import AdminLogin from "./pages/AdminLogin"
import Error from "./pages/Error"
import RootLayout from "./layouts/RootLayout"
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
import ScrollToTop from "./components/custom/ScrollToTop"
import GlobalLoading from "./components/custom/GlobalLoading"

function AppShell() {
  return (
    <>
      <ScrollToTop />
      <GlobalLoading />
      <Outlet />
    </>
  )
}

export default function App() {
  const router = createBrowserRouter([
    {
      element: <AppShell />,
      children: [
        {
          path : "/",
          element: (
            <ProtectedRoute>
              <RootLayout><Home/></RootLayout>
            </ProtectedRoute>
          )
        },
        {
          path : "/signup",
          element:(
            <ProtectedRoute>
              <RootLayout><Signup/></RootLayout>
            </ProtectedRoute>
          )
        },
        {
          path: "/login",
          element : (
            <ProtectedRoute>
              <RootLayout><Login/></RootLayout>
            </ProtectedRoute>
          )
        },
        {
          path : "/product/:productName",
          element : (
            <RootLayout><Product/></RootLayout>
          )
        },
        {
          path: "/checkout",
          element: (
            <ProtectedRoute>
              <RootLayout><Checkout/></RootLayout>
            </ProtectedRoute>
          )
        },
        {
          path: "/orders",
          element: (
            <ProtectedRoute>
              <RootLayout><MyOrders/></RootLayout>
            </ProtectedRoute>
          )
        },
        {
          path: "/admin/login",
          element: (
            <ProtectedRoute>
              <RootLayout><AdminLogin/></RootLayout>
            </ProtectedRoute>
          )
        },
        {
          path: "/admin/dashboard",
          element : (
            <ProtectedRoute>
              <AdminLayout><CreateProducts/></AdminLayout>
            </ProtectedRoute>
          )
        },
        {
          path: "/admin/dashboard/all-products",
          element : (
            <ProtectedRoute>
              <AdminLayout><AllProducts/></AdminLayout>
            </ProtectedRoute>
          )
        },
        {
          path: "/admin/dashboard/analytics",
          element : (
            <ProtectedRoute>
              <AdminLayout><Analytics/></AdminLayout>
            </ProtectedRoute>
          )
        },
        {
          path: "/admin/dashboard/orders",
          element : (
            <ProtectedRoute>
              <AdminLayout><Orders/></AdminLayout>
            </ProtectedRoute>
          )
        },
        {
          path: "/admin/dashboard/settings",
          element : (
            <ProtectedRoute>
              <AdminLayout><Settings/></AdminLayout>
            </ProtectedRoute>
          )
        },
        {
          path: "/success",
          element: <Success/>
        },
        {
          path: "*",
          element: <Error/>
        },
      ],
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
