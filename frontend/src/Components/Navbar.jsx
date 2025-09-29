import React, { useContext } from 'react'
import { AuthContext } from '../Common/AuthContext';
import { Link } from 'react-router-dom';
import '../Styles/Navbar/Navbar.css'

function Navbar() {
    const {user , logout} = useContext(AuthContext)
    console.log(user)
  return (
    <div className='nav_bar_main'>
        <img alt='Logo'/>
      <nav>
        <Link to="/">All Blogs</Link>
        {user && <Link to="/my">My Blogs</Link>}
        {user && <p>{user.username}</p>}
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
  )
}

export default Navbar
