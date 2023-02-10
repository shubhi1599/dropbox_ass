import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Auth = (props) => {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
    passwordCheck: ""
  })
  
  const handleChange = (e)=>{
    setInput((prevState)=>{
      return {...prevState,
      [e.target.name] : e.target.value}
    });
  }

  const sendRequest = async()=>{
    const res = await axios.post(`http://localhost:5000/authen/register`,{
      name: input.name,
      email: input.email,
      password: input.password,
      passwordCheck: input.passwordCheck
    })
    const data = await res.data;
    console.log(data);
    return data;
  }

  const handleSubmit = (e)=>{
    e.preventDefault();
    console.log(input);
    sendRequest().then(()=>props.setToLogin(true))
      .then(()=>navigate('/')).then(data=>console.log(data));
  }

  return(
    <div className='mainform'>
      <form id="fr" onSubmit={handleSubmit}>
        <h4>Welcome</h4>
        <label>Name: </label><br></br>
        <input type="text" name="name" onChange={handleChange} value={input.name}></input><br></br>
        <label>Email: </label><br></br>
        <input type="email" name="email" onChange={handleChange} value={input.email}></input><br></br>
        <label>Password: </label><br></br>
        <input type="password" name="password" onChange={handleChange} value={input.password}></input><br></br>
        <label>passwordCheck: </label><br></br>
        <input type="password" name="passwordCheck" onChange={handleChange} value={input.passwordCheck}></input><br></br>
        <button type="submit">Register</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <button onClick={()=>navigate('/login')}>Login</button>
      </form>
    </div>
  )
}

export default Auth;