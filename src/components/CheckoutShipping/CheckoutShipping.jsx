import './CheckoutShipping.css'

const CheckoutShipping = ({ nextStep }) => {
    return (

        <div className='mainCheckout'>
            <div className='checkoutLogo'>
                <img src="../img/resources/tentreeLogo.png" alt="" />

            </div>
            <div className='shippingInfo'>
                <img src="../img/resources/shipping-tree.jpg" alt="" />
                <div>
                    <div>
                        <h4>
                            Shipping
                        </h4>
                        <p>
                            Sequester your shipping emissions by planting 7 trees.
                        </p>
                    </div>
                    <div className='shippingPrice'>
                        Worldwide $20.00
                    </div>
                </div>
            </div>
            <form>
                <h2>Contact</h2>
                <input type="checkbox" /> <p>Email me with news and offers</p>
                <h2>Shipping Address</h2>
                <div className='shippingAddressWrapper'>
                    <div className='inputWrapper'>
                        <input type="text" /><p>Country/Region</p>
                    </div>
                    <div className='inputWrapper inputHalf'>
                        <input type="text" /><p>First name</p>
                    </div>
                    <div className='inputWrapper inputHalf'>
                        <input type="text" /><p>Last name</p>
                    </div>
                    <div className='inputWrapper inputThird'>
                        <input type="text" /><p>Address</p>
                    </div>
                    <div className='inputWrapper inputThird'>
                        <input type="text" /><p>City</p>
                    </div>
                    <div className='inputWrapper inputThird'>
                        <input type="text" /><p>State</p>
                    </div>
                    <div className='inputWrapper'>
                        <input type="text" /><p>ZIP code</p>
                    </div>
                    <div className='inputWrapper'>
                        <input type="text" /><p>Phone</p>
                    </div>
                    <div className='inputWrapper'>
                        <input type="text" /><p>Country/Region</p>
                    </div>
                </div>
                <div className='shippingBottom'>
                    <p>Return to cart</p>
                    <button type="submit" onClick={nextStep}>Continue to payment</button>
                </div>
            </form>
        </div>
    )
}

export default CheckoutShipping