import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Home from './pages/Home'
import Payout from './pages/Payout'
import Login from './pages/Login'
import AdminPage from './pages/Admin'
const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/payout' element={<Payout/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
         <Route path='/admin' element={<AdminPage/>}></Route>

      </Routes>

    </div>
  )
}

export default App