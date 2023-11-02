import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import './ProductView.css'
import urlBack from '../../assets/utils.js'

const ProductView = () => {
    const { title } = useParams()
    const [product, setProduct] = useState()
    useEffect(() => {
        fetchData();
    }, []);
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

    const [newDescription, setNewDescription] = useState('')
    const handleDescriptionChange = (event) => {
        // Manejar cambios en el campo de descripción
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

            // Vuelve a cargar los datos del producto después de la actualización
            fetchData();
        } catch (error) {
            console.error('Error:', error);
        }
    }






    // const actualColor = product.color[0]
    // console.log(product.thumbnail[actualColor])
    return (

        <div className='productViewContainer'>
            {product != undefined ? (
                <>
                    <div className='productViewImages'>
                        {product.thumbnail[product.color[0]].map((img) => {
                            return <img src={`../img/products/${product.category}${img}`} alt="" key={img} />
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
                            <i class='bx bxs-star'></i>
                            <i class='bx bxs-star'></i>
                            <i class='bx bxs-star'></i>
                            <i class='bx bxs-star'></i>
                            <i class='bx bxs-star'></i>
                        </span>
                        <div className='colorOptions'>
                            <p>Colours</p>
                            <span>
                                {Object.entries(product.colorCode).map(([colorName, colorValue]) => (
                                    <div className="colorSelector" style={{ [colorValue.length < 15 ? "backgroundColor" : "background"]: colorValue }} key={colorName}></div>
                                ))}
                            </span>
                            <p>Colour: {product.color[0]}</p>
                        </div>
                        <div className='productViewButtons'>
                            <div className='productViewAdd'>ADD TO BAG</div>
                            <div><i class='bx bx-heart productViewHeart' ></i></div>
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