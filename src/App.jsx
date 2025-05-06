import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import ErrorPage from './pages/ErrorPage'
import NotFound from './pages/NotFound'
import ExchangeRates from './pages/ExchangeRates'
import Navbar from './components/Navbar'

const App = () => {
  return (
    <>
    <Navbar></Navbar>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/exchange-rates" element={<ExchangeRates baseCurrency={'USD'} />} /> 
      <Route path="/error" element={<ErrorPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
    </>
  )
}

export default App
