import React, { useState } from "react";
import axios from "axios";
import {Link, useNavigate} from 'react-router-dom'

const Register = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
const navigate =useNavigate();


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/api/mosque/register", formData);
      alert(res.data.message);
      navigate('/login')
    } catch (error) {
      alert("Registration failed");
    }
  };

  return (
    <form  className="authform"  onSubmit={handleSubmit}>
      <h2>Register Admin</h2>
      <input
        type="text"
        name="username"
        placeholder="Username"
        value={formData.username}
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        required
      />
      <button type="submit">Register</button>
      <Link className="links" to={"/login"}>already have account ?Login</Link>
    </form>
  );
};

export default Register;
