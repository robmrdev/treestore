import './ProductList.css'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import urlBack from '../../assets/utils.js';

const ProductList = ({ products, query, nextPage, prevPage, hasPrevPage, hasNextPage, subCatRef }) => {
    const [listProducts, setListProducts] = useState();
    const navigate = useNavigate()

    useEffect(() => {
        fetchData();
    }, [query]);

    const fetchData = async () => {
        try {
            const response = await fetch(`${urlBack}getproducts?query=${query}`)
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setListProducts(data.payload.product);
        } catch (error) {
            console.error('Error:', error);
        }
    }
    const filters = [];
    function getCategories(products) {
        products.map((p) => {
            if (!filters.includes(p.subCategory)) {
                filters.push(p.subCategory);
            }
        });
    }

    if (listProducts != undefined) {
        getCategories(listProducts);
    }
    return (
        <>
            <div className='productAndFilters'>
                <div className='productListFilters'>
                    <ul>
                        {query === 'accesories' ? (
                            <li><NavLink to={`/collections/${query}/`} onClick={() => subCatRef('')}>All Accesories</NavLink></li>
                        ) : (<li><NavLink to={`/collections/${query}/`} onClick={() => subCatRef('')}>All Clothing</NavLink></li>)}
                        {filters.map((filter) => {
                            const encodedSubCat = (filter).replace(/&/g, "and").replace(/ /g, "_")
                            return <li key={filter} onClick={() => { subCatRef(filter) }}><NavLink to={`/collections/${query}/${encodedSubCat}`}>{filter}</NavLink></li>
                        })}
                    </ul>
                </div>
                <div className="productListContainer">
                    {products != undefined ? (
                        products.map((prod) => {
                            const titleRef = prod.title.replace(/ /g, "-")

                            return <NavLink to={`/products/${titleRef}`} className="productCard" key={prod._id}>
                                <div>

                                    <img src={`/img/products/${prod.category}${prod.thumbnail[prod.color[0]][0]}`} alt="" className="productImage" />
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
                                        {/* <button className="delete-product" data-product-id={prod._id} onClick={deleteItem}>Delete</button> */}
                                    </span>
                                </div>
                            </NavLink>
                        })
                    ) : (<p>Cargando...</p>)}
                </div>
            </div >
            <div className="pageButtons">
                {hasPrevPage && (
                    <button onClick={prevPage}>Anterior</button>
                )}

                {hasNextPage && (
                    <button onClick={nextPage}>Siguiente</button>
                )}
            </div>
        </>
    )
}

export default ProductList