
import './App.css'
import ProductContainer from './components/ProductContainer/ProductContainer';
import AddProductForm from './components/AddProductForm/AddProductForm';
import { Router } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import MainHero from './components/MainHero/MainHero';
import MeetTheProducts from './components/MeetTheProducts/MeetTheProducts';


function App() {


  return (
    <>
      <NavBar />
      <main>
        <MainHero />
        <MeetTheProducts />
        {/* <Router> */}
        <ProductContainer />
        <AddProductForm />
        {/* </Router> */}

      </main>
    </>
  )
}

export default App
