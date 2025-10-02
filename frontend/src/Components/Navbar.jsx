import React, { useContext } from 'react'
import { AuthContext } from '../Common/AuthContext';
import { Link } from 'react-router-dom';
import '../Styles/Navbar/Navbar.css'

function Navbar() {
    const {user , logout} = useContext(AuthContext)
    console.log(user)

    const handleScroll = () => 
{

  if (window.scrollY > 0) {
    document.getElementById('navbar_content_mobile').style.boxShadow = '0 2px 4px rgb(0 0 0 / 69%)';
    document.getElementById('navbar_content_mobile').classList.add('header_main_link_div');
} else {
  document.getElementById('header_main_div_id').style.boxShadow = 'none';
  document.getElementById('header_main_div_id').classList.remove('header_main_link_div');
}
}
  return (
    <>
    <div className='nav_bar_main'>
        <img alt='Logo'/>
      <nav className='navlinks_navbar'>
        <Link to="/" className='nav_link_items'>All Blogs</Link>
        {user && <Link to="/my" className='nav_link_items'>My Blogs</Link>}
        {user && <p className='nav_link_items'>UserName: {user.username}</p>}
        {!user && (
          <>
            <Link to="/signup" className='nav_link_items'>Signup</Link>
            <Link to="/login" className='nav_link_items'>Login</Link>
          </>
        ) }
      </nav>
      <div>
        {
            user && (
                <button onClick={() => { logout(); window.location.href = "/"; }}>
            Logout
          </button>
            )
        }
      
          </div>
    </div>


    {/* <div className='nav_bar_main_mobile'>
        <img alt='Logo'/>
        <div id='navbar_content_mobile'>
      <nav className='navlinks_navbar'>
        <Link to="/">All Blogs</Link>
        {user && <Link to="/my">My Blogs</Link>}
        {user && <p>UserName: {user.username}</p>}
        {!user && (
          <>
            <Link to="/signup">Signup</Link>
            <Link to="/login">Login</Link>
          </>
        ) }
      </nav>
      <div>
        {
            user && (
                <button onClick={() => { logout(); window.location.href = "/"; }}>
            Logout
          </button>
            )
        }
      
          </div>
          </div>
    </div> */}

    </>
  )
}

export default Navbar
