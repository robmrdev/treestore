import './LoginPage.css'

const LoginPage = () => {
const handleLogin = async e => {

  e.preventDefault()
  const formLogin = e.target

  const datos = {
    email: formLogin[0].value,
    password: formLogin[1].value,
  }

  const respuesta = await fetch('http://localhost:8080/api/auth/login', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(datos)
  });

  const content = await respuesta.json();

  const { access_token } = content;

  if (access_token) {
    localStorage.setItem("access_token", access_token);
    // location.href = '/'
  } else {
    // location.href = '/login.html'
  }
}
    return (
        <section className='mainLoginContainer'>
            <div className='mainContainerLeft'>
                <h1>Log in</h1>
                <div className='loginFacebook'>
                    <span>Connect with Facebook</span>
                    <i class='bx bxl-facebook' ></i>
                </div>
                <div className='loginGoogle'>
                    <p>Connect with Google</p>
                    <i class='bx bxl-google' ></i>
                </div>
                <div className='loginAmazon'>
                    <p>Connect with Amazon</p>
                    <i class='bx bxl-amazon' ></i>
                </div>
                <form onSubmit={handleLogin}>
                    <div className='loginInputs'>
                        <input type="email" placeholder='Email' />
                        <div className='passwordWrapper'>
                            <i class='bx bx-lock-alt'></i>
                            <input type="text" placeholder='Password' />
                            <i class='bx bx-low-vision'></i>
                        </div>
                    </div>
                    <button type='submit'>Sign in</button>
                    <div className='loginBottom'>
                        <div>
                            <p>Don't you have an Account?</p>
                            <div>
                                <p>SIGN UP</p>
                                <img src="/img/resources/arrow-tree-right.svg" alt="" className='arrowIcon' />
                            </div>
                        </div>
                        <p>Password Help?</p>
                    </div>
                </form>
            </div>
            <div className='mainContainerRight'>
                <img src="./img/resources/loginTrees.avif" alt="" />
                <h3>Get your own <br/> Interactive virtual forest</h3>
                <p>Register trees and get your own virtual forest island that will change as you plant</p>
                <a href="#">Get your impact wallet<div className='arrowIcon'/></a>
            </div>
        </section>
    )
}

export default LoginPage