import React from 'react'

const newOrder = () => {
    const order = JSON.parse(localStorage.getItem('lastOrder'))
    return (
        <>
            <div>Order Completed</div>
            <p>Order Code: {order.code}</p>
            <p>Order Date: {order.purchase_dateTime}</p>
            <p>User: {order.email}</p>
            <p>Products:</p>
            {order.products.map(p=> <p key={p._id}>{p._id}</p>)}
            <p>Total Payed: {order.amount + 20}</p>
        </>
    )
}

export default newOrder