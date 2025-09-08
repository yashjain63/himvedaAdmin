import React from 'react'
import Header from './components/sections/Header'
import SideBar from './components/sections/SideBar'
import Footer from './components/sections/Footer'
import Dashboard from './components/pages/Dashboard'
import ProductList from './components/pages/ProductList'
import AddProduct from './components/pages/AddProduct'

const App = () => {
  return (
    <div>
      <Header />
      <SideBar />
      {/* <Dashboard /> */}
      {/* <ProductList/> */}
      <AddProduct />
      <Footer />
    </div>
  )
}

export default App