import './SideCartList.css'
import React, { useState, useEffect } from 'react';
import urlBack from '../../assets/utils';

const SideCartList = ({ cart, updateSideCartList, itemsDeleted, setCartSummary, onTotalChange }) => {
    const [productDetails, setProductDetails] = useState([]);

    useEffect(() => {
        // const loadProductDetails = async () => {
        //     const details = await Promise.all(
        //         cart.products.map(async (item) => {
        //             const productData = await fetchItem(item.product);
        //             return {
        //                 ...productData,
        //                 quantity: item.quantity
        //             };
        //         })
        //     );
        //     setProductDetails(details);
        // };
        // loadProductDetails();

    }, [cart, itemsDeleted]);
    // console.log(cart)
    const deleteItem = async (cid, id, color) => {
        try {
            const accessToken = localStorage.getItem('accessToken');
            const indexToDelete = cart.products.findIndex(p => p._id === id && p.color === color);
            if (indexToDelete !== -1) {
                cart.products.splice(indexToDelete, 1);
                const newCart = { products: cart.products, _id: cart._id };
                localStorage.setItem('provisionalCart', JSON.stringify(newCart));
            }
            updateSideCartList();
            if (!accessToken) {
                console.error('No Access Token found in localStorage');
                return;
            }
            const provisionalCart = localStorage.getItem('provisionalCart');
            if (provisionalCart) {
                document.cookie = 'provisionalCart=' + provisionalCart + '; path=/;';
            }
            console.log(document.cookie)
            const response = await fetch(`${urlBack}api/carts/deleteProduct/${cid}/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                    'Cookie': `provisionalCart=${provisionalCart}`
                },
                body: JSON.stringify(),
                credentials: 'include'
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json()
            localStorage.setItem('accessToken', data.payload);
            // localStorage.setItem('provisionalCart', JSON.stringify(provisionalCart));

        } catch (error) {
            console.error('Error:', error);
        }
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

    let total = 0;
    let totalQuantity = 0;

    useEffect(() => {

        cart.products.forEach(item => {
            total += item.price * item.quantity;
            totalQuantity += item.quantity;
        });
        onTotalChange(total, totalQuantity)
    }, [cart]);

// console.log(cart)

    return (
        <div className='sideCartInnerList'>
            {cart.products.map((product) => (
                <div key={product._id + product.color} className='sideCartProductCard'>
                    <img src={`${product.thumbnail}`} alt="" />
                    <div className='sideCartProductInfo'>
                        <div>
                            <p>{product.title}</p>
                            <p>{product.color}</p>
                            <p>{product.quantity}</p>
                        </div>
                        <div>
                            <p>${product.price}.00</p>
                            <i className='bx bx-trash-alt' onClick={() => deleteItem(cart._id, product._id, product.color)}></i>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default SideCartList;