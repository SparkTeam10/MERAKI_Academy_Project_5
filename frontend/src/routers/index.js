import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main/index"
import Home from "../pages/Home/index"
import About from "../pages/About/index"
import Help from "../Layout/Help"
import NotFound from "../pages/NotFound"
import Category,{ allCategory } from "../pages/categories"
// import { allCategory } from "../Service/api/categories";
export const router= createBrowserRouter([
{
    path: "/",
    element:<Main/>,
    children:[
        {
            path: "",
            element:<Home/> 
        },
        {
            path: "about",
            element:<About/> 
        },
        {
            path: "help",
            element:<Help/> 
        },
    ]
},
{
    path: "/category",
    element: <Category/>, 
    loader:allCategory
},
{
    path: "*",
    element: <NotFound/>,  
}
])