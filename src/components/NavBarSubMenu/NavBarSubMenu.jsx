import './NavBarSubMenu.css'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const NavBarSubMenu = (props) => {
    const navigate = useNavigate()
    const menuDesc= {
        'womens':'New clothes, same mission: every piece is made to help to reduce emissions and restore our ecosystems.',
        'mens':'Our new arrivals are soft on your skin and the planet, so you can feel great in more ways than one.',
        'kids':"We've made sure everything you put on your little one is made with a footprint almost as small as theirs.",
        'accesories':'New clothes, same mission: every piece is made to help to reduce emissions and restore our ecosystems.'
    }
    const [listProducts, setListProducts] = useState([])
    useEffect(() => {
        fetchData();
    }, []);
    const handlePage = (newPage)=>{
        restartPage(newPage)
    }

    const {visib, cat, isOpen,restartPage} = props
    const visibility = { visibility: visib }
    const menuProducts = listProducts.filter(p=>p.category===cat)
    const shortCategory =(cat.charAt(0).toUpperCase() + cat.slice(1).slice(0, -1))
    
    const fetchData = async () => {
        try {
            const response = await fetch('https://treestoreback.up.railway.app/getAllProducts')
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            
            setListProducts(data.payload);
        } catch (error) {
            console.error('Error:', error);
        }
    }
    const uniqueSubCat = {}; 
    const menuCategory = [];

    for (const product of menuProducts) {
        if (!uniqueSubCat[product.subCategory]) {
            uniqueSubCat[product.subCategory] = true; 
            menuCategory.push(product.subCategory); 
        }
    }
    const subMenuImg = {backgroundImage: `url(/img/resources/menu/${cat}/menu-img.webp)`}
    if (!isOpen) return null;
    return (
        <div className='subMenuContainer' style={visibility}>
            <span className='subMenuLeft'>
                <div className="subMenuLeftInner">
                    <h3>Clothing</h3>
                    {menuCategory.map((i)=>{
                        return <div className="menuInnerLink" key={i} onClick={()=>{const encodedSubCat = (i).replace(/&/g, "and").replace(/ /g, "_");navigate(`/collections/${cat}/${encodedSubCat}`, { replace: true }); handlePage('1')}}>{i}</div>
                    })}
                </div>
                <div className="subMenuLeftInner">
                    <h3>Features</h3>
                    <div className="menuInnerLink">Example</div>
                    <div className="menuInnerLink">Example</div>
                    <div className="menuInnerLink">Example</div>
                    <div className="menuInnerLink">Example</div>
                    <div className="menuInnerLink">Example</div>
                    <div className="menuInnerLink">Example</div>
                    <div className="menuInnerLink">Example</div>
                    <div className="menuInnerLink">Example</div>
                </div>
            </span>
            <span className='subMenuRight'>
                <div className='subMenuImgContainer'>
                    <div className='subMenuImg' style={subMenuImg}>
                    </div>
                </div>
                <small>New Arrivals</small>
                {cat==='accesories'?(<strong>Accesories</strong>):(<strong>{shortCategory}'s Apparel</strong>)}
                
                <p>{menuDesc[cat]}</p>
                <a href={`/collections/${cat}`} className='menuButton'>
                    Shop New Arrivals
                </a>
            </span>
        </div>
    )
}

export default NavBarSubMenu