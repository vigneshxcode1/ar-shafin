import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import './auth.css'

const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://ar-shafin-server.onrender.com/api/mosque/login", formData);
      alert(res.data.message);
      console.log(res.data)
      localStorage.setItem("token", res.data.token);
      localStorage.setItem('admin-id',res.data.adminId) 
      navigate('/dashbroad')
    } catch (error) {
      alert("Login failed");
    }
  };

  return (
    <form className="authform" onSubmit={handleSubmit}>
      <h2>Admin Login</h2>
      <input
        type="text"
        name="username"
        placeholder="Username"
        id="username"
        value={formData.username}
        onChange={handleChange}
        required
      />
      <input
        type="password"
        id="username"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        required
      />
      <button type="submit">Login</button>
      <br />
      <Link className="links" to={"/register"} >new user ? register</Link>
    </form>
  );
};

export default Login;
