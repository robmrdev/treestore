import './ProductListCategoryTop.css'
import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import urlBack from '../../assets/utils.js';

const ProductListCategoryTop = ({ query, setActualPage }) => {
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
        if (product.category != query) continue
        if (!uniqueCategory[product.subCategory]) {
            uniqueCategory[product.subCategory] = true;
            promotedCategory.push(product);
        }
    }
    return (
        <section className='ProductCategorySelectorTop'>
            {listProducts != [] ? (
                promotedCategory.map((prod) => {
                    const encodedSubCat = prod.subCategory.replace(/&/g, "and").replace(/ /g, "_")
                    return <NavLink to={`/collections/${prod.category}/${encodedSubCat}`} className='meetProductCard' key={prod._id} onClick={()=>setActualPage('1')}>
                        <img src={`/img/products/${prod.category}${prod.thumbnail[prod.color[0]][0]}`} alt={prod.title} />
                        <p className='meetProductInfo'>{prod.subCategory}<img src="/img/resources/arrow-tree-right.svg" alt="" className='arrowIcon' /></p>
                    </NavLink>
                })
            ) : (<p>Cargando...</p>)}
        </section>
    )
}

export default ProductListCategoryTop