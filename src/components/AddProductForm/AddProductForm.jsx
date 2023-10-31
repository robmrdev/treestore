import React, { useState } from 'react';

const AddProductForm = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        thumbnail: {"blue": "/wool-fedora-1-dark-blue.webp"},
        code: '',
        price: '',
        stock: '',
        category: '',
        colorCode: {"blue": "blue"},
        color: 'blue'
    });

    const createProduct = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('https://treestoreback.up.railway.app/createProduct', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            // Hacer algo con la respuesta, si es necesario
            console.log('Respuesta:', data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <form onSubmit={createProduct}>
            <label htmlFor="title">title:</label>
            <input type="text" name="title" id="title" value={formData.title} onChange={handleInputChange} required />

            <label htmlFor="description">description:</label>
            <input type="text" name="description" id="description" value={formData.description} onChange={handleInputChange} required />

            {/* <label htmlFor="thumbnail">thumbnail:</label>
            <input type="text" name="thumbnail" id="thumbnail" value={formData.thumbnail} onChange={handleInputChange} required /> */}

            <label htmlFor="code">code:</label>
            <input type="text" name="code" id="code" value={formData.code} onChange={handleInputChange} required />

            <label htmlFor="price">price:</label>
            <input type="text" name="price" id="price" value={formData.price} onChange={handleInputChange} required />

            <label htmlFor="stock">stock:</label>
            <input type="text" name="stock" id="stock" value={formData.stock} onChange={handleInputChange} required />

            <label htmlFor="category">category:</label>
            <input type="text" name="category" id="category" value={formData.category} onChange={handleInputChange} required />
            
            {/* <label htmlFor="category">color:</label>
            <input type="text" name="color" id="color" value={formData.color} onChange={handleInputChange} required />
            
            <label htmlFor="category">colorCode:</label>
            <input type="text" name="colorCode" id="colorCode" value={formData.colorCode} onChange={handleInputChange} required /> */}

            <br />

            <button type="submit">Registrar</button>
        </form>
    );
};

export default AddProductForm;