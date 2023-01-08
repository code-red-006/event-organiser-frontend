import React from 'react'
import './App.css'
import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import AdminLogin from './pages/admin/login/AdminLogin'
import AdminHome from './pages/admin/home/AdminHome'
import Userlogin from './pages/users/login/Userlogin'
import UserRegister from './pages/users/register/UserRegister'
import EventList from './pages/admin/home/EventList'
import { adminBaseURL } from './constants'
import ProgramsList from './pages/admin/programs/ProgramsList'
import SingleProgramDetails from './pages/admin/programDetails/SingleProgramDetails'
import Program from './store/ProgramContext'
import GroupeProgramDetails from './pages/admin/programDetails/GroupeProgramDetails'
import ResetPasswordForm from './pages/admin/home/ResetPasswordForm'

function App() {
  return (
    <BrowserRouter>
      <Routes>
          {/* Admin Routes ..testing */}
          <Route path='/admin/login' exact element={<AdminLogin />}></Route>
            <Route path='/admin' exact element={<AdminHome />}>
              <Route index element={<Navigate to='events' />} ></Route>
              <Route path='events' exact element={<EventList url={`${adminBaseURL}/events`} isAdmin={true} />} ></Route>
              <Route path='programs' exact element={<Program><ProgramsList /></Program>}></Route>
              <Route path='programs/single/:id' exact element={<Program><SingleProgramDetails /></Program>} ></Route>
              <Route path='programs/groupe/:id' exact element={<Program><GroupeProgramDetails /></Program>} ></Route>
              <Route path='reset' exact element={<ResetPasswordForm />}></Route>
            </Route>
          {/* Users Routes another testing */}
          <Route path='/register' exact element={<UserRegister />}></Route>
          <Route path='/login' exact element={<Userlogin />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
