/** @format */

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Header from "./components/Header/Header";
import Shop from "./components/Shop/Shop";
import Home from "./components/Layout/Home/Home";
import PageNotFound from "./components/PageNotFound/PageNotFound";
import Orders from "./components/Orders/Orders";
import Inventory from "./components/Inventory/Inventory";
import Login from "./components/Login/Login";
import { CartProductLoader } from "./Loaders/CartProductLoader";
import Checkout from "./components/Checkout/Checkout";
import Signup from "./components/Signup";
import AuthProvider from "./components/Providers/AuthProvider";
import PrivateRoute from "./routes/PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: "/",
        element: <Shop />,
        loader: () => fetch("http://localhost:5000/totalProducts"),
      },
      {
        path: "orders",
        element: <Orders />,
        loader: CartProductLoader,
      },
      {
        path: "checkout",
        element: (
          <PrivateRoute>
            <Checkout />
          </PrivateRoute>
        ),
      },
      {
        path: "inventory",
        element: (
          <PrivateRoute>
            <Inventory />
          </PrivateRoute>
        ),
      },
      {
        path: "login",
        element: <Login />,
      },

      {
        path: "/signup",
        element: <Signup />,
      },
    ],
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
