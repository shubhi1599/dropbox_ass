import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Login = (props) => {

    const navigate = useNavigate();
    const [input, setInput] = useState({
      email: "",
      password: "",
    })

    const handleChange = (e)=>{
        setInput((prevState)=>{
          return {...prevState,
          [e.target.name] : e.target.value}
        });
      }

    const sendRequest = async()=>{
    const res = await axios.post(`http://localhost:5000/authen/login`,{
        email: input.email,
        password: input.password,
    })
    const data = await res.data;
    console.log(data);
    return data;
    }

    const handleSubmit = (e)=>{
    e.preventDefault();
    console.log(input);
    sendRequest().then((data)=>localStorage.setItem("auth-token", data.token))
    .then((data)=>localStorage.setItem("userId", data.user._id))
      .then(()=>props.setToLogin(true))
      .then(()=>navigate('/')).then(data=>console.log(data));
    } 

  return (
    <div className='mainform'>
    <form id="fr" onSubmit={handleSubmit}>
      <h4>Welcome</h4>
      <label>Email: </label><br></br>
      <input type="email" name="email" onChange={handleChange} value={input.email}></input><br></br>
      <label>Password: </label><br></br>
      <input type="password" name="password" onChange={handleChange} value={input.password}></input><br></br>
      <button type="submit">Login</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <button onClick={()=>navigate('/')}>Signup</button>
    </form>
  </div>
  )
}

export default Login
