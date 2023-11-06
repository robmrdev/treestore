import './SideCartList.css'
import React, { useState, useEffect } from 'react';
import urlBack from '../../assets/utils';

const SideCartList = ({ cart, updateSideCartList, itemsDeleted, setCartSummary, onTotalChange }) => {
    const [productDetails, setProductDetails] = useState([]);

    useEffect(() => {
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
        loadProductDetails();

    }, [cart, itemsDeleted]);



    const deleteItem = async (cid, id) => {
        try {
            const accessToken = localStorage.getItem('accessToken');

            if (!accessToken) {
                console.error('No Access Token found in localStorage');
                return;
            }

            const response = await fetch(`${urlBack}api/carts/deleteProduct/${cid}/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
                body: JSON.stringify(),
                credentials: 'include'
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json()
            localStorage.setItem('accessToken', data.payload);
            updateSideCartList();

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

        productDetails.forEach(item => {
            total += item.price * item.quantity;
            totalQuantity += item.quantity;
        });
        // Actualizar el estado con los resultados
        onTotalChange(total, totalQuantity)
    }, [productDetails]);




    return (
        <div className='sideCartInnerList'>
            {productDetails.map((product) => (
                <div key={product._id} className='sideCartProductCard'>
                    <img src={`../img/products/${product.category}/${product.thumbnail[product.color[0]][0]}`} alt="" />
                    <div className='sideCartProductInfo'>
                        <div>
                            <p>{product.title}</p>
                            <p>{product.color[0]}</p>

                            <p>{product.quantity}</p>
                        </div>
                        <div>
                            <p>${product.price}.00</p>
                            <i className='bx bx-trash-alt' onClick={() => deleteItem(cart._id, product._id)}></i>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default SideCartList;