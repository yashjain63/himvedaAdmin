import React from 'react'
import SideBar from './components/sections/SideBar'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


const App = () => {
  return (
    <div>
      <Router>
        <SideBar />
      </Router>
    </div>
  )
}

export default App