import React from 'react'
import './NavBar.css'
import NavBarSubMenu from '../NavBarSubMenu/NavBarSubMenu'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'

const NavBar = ({setActualPage, openMenu, openCart, closeMenu, closeCart}) => {
    const [subMenuOpen, setSubMenuOpen]= useState(false)
    const [menuCategory, setMenuCategory] = useState('default')
    const [subMenu, setSubMenu] = useState('hidden')

    function handleMouseEnter(e) {
        setSubMenu('visible');
        setMenuCategory(e)
        setSubMenuOpen(true)
    }

    function handleMouseLeave() {
        setSubMenu('hidden');
        setSubMenuOpen(false)
    }
    const handleMenuOpen =()=>{
        openMenu();
        closeCart()
    }
    const handleCartOpen=()=>{
        openCart()
        closeMenu()
    }
    return (
        <header onMouseLeave={handleMouseLeave}>
            <span>
                <div className='topBar' onMouseEnter={handleMouseLeave}>
                    <span>FREE SHIPPING ON ORDERS OVER $85</span>
                </div>
            </span>
            <nav>
                <div>
                    <NavLink to="/"><img src="/img/logo.svg" alt="" onMouseEnter={handleMouseLeave} /></NavLink>
                    <ul>
                        <li onMouseEnter={() => handleMouseEnter('womens')}><NavLink to="/collections/womens">Womens</NavLink></li>
                        <li onMouseEnter={() => handleMouseEnter('mens')}><NavLink to='/collections/mens'>Mens</NavLink></li>
                        <li onMouseEnter={() => handleMouseEnter('kids')}><NavLink to='/collections/kids'>Kids</NavLink></li>
                        <li onMouseEnter={() => handleMouseEnter('accesories')}><NavLink to='/collections/accesories'>Accesories</NavLink></li>
                    </ul>
                </div>
                <div onMouseEnter={handleMouseLeave}>
                </div>
                <div>
                    <i className='bx bx-search'></i>
                    <i className='bx bx-shopping-bag' onClick={handleCartOpen}></i>
                    <i className='bx bx-heart' ></i>
                    <i className='bx bx-menu' onClick={handleMenuOpen}></i>
                </div>
            </nav>
            <NavBarSubMenu visib={subMenu} cat={menuCategory} isOpen={subMenuOpen} restartPage={setActualPage}/>
        </header>
    )
}

export default NavBar