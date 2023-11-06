import { useNavigate } from 'react-router-dom';
import './SideModal.css'
import Cookies from 'js-cookie';

import { jwtDecode } from 'jwt-decode';

const SideModal = ({ isOpen, onClose }) => {
  
  const navigate = useNavigate()
  let user = null
  if(localStorage.getItem('accessToken')) user = jwtDecode(localStorage.getItem('accessToken')).user
  const handleLogOut = () => {
    localStorage.removeItem('accessToken');
    navigate('/login');
  };

  const handleContainerClick = (e) => {
    e.stopPropagation();
  };
  if (!isOpen) return
  return (
    <div className='sideModal' onClick={onClose}>
      <div className='sideContainer' onClick={handleContainerClick}>
        <div>
          {user != null? <h3>Hello {user.firstName}</h3> : <h3>Hello Anonymus</h3>}
          <ul>
            <li onClick={() => navigate('login')}>Log in</li>
            <li onClick={handleLogOut}>Log out</li>
          </ul>
        </div>
        <img src="/img/resources/sideMenuTrees.webp" alt="" />
      </div>
    </div>
  )
}

export default SideModal