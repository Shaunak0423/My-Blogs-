import React, { useContext, useState } from 'react'
import { AuthContext } from '../Common/AuthContext';
import { Link } from 'react-router-dom';
import '../Styles/Navbar/Navbar.css'
import { FaBars, FaTimes } from "react-icons/fa";

function Navbar() {
    const {user , logout} = useContext(AuthContext)
    console.log(user)

    const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

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

    <div className='menu_icon' onClick={toggleNavbar}>
          {isOpen ? <FaTimes size={25} /> : <FaBars size={25} />}
        </div>

     <div className={`mobile_nav ${isOpen ? 'open' : ''}`}>
        <nav className='mobile_nav_links'>
          <Link to="/" onClick={toggleNavbar}>All Blogs</Link>
          {user && <Link to="/my" onClick={toggleNavbar}>My Blogs</Link>}
          {user && <p>User: {user.username}</p>}
          {!user && (
            <>
              <Link to="/signup" onClick={toggleNavbar}>Signup</Link>
              <Link to="/login" onClick={toggleNavbar}>Login</Link>
            </>
          )}
          {user && (
            <button onClick={() => { logout(); window.location.href = "/"; }}>
              Logout
            </button>
          )}
        </nav>
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
