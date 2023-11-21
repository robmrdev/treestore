import './Checkout.css'
import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import urlBack from '../../assets/utils';
import CheckoutShipping from '../CheckoutShipping/CheckoutShipping';
import CheckoutPayment from '../CheckoutPayment/CheckoutPayment';

const Checkout = () => {
    const [steps, setSteps] = useState('shipping')
    let user = null
    let cart
    if (localStorage.getItem('provisionalCart')) cart = JSON.parse(localStorage.getItem('provisionalCart'))
    if (localStorage.getItem('accessToken')) user = jwtDecode(localStorage.getItem('accessToken')).user
    if (user != null) {
        cart = user.carts[0].cart
    }
    let total = 0;
    let totalQuantity = 0;
    cart.products.forEach(item => {
        total += item.price * item.quantity;
        totalQuantity += item.quantity;
    });
    return (
        <div className='checkoutContainer'>
            {(steps === 'shipping') ? <CheckoutShipping nextStep={() => setSteps('payment')} /> : <CheckoutPayment nextStep={() => setSteps('shipping')} />}
            <div className='sideCheckout'>
                <div className='sideCheckoutProductList'>
                    {cart.products.map((product) => (
                        <div key={product._id} className='sideCartProductCard'>
                            <div className='imgCheckoutWrapper'>
                                <img src={`${product.thumbnail}`} alt="" />
                                <span> {product.quantity}</span>
                            </div>
                            <div className='sideCartProductInfo'>
                                <div className='checkoutProductInfo'>
                                    <p>{product.title}</p>
                                    <p>{product.color[0]}</p>
                                </div>
                            </div>
                            <div className='checkoutItemPrice'>
                                <p>${product.price * product.quantity}.00</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className='checkoutSubtotal'>
                    <div>
                        <p>Subtotal</p>
                        <p>${total}.00</p>
                    </div>
                    <div>
                        <p>Shipping</p>
                        <span>$20.00</span>
                    </div>
                </div>
                <div className='checkoutTotal'>
                    <p>Total</p>
                    <strong>${total + 20}.00</strong>
                </div>
            </div>
        </div>
    )
}

export default Checkout