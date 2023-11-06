import React from 'react'
import Add from "../Img/addAvatar.png"
import { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import {createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth ,storage,db} from '../firebase';
import {ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore"; 

const Register=()=> {
  const [err, setErr] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
 // const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

   const handleSubmit= async (e)=>{
    e.preventDefault()
    const displayName=e.target[0].value;
    const email=e.target[1].value;
    const password=e.target[2].value;
    const file=e.target[3].files[0];
    if (password.length < 6) {
      setPasswordError(true);
      return; 
    }

 try{

const res = await createUserWithEmailAndPassword(auth, email, password)
const storageRef = ref(storage, displayName);

const uploadTask = uploadBytesResumable(storageRef, file);

uploadTask.on(
  
  (error) => {
  setErr(true);
  }, 
  () => {

    getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
     // console.log('File available at', downloadURL);
     await updateProfile(res.user,{
      displayName,
      photoURL:downloadURL
     });
       
     await setDoc(doc(db,"users",res.user.uid),{
      uid: res.user.uid,
     displayName,
     email,
      photoURL: downloadURL,
     });

    await setDoc(doc(db,"userChats",res.user.uid),{});

    navigate("/");
    
    });
  }
);
 


  } catch(err){
      setErr(true);

}
    };
     
  return (
    <div className='body'>
    <div className='box'>
      <span className='borderLine'></span>
      <form onSubmit={handleSubmit}>
       <h2>Register</h2>
           <div className='inputBox'>
            <input 
              type='text' 
              placeholder='User Name'
              //value={displayName}
             // onChange={(e) => setDisplayName(e.target.value)}
              //className={styles.input}
            />
           
            <i></i>
       </div>
      <div className='inputBox'>
       <input 
              type='email' 
             placeholder='Enter email'
              //value={displayName}
             // onChange={(e) => setDisplayName(e.target.value)}
              //className={styles.input}
            />
            
            <i></i>
</div>
<div className='inputBox'>
<input 
              type='password' 
              placeholder='Enter password'
              //value={displayName}
             // onChange={(e) => setDisplayName(e.target.value)}
              //className={styles.input}
            />
            <i></i>
</div>
{passwordError && <span>Password must be at least 6 characters long</span>}
      
<div className='inputBox'>
<input style={{display:"none"}}type='file' id="file"
         /> 
         <label htmlFor='file'>
          <img src={Add} alt="" className='logo_register' />
          <span>Add Avatar</span>
         </label>
          
            <i></i>
   </div>
   
    <button className='submit1'>Sign up</button>
    {err && <span>Something went wrong</span>}
    <div className='links'>
     <p> Already have an account?<Link to='/Login'>login</Link> </p> 
      </div>
      </form>
    </div>
   </div>
  
);
};
export default Register


