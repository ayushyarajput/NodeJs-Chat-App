import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
import { registerRoute } from '../utils/APIRoutes';

function Register() {
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const handleSubmit = async (event) => {
    event.preventDefault();
    if(handleValidation()){
      const {password, confirmPassword, username, email} = values;
      const {data} = await axios.post(registerRoute, {username, email, password,})
    }
  };
  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };
  const handleValidation = () => {
    const { password, confirmPassword, username, email } = values;
    if (password !== confirmPassword) {
      toast.error(
        "Password and confirm password should be same.",
        toastOptions
      );
      return false;
    } else if (username.length < 3) {
      toast.error(
        "Username should be greater than 3 characters.",
        toastOptions
      );
      return false;
    } else if (password.length < 8) {
      toast.error(
        "Password should be equal or greater than 8 characters.",
        toastOptions
      );
      return false;
    } else if (email === "") {
      toast.error("Email is required.", toastOptions);
      return false;
    }
    return true;
  };
  return (
    <>
      <form onSubmit={(event) => handleSubmit(event)}>
        <div className="brand">
          <h1>
            ChatApp
          </h1>
        </div>
        <input type="text" placeholder='Username' name='username' onChange={(e) => handleChange(e)} /><br></br><br></br>
        <input type="email" placeholder='Email' name='email' onChange={(e) => handleChange(e)} /><br></br><br></br>
        <input type="password" placeholder='Password' name='password' onChange={(e) => handleChange(e)} /><br></br><br></br>
        <input type="password" placeholder='Confirm Password' name='confirmPassword' onChange={(e) => handleChange(e)} /><br></br><br></br>
        <button type="submit">Create Account</button><br></br><br></br>
        <span>Already Registered ? <Link to="/login">Login</Link></span>
      </form>
      <ToastContainer />
    </>
  );
}

export default Register