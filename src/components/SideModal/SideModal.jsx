import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SideModal.css'
import urlBack from '../../assets/utils.js';

const SideModal = ({isOpen,onClose}) => {
  const [user, setUser] = useState()
  const [accessToken, setAccessToken] = useState(localStorage.getItem('access_token'))
  const navigate = useNavigate()
  useEffect(() => {
    fetchData();
  }, user);
  const handleLogOut = () => {
    localStorage.removeItem('access_token')
    setAccessToken(null)
    setUser(null)
  };
  const fetchData = async () => {
    try {
      const response = await fetch(`${urlBack}api/auth/private`, {
        method: 'GET',
        headers: {
          'authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data.payload);
        setUser(data.payload)

      } else {
        console.error('Error:', response);
      }

      setAccessToken(localStorage.getItem('access_token'))
    } catch (error) {
      console.error('Error:', error);
    }
  }
  const handleContainerClick = (e) => {
    e.stopPropagation();
  };
  if (!isOpen) return
  return (
    <div className='sideModal' onClick={onClose}>
      <div className='sideContainer' onClick={handleContainerClick}>
        <div>
          {user ? <h3>Hello {user.name}</h3> : <h3>Hello Anonymus</h3>}
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