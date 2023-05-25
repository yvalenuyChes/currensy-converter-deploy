
import { createBrowserRouter } from "react-router-dom"
import Converter from "./pages/Converter/Converter.js"
import ExchangeRate from './pages/ExchangeRates/ExchangeRates.js'
import './style/style.scss'
import { RouterProvider } from 'react-router-dom'


const router = createBrowserRouter([
  {
    path: '/',
    element: <Converter/>
  },

  {
    path: '/exchange_rates',
    element: <ExchangeRate/>
  }
])

function App() {
  return (
    <>
     <RouterProvider path='/' router={router} />
      
    </>
     
    
  )
}

export default App
