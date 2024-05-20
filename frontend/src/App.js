import React from 'react'
import "./App.css";
import {RouterProvider} from "react-router-dom"
import { router } from './routers';
import { ChakraProvider } from '@chakra-ui/react'

const App = () => {
  return (
    <ChakraProvider>
   <RouterProvider router={router}/>
   </ChakraProvider>
  )
}

export default App
