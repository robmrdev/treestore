import './Checkout.css'
import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import urlBack from '../../assets/utils';

const Checkout = () => {

    const [productDetails, setProductDetails] = useState([]);
    let user = null
    let cart

    if (localStorage.getItem('accessToken')) user = jwtDecode(localStorage.getItem('accessToken')).user
    if (user != null) {
        cart = user.carts[0].cart
    }
    const fetchItem = async (id) => {
        try {
            const response = await fetch(`${urlBack}productById/${id}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            return data.payload;
        } catch (error) {
            console.error('Error:', error);
        }
    };
    useEffect(() => {
        loadProductDetails()
    }, []);
    const loadProductDetails = async () => {
        const details = await Promise.all(
            cart.products.map(async (item) => {
                const productData = await fetchItem(item.product);
                return {
                    ...productData,
                    quantity: item.quantity
                };
            })
        );
        setProductDetails(details);
    };

    let total = 0;
    let totalQuantity = 0;
    productDetails.forEach(item => {
        total += item.price * item.quantity;
        totalQuantity += item.quantity;
    });
    console.log(totalQuantity)
    return (
        <div className='checkoutContainer'>
            <div className='mainCheckout'></div>
            <div className='sideCheckout'>
                <div className='sideCheckoutProductList'>
                    {productDetails.map((product) => (
                        <div key={product._id} className='sideCartProductCard'>
                            <div className='imgCheckoutWrapper'>
                                <img src={`../img/products/${product.category}/${product.thumbnail[product.color[0]][0]}`} alt="" />
                                <span> {product.quantity}</span>
                            </div>
                            <div className='sideCartProductInfo'>
                                <div className='checkoutProductInfo'>
                                    <p>{product.title}</p>
                                    <p>{product.color[0]}</p>
                                    {/* <p>{product.quantity}</p> */}
                                </div>
                            </div>
                            <div className='checkoutItemPrice'>
                                <p>${product.price * product.quantity}.00</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className='checkoutTotal'>
                    <div>
                        <p>Subtotal</p>
                        <p>{total}</p>
                    </div>
                    <div>
                        <p>Shipping</p>
                        <span>Calculated at next step</span>
                    </div>
                    <div>
                        <p>Total</p>
                        <strong>{total}</strong>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Checkout