import React from 'react'
import { Link ,useNavigate} from 'react-router-dom';
import { useState } from 'react';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth} from '../firebase';
const Login=()=>{
  const [err, setErr] = useState(false);
 // const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

   const handleSubmit= async (e)=>{
    e.preventDefault()
    const email=e.target[0].value;
    const password=e.target[1].value;

 try{
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/")

      } catch(err){
      setErr(true);
}
    };
return(
    <div className="body">
   
      <div className="box">
      <span className='borderLine'></span>
      <form onSubmit={handleSubmit}>
       <h2>Login</h2>
        <div className='inputBox'>
        <input
              type='email'
              placeholder='Enter email'
            />
            <i className='fas fa-at'></i>
        </div>
        <div className='inputBox'>
        <input 
              type='password'
              placeholder='Enter Password'
            />
             <i className='fas fa-key'></i>
            </div>
           
            <button className='submit1'>Sign in</button>
            <div className='links'>
      <p>Don't have an account? <Link to='/Register'>Register</Link></p>
      {err && <span>Something went wrong</span>}
          </div>
          </form>
      </div>
      </div>
    
  );
};

export default Login




