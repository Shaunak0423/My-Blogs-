import React, { useContext, useState } from "react";
import axios from "axios";
// import { setToken } from "../auth";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Common/AuthContext";

function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();
  const {login} = useContext(AuthContext)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post("http://127.0.0.1:8000/api/users/login/", form);

    const userData = res.data.user || null;
    const token = res.data.access;
    console.log(userData)

    if (token) {
      login(userData, token);
      navigate("/");
    } else {
      alert("Login failed: no token returned");
    }
  } catch (err) {
    console.error(err.response?.data || err.message);
    alert("Invalid credentials or server error");
  }
};


  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input name="username" placeholder="Username" onChange={handleChange} />
      <input type="password" name="password" placeholder="Password" onChange={handleChange} />
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;
