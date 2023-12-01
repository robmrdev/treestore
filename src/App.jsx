import './App.css'
import ProductListContainer from './components/ProductListContainer/ProductListContainer';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import NavBar from './components/NavBar/NavBar';
import MainPage from './components/MainPage/MainPage';
import ProductView from './components/ProductView/ProductView';
import LoginPage from './components/LoginPage/LoginPage';
import Register from './components/Register/Register';
import SideModal from './components/SideModal/SideModal';
import Private from './components/Private/Private';
import SideCart from './components/SideCart/SideCart';
import urlBack from './assets/utils';
import Checkout from './components/Checkout/Checkout';
import newOrder from './components/newOrder/newOrder';
import FakerProducts from './components/FakerProducts/FakerProducts';


function App() {

  const [actualPage, setActualPage] = useState('1')
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] =useState(false);
  const [user, setUser] = useState(null)

  const openCart = ()=>{
    setIsCartOpen(true)
  }
  const closeCart = ()=>{
    setIsCartOpen(false)
  }

  const openMenu = () => {
    setIsMenuOpen(true);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };


  return (
    <>
      <Router>
        <SideModal isOpen={isMenuOpen} onClose={closeMenu}/>
        <SideCart  cartOpen={isCartOpen} cartClose={closeCart} />
        <NavBar setActualPage={setActualPage} openMenu={openMenu} openCart={openCart} closeMenu={closeMenu} closeCart={closeCart}/>
        <main>
          <Routes>
            <Route path='/' element={<MainPage setActualPage={setActualPage}/>} />
            <Route path='/collections/:collection/' element={<ProductListContainer actualPage={actualPage} setActualPage={setActualPage} />} />
            <Route path='/collections/:collection/:subCat' element={<ProductListContainer actualPage={actualPage} setActualPage={()=>setActualPage()}/>} />
            <Route path='/products/:title' Component={ProductView} />
            <Route path='/login/' element={<LoginPage/>}/>
            <Route path='/register/' Component={Register}/>
            <Route path='/private' Component={Private}/>
            <Route path='/checkout' Component ={Checkout}/>
            <Route path='/orderCompleted' Component={newOrder}/>
            <Route path='/fakerProducts'Component={FakerProducts}/>
          </Routes>
          {/* <AddProductForm /> */}
        </main>
      </Router>
    </>
  )
}

export default App
