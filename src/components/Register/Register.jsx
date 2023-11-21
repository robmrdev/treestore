import './Register.css'
import urlBack from '../../assets/utils.js'

const Register = () => {
    const handleSubmit = async e => {

        e.preventDefault()
        const formRegister = e.target;
        const datos = {
            firstName: formRegister[0].value,
            lastName: formRegister[1].value,
            email: formRegister[2].value,
            age: formRegister[3].value,
            password: formRegister[4].value,
        }

        const respuesta = await fetch(`${urlBack}api/auth/register`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datos)
        });
        // if (respuesta.ok) console.log('Register Ok')
        const content = await respuesta.json();
        const { access_token } = content;

        if (access_token) {
            localStorage.setItem("access_token", access_token);
            // location.href = '/private'
        } else {
            // location.href = '/register'
        }
    }

    return (
        <section className='registerForm' onSubmit={handleSubmit}>
            <form>
                <label htmlFor='firstName'>First Name:</label>
                <input type="text" name='firstName' id='firstName' required />

                <label htmlFor='lastName'>Last Name:</label>
                <input type="text" name='lastName' id='lastName' required />
                
                <label htmlFor='email'>Email:</label>
                <input type="email" name='email' id='email' required />
                
                <label htmlFor='age'>Age:</label>
                <input type="number" name='age' id='age' required />

                <label htmlFor='password'>Password:</label>
                <input type="password" name='password' id='password' required />

                <button type="submit">Register</button>
            </form>
        </section>
    )
}

export default Register