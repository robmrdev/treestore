import React from 'react'
import { useState, useEffect } from 'react'
import {useLocation} from 'react-router-dom'

const ProductContainer = () => {
    const [listProducts, setListProducts] = useState([])

    useEffect(() => {
        fetchData();
    }, []);
    
    // const location = useLocation()
    // const path = '/'
    // const queryParams = new URLSearchParams(path.search)
    // const queryParam= queryParams.get('query')
    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:8080/getproducts')
            // console.log(queryParam)
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            // console.log(data)
            setListProducts(data.payload);
            // console.log(data.payload)
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const deleteItem = async (e) => {
        const productId = e.currentTarget.getAttribute('data-product-id');
        try {
            const response = await fetch(`http://localhost:8080/deleteProduct/${productId}`, {
                method: 'DELETE',
            });

            if (response.status === 200) {
                console.log('Producto eliminado con éxito');
                fetchData()
            }
            else {
                console.error('Error al eliminar el producto');
            }
        } catch (error) {
            console.error('Error al realizar la solicitud:', error);
        }
    }

    const { product, hasPrevPage, hasNextPage, prevPage, nextPage, limit, query } = listProducts


    
    return (
        <>
            <div class="productContainer" id="realTimeProducts">
                {listProducts != [] ?(
                    listProducts.map((prod) => {
                        return <div className="productCard" key={prod._id}>
                            <img src={`/img/${prod.category}${prod.thumbnail[prod.color[0]][0]}`} alt="" className="productImage" />
                            <span className="cardInfo">
                                <div className="cardLeft">
                                    <h3>{prod.title}</h3>
                                    <p>{prod.description}</p>
                                    <p>Code: {prod.code}</p>
                                </div>
                                <div className="cardRight">
                                    <p>{prod.price}</p>
                                    <p>Only {prod.stock} left!</p>
                                </div>
                            </span>
                            <span className="cardButtons">
                                <div>
                                    {Object.entries(prod.colorCode).map(([colorName, colorValue]) => (
                                        <div className="colorSelector" style={{ [colorValue.length < 15 ? "backgroundColor" : "background"]: colorValue }} key={colorName}></div>
                                    ))}
                                </div>
                                <button className="delete-product" data-product-id={prod._id} onClick={deleteItem}>Delete</button>
                            </span>
                        </div>
                    })
                    ):(<p>Cargando...</p>)}
            </div>
            <div className="pageButtons">
            {listProducts.hasPrevPage && (
                <a href={`/?page=${prevPage}&limit=${limit}&query=${query}`}>
                    <button>Anterior</button>
                </a>
            )}

            {listProducts.hasNextPage && (
                <a href={`/?page=${nextPage}&limit=${limit}&query=${query}`}>
                    <button>Siguiente</button>
                </a>
            )}
        </div>
        </>
    )
}

export default ProductContainer