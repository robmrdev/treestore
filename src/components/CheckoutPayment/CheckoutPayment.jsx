import './CheckoutPayment.css'

const CheckoutPayment = ({nextStep}) => {
    return (

        <div className='mainCheckout'>
            <div className='checkoutLogo'>
                <img src="../img/resources/tentreeLogo.png" alt="" />
            </div>
            <div className='checkoutContact'>
                <div>
                    <p>Contact</p>
                    <p>Email</p>
                    <p>Change</p>
                </div>
                <div className='checkoutDivider'></div>
                <div>
                    <p>Ship to</p>
                    <p>Address</p>
                    <p>Change</p>
                </div>
            </div>
            <div>
                <h3>Payment</h3>
                <p>All transactions are secure and encrypted.</p>
                <div className='paymentWrapper'>
                    <div className='paymentOptionWrapper'>
                        <div className='paymentOption'>
                            <input type="radio" />
                            <label htmlFor="creditCard"></label>
                            <p>Credit card</p>
                        </div>
                        <div>
                            <img src="./img/resources/visa.svg" alt="" />
                            <img src="./img/resources/mastercard.svg" alt="" />
                            <img src="./img/resources/amex.svg" alt="" />
                        </div>
                    </div>
                    <div className='checkoutDivider'></div>
                    <div className='creditCardInfo'>
                        <div className='inputWrapper'>
                            <input type="text" /><p>Card number</p>
                        </div>
                        <div className='inputWrapper'>
                            <input type="text" /><p>Name on card</p>
                        </div>
                        <div className='inputWrapper inputHalf'>
                            <input type="text" /><p>Expiration date  (MM / YY)</p>
                        </div>
                        <div className='inputWrapper inputHalf'>
                            <input type="text" /><p>Security code</p>
                        </div>
                    </div>

                    <div className='checkoutDivider'></div>

                </div>
            </div>
            <div>
                <h3>Billing Address</h3>
                <p>Select the address that matches your card or payment method.</p>
                <div className='paymentWrapper'>
                    <div>
                        <div className='paymentOption billingOption'>
                            <input type="radio" />
                            <label htmlFor="creditCard"></label>
                            <p>Same as shipping address</p>
                        </div>
                        <div className='checkoutDivider'></div>
                        <div className='paymentOption billingOption'>
                            <input type="radio" />
                            <label htmlFor="creditCard"></label>
                            <p>Use a different billing address</p>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <h3>Remember me</h3>
                <div className='paymentWrapper'>

                    <div className='paymentOption billingOption'>
                        <input type="radio" />
                        <label htmlFor="creditCard"></label>
                        <p>Save my information for a faster checkout</p>
                    </div>
                </div>
            </div>
            <div className='shippingBottom'>
                <p onClick={nextStep}>Return to shipping</p>
                <button type="submit">Pay now</button>
            </div>
        </div>
    )
}

export default CheckoutPayment