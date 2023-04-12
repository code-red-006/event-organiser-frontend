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
import GroupeProgramDetails from './pages/admin/programDetails/GroupeProgramDetails'
import ResetPasswordForm from './pages/admin/home/ResetPasswordForm'
import ProgramSchedule from './pages/admin/schedule/ProgramSchedule'
import Home from './pages/users/home/UserHome'
import UserEvents from './pages/users/home/UserEvents'
import UserProgramList from './pages/users/home/UserProgramList'
import ArtsHome from './pages/admin/arts/ArtsHome'
import ArtsDetails from './pages/admin/arts/ArtsDetails'
import ArtsPrograms from './pages/admin/arts/ArtsPrograms'
import ArtsScore from './pages/admin/arts/ArtsScore'

function App() {
  return (
    <BrowserRouter>
      <Routes>
          {/* Admin Routes ..testing */}
          <Route path='/admin/login' exact element={<AdminLogin />}></Route>
            <Route path='/admin' exact element={<AdminHome />}>
              <Route index element={<Navigate to='events' />} ></Route>
              <Route path='events' exact element={<EventList url={`${adminBaseURL}/events`} isAdmin={true} />} ></Route>
              <Route path='programs/:eventId' exact element={<ProgramsList />}></Route>
              <Route path='programs/schedule/:eventId' exact element={<ProgramSchedule />}></Route>
              <Route path='arts/:eventId' exact element={<ArtsHome />}>
                <Route path='details' exact element={<ArtsDetails />} />
                <Route path='programs' exact element={<ArtsPrograms />} />
                <Route path='schedule' exact element={<ProgramSchedule />}></Route>
                <Route path='score' exact element={<ArtsScore />} />
              </Route>
              <Route path='programs/single/:id' exact element={<SingleProgramDetails />} ></Route>
              <Route path='programs/groupe/:id' exact element={<GroupeProgramDetails />} ></Route>
              <Route path='reset' exact element={<ResetPasswordForm />}></Route>
            </Route>
          {/* Users Routes another testing */}
          <Route path='/register' exact element={<UserRegister />}></Route>
          <Route path='/login' exact element={<Userlogin />}></Route>
          <Route path='/' exact element={<Navigate to='/admin' />}>
          <Route index element={<Navigate to='events' />} ></Route>
              <Route path='events' exact element={<UserEvents />} ></Route>
              <Route path='events/programs' exact element={<UserProgramList />} ></Route>
          </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
