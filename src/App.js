import React from 'react'
import './App.css'
import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import AdminLogin from './pages/admin/AdminLogin'
import AdminHome from './pages/admin/AdminHome'
import Userlogin from './pages/users/Userlogin'
import UserRegister from './pages/users/UserRegister'
import EventList from './components/EventList'
import { adminBaseURL } from './constants'
import ProgramsList from './components/ProgramsList'
import SingleProgramDetails from './components/SingleProgramDetails'
import Single from './store/SingleProgramContext'

function App() {
  return (
    <BrowserRouter>
      <Routes>
          {/* Admin Routes ..testing */}
          <Route path='/admin/login' exact element={<AdminLogin />}></Route>
            <Route path='/admin' exact element={<AdminHome />}>
              <Route index element={<Navigate to='events' />} ></Route>
              <Route path='events' exact element={<EventList url={`${adminBaseURL}/events`} isAdmin={true} />} ></Route>
              <Route path='programs' exact element={<Single><ProgramsList /></Single>}></Route>
              <Route path='programs/:id' exact element={<Single><SingleProgramDetails /></Single>} ></Route>
            </Route>

          {/* Users Routes another testing */}
          <Route path='/register' exact element={<UserRegister />}></Route>
          <Route path='/login' exact element={<Userlogin />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
