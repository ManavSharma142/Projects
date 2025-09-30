import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import NavBar from './components/NavBar'
import HomePage from './components/HomePage'
import ViewPaste from './components/ViewPaste'
import Paste from './components/Paste'

const Router = createBrowserRouter(
  [

    {
      path:"/",
      element:
      <div>
        <NavBar/>
        <HomePage/>
      </div>
    }, 

    {
      path:"/pastes",
      element:
      <div>
        <NavBar/>
        <Paste/>
      </div>
    },

    {
      path:"/pastes/:id",
      element:
      <div>
        <NavBar/>
        <ViewPaste/>
      </div>
    },

  ]


);

function App() {
  

  return (
    <div>
      <RouterProvider router={Router} />
    </div>
  )
}

export default App
