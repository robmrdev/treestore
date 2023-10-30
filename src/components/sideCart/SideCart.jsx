import { NavLink } from 'react-router-dom';
import './SideCart.css'
import { useEffect, useState } from 'react';

const SideCart = ({ cartOpen, cartClose }) => {
    const [user, setUser] = useState()
    const [product, setProduct] = useState()
    const [accessToken, setAccessToken] = useState(localStorage.getItem('access_token'))
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch(`http://localhost:8080/getproducts?query=accesories`)
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
    };
    if (!cartOpen) return
    return (
        <div className='sideModal cartModal' onClick={cartClose}>
            <div className='sideContainer cartContainer' onClick={handleContainerClick}>
                <div className='sideCartTitle'>
                    <h3>Your Cart</h3>
                    <i class='bx bx-x' onClick={cartClose}></i>
                </div>
                <div className='sideCartDivider'></div>
                <div className='sideCartInnerList'>
                    <h4>Your cart it's empty!</h4>
                    <p>Add your favorite items to your cart.</p>
                    <div className='cartButtons'>
                        <div className='buttonGreen'><NavLink to="/collections/womens" onClick={cartClose}>Shop Women's</NavLink></div>
                        <div className='buttonGreen'><NavLink to="/collections/mens" onClick={cartClose}>Shop Mens's</NavLink></div>
                    </div>
                </div>
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
            </div>
        </div>
    )
}

export default SideCart