import React from 'react'
import './NavBar.css'

const NavBar = () => {
    return (
        <header>
            <span>
                <div className='topBar'>
                    <span>FREE SHIPPING ON ORDERS OVER $85</span>
                </div>
            </span>
            <nav>
                <div>
                    <img src="/img/logo.svg" alt="" />
                    <ul>
                        <li>Womens</li>
                        <li>Mens</li>
                        <li>Accesories</li>
                    </ul>
                </div>
                <div>
                    <i class='bx bx-search'></i>
                    <i class='bx bx-shopping-bag' ></i>
                    <i class='bx bx-heart' ></i>
                    <i class='bx bx-menu' ></i>
                </div>
            </nav>
        </header>
    )
}

export default NavBar