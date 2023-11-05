import { NavLink } from 'react-router-dom';
import './MeetTheProducts.css'
import { useState, useEffect } from 'react';
import urlBack from '../../assets/utils.js';

const MeetTheProducts = ({setActualPage}) => {
    const [listProducts, setListProducts] = useState([])
    useEffect(() => {
        fetchData();
    }, []);
    const fetchData = async () => {
        try {
            const response = await fetch(`${urlBack}getAllProducts`)
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setListProducts(data.payload);
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const uniqueCategory = {}; 
    const promotedCategory = [];

    for (const product of listProducts) {
        if (!uniqueCategory[product.category]) {
            uniqueCategory[product.category] = true; 
            promotedCategory.push(product); 
        }
    }


    return (
        <section className='meetProductsContainer'>
            <h2>Meet the Products</h2>
            <div className='meetProducts'>
                {listProducts != [] ? (
                    promotedCategory.map((prod) => {
                        return <NavLink  to={`/collections/${prod.category}`}  className='meetProductCard' key={prod._id} onClick={()=>setActualPage('1')}>
                            <img src={`/img/products/${prod.category}${prod.thumbnail[prod.color[0]][0]}`} alt={prod.title} />
                            <h4 className='meetProductInfo'>{prod.category}</h4>
                            <p className='meetProductInfo'>New Arrivals <img src="/img/resources/arrow-tree-right.svg" alt="" className='arrowIcon' /></p>
                        </NavLink>
                    })
                ) : (<p>Cargando...</p>)}
            </div>
        </section>
    )
}

export default MeetTheProducts