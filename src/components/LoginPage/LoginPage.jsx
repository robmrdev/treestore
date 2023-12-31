import './LoginPage.css'
import urlBack from '../../assets/utils.js'
import { NavLink, useNavigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import Cookies from 'js-cookie'
import { useEffect } from 'react'

const LoginPage = () => {
    const navigate = useNavigate()
    // let userIsLogged
    // useEffect(() => {
    //     const userIsLogged = Cookies.get('accessTokenCookie');
    //     if (userIsLogged) {
    //         navigate('/');
    //     }
    // }, []);

    const handleLogin = async e => {
        e.preventDefault()
        const formLogin = e.target
        const datos = {
            email: formLogin[0].value,
            password: formLogin[1].value,
        }
        const provisionalCart = localStorage.getItem('provisionalCart');
        if (provisionalCart) {
            document.cookie = 'provisionalCart=' + provisionalCart + '; path=/;';
        }
        const response = await fetch(`${urlBack}api/auth/login`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Cookie': `provisionalCart=${provisionalCart}`,
            },
            body: JSON.stringify(datos),
            credentials: 'include'
        });
        if (response.ok) {
            const data = await response.json()
            localStorage.setItem('accessToken', data.payload);
            const translate = jwtDecode(data.payload)
            // const cart = getItems()
            // console.log(translate.user.carts[0].cart)
            // if (provisionalCart == null) document.cookie = `provisionalCart=${translate.user.carts[0].cart}`;
            // console.log(JSON.parse(localStorage.getItem('provisionalCart')))

            localStorage.setItem('provisionalCart', JSON.stringify(translate.user.carts[0].cart))

            // console.log(JSON.stringify(translate))
            // console.log(provisionalCart)
            navigate('/');
        }
        else if (response.status === 401) {
            console.log('Invalid Credentials')
        }
    }

    const getItems = (products) => {
        const newProducts = []
        products.forEach(async element => {
            const product = await fetch(`${urlBack}productById/${element.product}`, {
                method: 'GET',
                credentials: 'include'
            });
            const response = await product.json()
            newProducts.push(response)
        });
        return newProducts
    }
    return (
        <section className='mainLoginContainer'>
            <div className='mainContainerLeft'>
                <h1>Log in</h1>
                <div className='loginFacebook'>
                    <span>Connect with Facebook</span>
                    <i className='bx bxl-facebook' ></i>
                </div>
                <div className='loginGoogle'>
                    <p>Connect with Google</p>
                    <i className='bx bxl-google' ></i>
                </div>
                <div className='loginAmazon'>
                    <p>Connect with Amazon</p>
                    <i className='bx bxl-amazon' ></i>
                </div>
                <form onSubmit={handleLogin}>
                    <div className='loginInputs'>
                        <input type="email" placeholder='Email' />
                        <div className='passwordWrapper'>
                            <i className='bx bx-lock-alt'></i>
                            <input type="text" placeholder='Password' />
                            <i className='bx bx-low-vision'></i>
                        </div>
                    </div>
                    <button type='submit'>Sign in</button>
                    <div className='loginBottom'>
                        <div>
                            <p>Don't you have an Account?</p>
                            <div>
                                <NavLink to={'/register'}><p>SIGN UP</p></NavLink>
                                <img src="/img/resources/arrow-tree-right.svg" alt="" className='arrowIcon' />
                            </div>
                        </div>
                        <p>Password Help?</p>
                    </div>
                </form>
            </div>
            <div className='mainContainerRight'>
                <img src="./img/resources/loginTrees.avif" alt="" />
                <h3>Get your own <br /> Interactive virtual forest</h3>
                <p>Register trees and get your own virtual forest island that will change as you plant</p>
                <a href="#">Get your impact wallet<div className='arrowIcon' /></a>
            </div>
        </section>
    )
}

export default LoginPage