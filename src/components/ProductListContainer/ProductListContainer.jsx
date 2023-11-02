import './ProductListContainer.css'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import ProductList from '../ProductList/ProductList';
import ProductListCategoryTop from '../ProductListCategoryTop/ProductListCategoryTop';
import urlBack from '../../assets/utils.js';

const ProductListContainer = ({ actualPage, setActualPage }) => {
    const { collection, subCat } = useParams();
    const [listProducts, setListProducts] = useState([])
    const [subCatRef, setSubCatRef] = useState(subCat)
    const [limit, setLimit] = useState('6')
    
    useEffect(() => {
        fetchData();
    }, [limit, actualPage, subCatRef, collection, subCat]);
    const fetchData = async () => {
        try {
            const response = await fetch(`${urlBack}getproducts?query=${collection}&limit=${limit}&page=${(actualPage != undefined)? actualPage : 1}&subCat=${(subCat != undefined) ? subCat : ''}`)
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setListProducts(data.payload);
        } catch (error) {
            console.error('Error:', error);
        }
    }

    // const deleteItem = async (e) => {
    //     const productId = e.currentTarget.getAttribute('data-product-id');
    //     try {
    //         const response = await fetch(`${urlBack}deleteProduct/${productId}`, {
    //             method: 'DELETE',
    //         });

    //         if (response.status === 200) {
    //             console.log('Producto eliminado con éxito');
    //             fetchData()
    //         }
    //         else {
    //             console.error('Error al eliminar el producto');
    //         }
    //     } catch (error) {
    //         console.error('Error al realizar la solicitud:', error);
    //     }
    // }
    
    const { product, hasPrevPage, hasNextPage, prevPage, nextPage } = listProducts
    
    return (
        <>
            <ProductListCategoryTop query={collection} setActualPage={setActualPage}/>
            <div className='product'>
                <ProductList
                    products={product}
                    query={collection}
                    subCatRef={(cat) => { setSubCatRef(cat.replace(/ /g, "_").replace(/&/g, "and")); setActualPage('1') }}
                    nextPage={() => setActualPage(nextPage)}
                    prevPage={() => setActualPage(prevPage)}
                    hasPrevPage={hasPrevPage}
                    hasNextPage={hasNextPage}
                />
            </div>
        </>
    )
}

export default ProductListContainer