import React from 'react'
import './app.css'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import AdminLogin from './pages/admin/Login'
import Home from './pages/admin/Home'

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path='/admin/login' exact element={<AdminLogin />}></Route>
          <Route path='/admin' exact element={<Home />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
