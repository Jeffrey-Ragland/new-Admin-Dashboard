import React, { useState } from 'react'
import { FaUserAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import '../Logins/Login.css';
const Login = () => {

  const [Project, setProject] = useState('');
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
 
  const LoginSubmit=async(event) =>{
    event.preventDefault(); 
    try {

      const response = await fetch('http://34.93.162.58:4000/sensor/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ Project, Email, Password }),
        });
        const data = await response.json();
        if(data.token){
          const tokenRole = JSON.stringify({
            token:data.token,
            role:data.role
          });
          localStorage.setItem('Project',Project); // for admin dashboard
          localStorage.setItem('token',tokenRole);
          console.log("result.data.redirectUrl",data.redirectUrl);
          localStorage.setItem('Controles',data.redirectUrl); // for routing
          localStorage.setItem("projectNumber", data.projectNumber); // for demokit
          window.location.href='/'
        }
        else{
          window.alert('Invalid Credentials!');
        }
  } catch (error) {
      console.error(error);
  }
  }
  
  return (
    <div className="Login_body">
      <div className="wrapper">
        <form onSubmit={LoginSubmit}>
          <h1>Login</h1>
          <div className="input-box">
            <input
              type="text"
              id="project"
              placeholder="Project"
              value={Project}
              onChange={(e) => setProject(e.target.value)}
              required
            ></input>
            <FaUserAlt className="icon" />
          </div>
          <div className="input-box">
            <input
              type="text"
              id="username"
              placeholder="UserId"
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
              required
            ></input>
            <MdEmail className="icon" />
          </div>
          <div className="input-box">
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={Password}
              onChange={(e) => setPassword(e.target.value)}
              required
            ></input>
            <RiLockPasswordFill className="icon" />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default Login
