import './Register.css'

const Register = () => {
    const handleSubmit = async e => {

        e.preventDefault()
        const formRegister = e.target;
        const datos = {
            name: formRegister[0].value,
            email: formRegister[1].value,
            password: formRegister[2].value,
        }
        console.log("DATOS");
        console.log(datos);

        const respuesta = await fetch('https://treestoreback.up.railway.app/api/auth/register', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datos)
        });

        const content = await respuesta.json();

        console.log(content);

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
                <label htmlFor='name'>Name:</label>
                <input type="text" name='name' id='name' required />

                <label htmlFor='email'>Email:</label>
                <input type="email" name='email' id='email' required />

                <label htmlFor='password'>Password:</label>
                <input type="password" name='password' id='password' required />

                <button type="submit">Register</button>
            </form>
        </section>
    )
}

export default Register