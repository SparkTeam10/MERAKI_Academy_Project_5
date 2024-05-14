import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main/index";
import Home from "../pages/Home/index";
import About from "../pages/About/index";
import Help from "../Layout/Help";
import NotFound from "../pages/NotFound";
import Register from "../pages/Register";
import Category, { allCategory } from "../pages/categories";
import CategoryList from "../pages/categoryList";
import AdminPanel from "../pages/Admin/adminPanel";

import Rate from "../pages/Rate/index"
// import { allCategory } from "../Service/api/categories";

import Login from "../pages/login";
import Booking from "../pages/Booking";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "help",
        element: <Help />,
      },
    ],
  },
  {
    path: "/category",
    element: <Category />,
    loader: allCategory,
  },
  {
    path: "/register",
    element: <Register />,
    // loader: getRegister
  },
  {
    path: "/:id",
    element: <CategoryList />,
  },
  {
    path: "/rate",
    element: <Rate />,
  },
  {
    path: "/admin",
    element: <AdminPanel />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/booking",
    element: <Booking />,
  },

  {
    path: "*",
    element: <NotFound />,
  },
]);
