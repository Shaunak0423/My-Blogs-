import React, { useState } from "react";
import axios from "axios";
import '../Styles/signup.css'

function Signup() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://127.0.0.1:8000/api/users/signup/", form);
    alert("Signup successful! Please login.");
  };

  return (
    <div className="container">
    <div className="signup_main_container">
    <form onSubmit={handleSubmit} className="signup_form_main">
      <h2>Signup</h2>
      <div className="label_input">
      <label>User Name:</label>
      <input name="username" placeholder="Enter Your Username" onChange={handleChange} className="signup_input" />
      </div>
      <div className="label_input">
      <label>Email:</label>
      <input name="email" placeholder="Email" onChange={handleChange}  className="signup_input" />
      </div>
      <div className="label_input">
      <label>Password:</label>
      <input type="password" name="password" placeholder="Password" onChange={handleChange}  className="signup_input" />
      </div>
      
      <button type="submit" className="signup_button">Signup</button>
      
    </form>
    </div>
    </div>
  );
}

export default Signup;
