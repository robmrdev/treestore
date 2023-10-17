import './MeetTheProducts.css'
import { useState, useEffect } from 'react';

const MeetTheProducts = () => {
    const [listProducts, setListProducts] = useState([])
    useEffect(() => {
        fetchData();
    }, []);
    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:8080/getAllProducts')
            // console.log(queryParam)
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setListProducts(data.payload);
        } catch (error) {
            console.error('Error:', error);
        }
    }
    const { product } = listProducts
    const newCategories = listProducts.map((prod) => {
        prod.category
    })
    // console.log(listProducts)

    const uniqueCategory = {}; // Para llevar un registro de las categorías
    const promotedCategory = [];

    for (const product of listProducts) {
        if (!uniqueCategory[product.category]) {
            uniqueCategory[product.category] = true; // Marcar la categoría como encontrada
            promotedCategory.push(product); // Agregar el producto al nuevo array
        }
    }

    return (
        <section className='meetProductsContainer'>
            <h2>Meet the Products</h2>
            <div className='meetProducts'>
                {listProducts != [] ? (
                    promotedCategory.map((prod) => {
                        return <div className='meetProductCard' key={prod._id}>
                            <img src={`/img/${prod.category}${prod.thumbnail[prod.color[0]][0]}`} alt={prod.title} />
                            <h4 className='meetProductInfo'>{prod.category}</h4>
                            <p className='meetProductInfo'>New Arrivals <img src="/img/resources/arrow-tree-right.svg" alt="" className='arrowIcon' /></p>
                        </div>
                    })
                ) : (<p>Cargando...</p>)}
            </div>
        </section>
    )
}

export default MeetTheProducts