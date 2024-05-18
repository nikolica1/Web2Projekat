import React from 'react';
import { BrowserRouter as Router, Route, Routes,  } from "react-router-dom";
import './App.css';
import Registration from './registration/Registration';
import Login from './registration/Login';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Dashboard from './users/Dashboard';


 import AddDriving from './driving/AddDriving';
import Chat from './driving/Chat';


function App() {


  const router = (

    
    <Router> <div className="App"    >
   
        
        <Routes>
        <Route path="" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/addDriving" element={<AddDriving />} />
          <Route path="/chat/:id" element={<Chat />} />

    
         
        </Routes>
        <ToastContainer />
      </div>
    </Router>
  );

  return router;
}

export default App;
