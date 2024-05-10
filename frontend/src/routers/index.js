import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main/index"
import Home from "../pages/Home/index"
import About from "../pages/About/index"
import Help from "../Layout/Help"
import NotFound from "../pages/NotFound"
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
    path: "*",
    element: <NotFound/>,  
}
])