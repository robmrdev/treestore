import { NavLink } from 'react-router-dom';
import './SideCart.css'
import { useEffect, useState } from 'react';
import urlBack from '../../assets/utils.js';
import { jwtDecode } from 'jwt-decode';
import SideCartList from '../SideCartList/SideCartList.jsx';

const SideCart = ({ cartOpen, cartClose }) => {
    const [product, setProduct] = useState()
    const [itemsDeleted, setItemsDeleted] = useState(0);
    const [cartSummary, setCartSummary] = useState({ total: 0, quantity: 0 });


    useEffect(() => {
        fetchData();
    }, []);
    let user = null
    let cart

    if(localStorage.getItem('accessToken')) user = jwtDecode(localStorage.getItem('accessToken')).user
    if (user != null) {
        cart = user.carts[0].cart
    }

    const fetchData = async () => {
        try {
            const response = await fetch(`${urlBack}getproducts?query=accesories`)
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setProduct(data.payload);
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const handleContainerClick = (e) => {
        e.stopPropagation();
    };const updateSideCartList = () => {
        setItemsDeleted(itemsDeleted + 1);
    };
    useEffect(() => {
        setCartSummary({ total: cartSummary.total, quantity: cartSummary.quantity });
    }, [cartSummary.total, cartSummary.quantity]);

    const handleTotalChange = (total, totalQuantity) => {
        if (total !== cartSummary.total || totalQuantity !== cartSummary.quantity) {
            setCartSummary({ total, quantity: totalQuantity });
        }
    };
    

    if (!cartOpen) return
    return (
        <div className='sideModal cartModal' onClick={cartClose}>
            <div className='sideContainer cartContainer' onClick={handleContainerClick}>
                <div className='sideCartTitle'>
                    <h3>Your Cart</h3>
                    <i className='bx bx-x' onClick={cartClose}></i>
                </div>
                <div className='sideCartDivider'></div>
                {(user === null || cart.products.length === 0) ? <div className='sideCartInnerListEmpty'>
                    <h4>Your cart it's empty!</h4>
                    <p>Add your favorite items to your cart.</p>
                    <div className='cartButtons'>
                        <div className='buttonGreen'><NavLink to="/collections/womens" onClick={cartClose}>Shop Women's</NavLink></div>
                        <div className='buttonGreen'><NavLink to="/collections/mens" onClick={cartClose}>Shop Mens's</NavLink></div>
                    </div>
                </div>
                    : (<SideCartList cart={cart} itemsDeleted={itemsDeleted} updateSideCartList={updateSideCartList} setCartSummary={setCartSummary} onTotalChange={handleTotalChange} />
                    )}
                <div className='sideCartBottom'>
                    <h5>Before You Go</h5>
                    <div className='sideCartSuggestionsContainer'>
                        {product ? (
                            <>
                                <div className='sideCartCardContainer'>
                                    <div className='sideCartCard'>
                                        <img src={`/img/products/${product.product[1].category}${product.product[1].thumbnail[product.product[1].color[0]][0]}`} alt="" />
                                        <div>
                                            <strong>{product.product[1].title}</strong>
                                            <p>${product.product[1].price}.00</p>
                                        </div>
                                    </div>
                                    <strong>QUICK ADD</strong>
                                </div>
                                <div className='sideCartCardContainer'>
                                    <div className='sideCartCard'>
                                        <img src={`/img/products/${product.product[1].category}${product.product[1].thumbnail[product.product[1].color[0]][0]}`} alt="" />
                                        <div>
                                            <strong>{product.product[1].title}</strong>
                                            <p>${product.product[1].price}.00</p>
                                        </div>
                                    </div>
                                    <strong>QUICK ADD</strong>
                                </div>
                            </>
                        ) : (<p>Cargando</p>)
                        }
                    </div>
                </div>
                {(user === null || cart.products.length === 0) ? <></>
                    : (<div className='sideCartCheckoutWrapper'>
                        <div className='sideCartDividerUp'></div>
                        <div className='sideCartCheckout'>
                            <div className='sideCartSubTotal'>
                                <span>Subtotal: {cartSummary.quantity} Items</span>
                                <span> ${cartSummary.total}.00</span>
                            </div>
                            <div className='checkoutButton'>
                            <NavLink to="/checkout">CHECKOUT</NavLink>
                            </div>
                            <p>or 4 interest-free installments of ${cartSummary.total/4} by Klarna</p>
                            <p>Your order's status</p>
                            <div>10 trees planted</div>
                        </div>
                    </div>
                    )}
            </div>
        </div>
    )
}

export default SideCart