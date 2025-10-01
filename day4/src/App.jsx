import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './componets/Navbar'
import { createBrowserRouter ,RouterProvider } from 'react-router-dom'
import Home from './componets/Home'
import Login from './componets/Login'
import About from './componets/About'

function App() {
  const router = createBrowserRouter([
    {
      path:"/",
      element : <> <Navbar /> <Home /></> 
    },
    {
      path:"/login",
      element : <> <Navbar /> <Login /> </>
    },
    {
      path:"/about",
      element : <> <Navbar /> <About/> </> 
    }
  ])

  return (
    <>
      
      <RouterProvider router={router}/>
    </>
  )
}

export default App
