import React from 'react'
import Header from './components/sections/Header'
import SideBar from './components/sections/SideBar'
import Footer from './components/sections/Footer'
import Dashboard from './components/pages/Dashboard'

const App = () => {
  return (
    <div>
      <Header />
      <SideBar />
      <Dashboard />
      <Footer />
    </div>
  )
}

export default App