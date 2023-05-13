import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./routes/Home.jsx";
import Admin from "./routes/admin.jsx";
import Login from "./routes/Login";
import Register from "./routes/Register";
import ErrorPage from "./routes/ErrorPage";
import DefaultPage from "./components/DefaultPage";
import Alimentos from "./routes/Alimentos";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultPage />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "alimentos",
        element: <Alimentos />,
      },
      {
        path: "admin",
        element: <Admin />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>
);
