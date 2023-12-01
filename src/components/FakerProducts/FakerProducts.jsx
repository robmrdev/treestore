import './FakerProducts.css'
import React, { useEffect, useState } from 'react'
import urlBack from '../../assets/utils'

const FakerProducts = () => {
    useEffect(() => {
        fakerProducts()
    }, []);
    const [products, setProducts] = useState()
    const fakerProducts = async () => {
        const respuesta = await fetch(`${urlBack}api/users/mockingproducts`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        if (respuesta.ok) {
            const data = await respuesta.json();
            setProducts(data.payload)
        }
    }
    console.log(products)
    return (
        <>
        <h1 className='fakertitle'>THIS VIEW IS ONLY FOR TESTING PURPOSE USING FAKER</h1>
            <div>
                {products != undefined ? (products.map((prod) => (
                    <div key={prod.password}>
                        <h3>User: {prod.firstName} {prod.firstLastName}</h3>
                        <p>Email: {prod.email}</p>
                        <p>Age: {prod.age}</p>
                        <p>Password: {prod.password}</p>
                        <div>
                            <h4>Cart:</h4>
                            <div className='fakercart'>
                                {prod.carts.products.map((item) => (
                                    <div key={item.product}>
                                        <img src={item.thumbnail} className='fakerImg' />
                                        <p>{item.title}</p>
                                        <p>price: {item.price}</p>
                                        <p>quantity: {item.quantity}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))) : 'Cargando'}
            </div>
        </>
    )
}

export default FakerProducts