import React , {useContext} from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AllBlogs from "./Pages/AllBlogs";
import MyBlogs from "./Pages/MyBlogs";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
// import { isLoggedIn, removeToken } from "./auth";
import { AuthContext } from "./Common/AuthContext";
import Navbar from "./Components/Navbar";

function App() {
  const {user, Logout} = useContext(AuthContext)
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<AllBlogs />} />
        <Route path="/my" element={user ? <MyBlogs /> : <Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;

