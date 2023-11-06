import React, { useContext } from 'react'
import Register from './pages/Register'
import Login from './pages/Login'
import Home from './pages/Home';
import { AuthContext } from './context/AuthContext';
import './Design.scss';

import { BrowserRouter, Routes, Route} from "react-router-dom";

function App() {
const {currentUser} =useContext(AuthContext)
console.log(currentUser)

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/">
        <Route index element={currentUser ? <Home/> : <Login/>}/>
        <Route path="login" element={<Login/>}/>
        <Route path="register" element={<Register/>}/>
      </Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App
