import React, { useContext, useState } from "react";
import axios from "axios";
// import { setToken } from "../auth";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Common/AuthContext";
import '../Styles/login.css'

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
    <div className="container">
      <div className="login_form_container">
    <form onSubmit={handleSubmit} className="login_form">
      <h2>Login</h2>
      <div className="lofi_inputs_labels">
        <label>User Name</label>
      <input name="username" placeholder="Username" onChange={handleChange} className="login_input_fields" />
      </div>
      <div className="lofi_inputs_labels">
        <label>Password</label>
      <input type="password" name="password" placeholder="Password" onChange={handleChange} className="login_input_fields" />
      </div>
      <button type="submit" className="login_button">Login</button>
    </form>
    </div>
    </div>
  );
}

export default Login;
