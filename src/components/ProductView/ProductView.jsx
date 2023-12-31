import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode';
import './ProductView.css'
import urlBack from '../../assets/utils.js'

const ProductView = () => {
    const { title } = useParams()
    const [product, setProduct] = useState()
    const initialColor = product && product.color && product.color.length > 0 ? product.color[0] : null;
    const [actualColor, setActualColor] = useState(initialColor)
    let user = null
    if (localStorage.getItem('accessToken')) user = jwtDecode(localStorage.getItem('accessToken')).user
    useEffect(() => {
        fetchData();
    }, []);
    useEffect(() => {
        if (product && product.color && product.color.length > 0) {
            setActualColor(product.color[0]);
        }
    }, [product]);

    const fetchData = async () => {
        try {
            const response = await fetch(`${urlBack}getProduct/${title}`)
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setProduct(data.payload);
        } catch (error) {
            console.error('Error:', error);
        }
    }

    // let provisionalCart;
    // if (user === null) {
    let provisionalCart = JSON.parse(localStorage.getItem('provisionalCart')) || {
        products: []
        // };
    }

    const handleAddToBag = async () => {
        const existingProductIndex = provisionalCart.products.findIndex(p => p._id === product._id && p.color === actualColor);

            if (existingProductIndex !== -1) {
                provisionalCart.products[existingProductIndex].quantity += 1;
            } else {
                provisionalCart.products.push({
                    _id: product._id,
                    quantity: 1,
                    price: product.price,
                    title: product.title,
                    color: actualColor,
                    thumbnail: `../img/products/${product.category}${product.thumbnail[actualColor][0]}`
                });
            }
            localStorage.setItem('provisionalCart', JSON.stringify(provisionalCart));
        const accessToken = localStorage.getItem('accessToken');
        let tryURL
        if (product != undefined && user != null) {
            tryURL = `${urlBack}api/carts/${user.carts[0].cart._id}/products/${product._id}`
            const provisionalCart = localStorage.getItem('provisionalCart');
            if (provisionalCart) {
                document.cookie = 'provisionalCart=' + provisionalCart + '; path=/;';
            }
            const response = await fetch(tryURL, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                    'Cookie': `provisionalCart=${provisionalCart}`,
                },
                body: JSON.stringify(),
                credentials: 'include'
            })
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json()
            localStorage.setItem('accessToken', data.payload);
        } else {
            // const existingProductIndex = provisionalCart.products.findIndex(p => p._id === product._id && p.color === actualColor);

            // if (existingProductIndex !== -1) {
            //     provisionalCart.products[existingProductIndex].quantity += 1;
            // } else {
            //     provisionalCart.products.push({
            //         _id: product._id,
            //         quantity: 1,
            //         price: product.price,
            //         title: product.title,
            //         color: actualColor,
            //         thumbnail: `../img/products/${product.category}${product.thumbnail[actualColor][0]}`
            //     });
            // }
            // localStorage.setItem('provisionalCart', JSON.stringify(provisionalCart));
        }
    };





    const [newDescription, setNewDescription] = useState('')
    const handleDescriptionChange = (event) => {
        setNewDescription(event.target.value);
    }
    const handleUpdateDescription = async () => {
        try {
            const response = await fetch(`${urlBack}updatedesc/${product._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ largeDescription: newDescription }),
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            fetchData();
        } catch (error) {
            console.error('Error:', error);
        }
    }

    return (

        <div className='productViewContainer'>
            {product != undefined ? (
                <>
                    <div className='productViewImages'>
                        {product.thumbnail && product.thumbnail[actualColor] && product.thumbnail[actualColor].map((img) => {
                            return <img src={`../img/products/${product.category}${img}`} alt="" key={img} />;
                        })}
                    </div>
                    <div className='productViewInfo'>
                        <div className='productViewHeader'>
                            <span className='productViewTitleAndDesc'>
                                <h4>{product.title}</h4>
                                <span>{product.description}</span>
                            </span>
                            <span className='productViewPrice'>
                                ${product.price}.00
                            </span>
                        </div>
                        <span className='productViewRate'>
                            <i className='bx bxs-star'></i>
                            <i className='bx bxs-star'></i>
                            <i className='bx bxs-star'></i>
                            <i className='bx bxs-star'></i>
                            <i className='bx bxs-star'></i>
                        </span>
                        <div className='colorOptions'>
                            <p>Colours</p>
                            <span>
                                {Object.entries(product.colorCode).map(([colorName, colorValue]) => (
                                    <div className="colorSelector" style={{ [colorValue.length < 15 ? "backgroundColor" : "background"]: colorValue }} key={colorName} onClick={() => setActualColor(colorName)}></div>
                                ))}
                            </span>
                            <p>Colour: {actualColor}</p>
                        </div>
                        <div className='productViewButtons'>
                            <div className='productViewAdd' onClick={handleAddToBag}>ADD TO BAG</div>
                            <div><i className='bx bx-heart productViewHeart'></i></div>
                        </div>
                        <div>
                            <h4>Meet the product</h4>
                            <p>{product.largeDescription}</p>
                        </div>


                        {/* <div className='productViewDescriptionUpdate'>
                            <h4>Update Description</h4>
                            <textarea
                                rows="4"
                                cols="50"
                                value={newDescription}
                                onChange={handleDescriptionChange}
                                placeholder="Enter new description"
                            />
                            <button onClick={handleUpdateDescription}>Update Description</button>
                        </div> */}


                    </div>
                </>
            ) : (<p>Cargando...</p>)}
        </div>
    )
}

export default ProductView