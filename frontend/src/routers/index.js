import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/login";
import Booking from "../pages/Booking";
import Main from "../Layout/Main/index";
import Home from "../pages/Home/index";
import About from "../pages/About/index";
import Help from "../Layout/Help";
import NotFound from "../pages/NotFound";
import Register, { getRegister } from "../pages/Register";
import Category, { allCategory } from "../pages/categories";
import GetAllService from "../pages/AllService";
import ServiceProvider from "../pages/ServiceProvider";
import AdminPanel from "../pages/Admin/adminPanel";
import Account from "../pages/Account/index";
import Rate from "../pages/Rate/index";
import CategoryList from "../pages/categoryList"
import Rated from "../pages/Rated/index";
import Chat from "../pages/chatting/index";
import Message from "../pages/chatting/message";
import Flow from "../pages/FLOW/Flow";
import My from "../pages/Myaccount/My";
import AllBooking from "../pages/AllBooking/AllBooking";
// import Rated from "../pages/rated";


// import { allCategory } from "../Service/api/categories";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
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
      {
        path: "/",
        element: <Flow />,
      },
    ],
  },
  {
    path: "/account",
    element : <Account/>,
  },
      
      {
        path: "/register",
        element: <Register />,
        // loader: getRegister
      },
      {
        path: "/login",
        element: <Login />,
      },

  {
    path: "/category",
    element: <Category />,
    loader: allCategory,
  },

  {
    path: "/allserviceprovider",
    element: <GetAllService />,
    
  },
  {
    path: "/createprovider",
    element: <ServiceProvider />,
  },

  {
    path: "/:id",
    element: <CategoryList/>,
  },
  {
    path: "/providerID/:serviceProvider_id",
    element: <Rate />,
  },
  {
    path: "/admin",
    element: <AdminPanel />,
  },
 
  {
    path: "/booking/:serviceProviderId/:userId/:price",
  
    element: <Booking />,
  },
 {
  path: "/rated",
  element: <Rated/>
 },
 {
  path: "/chat",
  element: <Chat/>,
  children:[
    {
      path:"/chat",
element: <Message/>
    }
  ]
 },{
  path: "/mybooking/:user_id",
  element: <AllBooking/>
},
 {
  path:"/myOwnAccount",
  element: <My/>
 },
  {
    path: "*",
    element: <NotFound />,
  },
]);
