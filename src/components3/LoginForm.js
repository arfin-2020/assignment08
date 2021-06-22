import firebase from "firebase/app";
import "firebase/auth";
import React, { useContext, useState } from 'react';
import { useHistory, useLocation } from "react-router-dom";
import { UserContext } from "../App";
import firebaseConfig from "../components2/firebase.config";

        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }else {
            firebase.app(); // if already initialized, use that one
        }

const LoginForm = () => {
    const [newUser,setNewUser] = useState(false);
    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };
    // const [nowUser, setNowUser] = useState(false);
    const [loggedInUser, setloggedInUser] = useContext(UserContext);
    const [user, setUser] = useState({
        isSignedIn: false,
        name: '',
        lastname:'',
        photo: '',
        email: '',
        password: '',
        error:'',
        success:'',
    })
    const provider = new firebase.auth.GoogleAuthProvider();
    
            const handleSignIn = () =>{
            firebase.auth().signInWithPopup(provider)
            .then((result) => {
            const credential = result.credential;
            const token = credential.accessToken;
            const {displayName,photoURL,email} = result.user;
            const isSignedInUser = {
                isSignedIn: true,
                name: displayName,
                photo: photoURL,
                email: email,
            }
            setUser(isSignedInUser);
            setloggedInUser(isSignedInUser)
            history.replace(from);
            // setUser({isSignedIn: true,
            //     name: displayName,
            //     photo: photoURL,
            //     email: email,});
            console.log('result',displayName,photoURL,email);
            
            // console.log('Token',token);
            // console.log('User',user.displayName);
            // console.log('emial',user.email);
            // console.log('photo',user.photoURL);
            // console.log('user',user);
            // ...
        }).catch((error) => {
            const errorMessage = error.message;
            console.log('Error Message',errorMessage);
        });
    }

    const handleSignOut = () => {
        firebase.auth().signOut()
        .then((result) => {
            const signOutUser ={
                isSignedIn: false,
                name: '',
                photo: '',
                email: '',
            }
            setUser(signOutUser);
            console.log(result);
          }).catch((error) => {
            console.log('error',error);
          });
          
    }
    const handleChange = (event) =>{
        // console.log(event.target.name,event.target.value);
        let isFieldValid = true;
        if(event.target.name === 'email'){
            isFieldValid = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(event.target.value);
        }
        if(event.target.name === 'password'){
            const isPasswordValidation = event.target.value.length > 8; 
            const passwordNumber = /\d{1}/.test(event.target.value);
            isFieldValid = (isPasswordValidation && passwordNumber);
        }
        if(isFieldValid){
            const userUpdateInfo ={...user};
            userUpdateInfo[event.target.name] = event.target.value;
            setUser(userUpdateInfo);
        }
    }
    const handleSubmit = (event) => {
            if(newUser && user.email && user.password){
                firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
                .then((userCredential) => {
                    // Signed in 
                    // const user = userCredential.user;
                    const newUserInfo={...user};
                    newUserInfo.error = '';
                    newUserInfo.success = true;
                    setUser(newUserInfo);
                    updateUserName(user.name);
                    // const {name, email} = userCredential.user;
                    // console.log('name:', name);
                    // console.log('email:', email);
                    console.log(user)
                })
                .catch((error) => {
                    const newUserInfo={...user};
                    newUserInfo.error = error.message;
                    newUserInfo.success = false;
                    setUser(newUserInfo);
                    // const errorCode = error.code;
                    // const errorMessage = error.message;
                    // console.log(errorMessage, errorCode);
                    // ..
                });
            }

            if(!newUser && user.email && user.password){
                firebase.auth().signInWithEmailAndPassword(user.email, user.password)
                .then((userCredential) => {
                  // Signed in
                  const user = userCredential.user;
                  const newUserInfo={...user};
                    newUserInfo.error = '';
                    newUserInfo.success = true;
                    setUser(newUserInfo);
                    setloggedInUser(newUserInfo);
                    history.replace(from);
                    console.log('Sign in userinfo', user);
                    
                })
                .catch((error) => {
                    const newUserInfo={...user};
                    newUserInfo.error = error.message;
                    newUserInfo.success = false;
                    setUser(newUserInfo);
                }); 
            }

            const updateUserName = (name)=>{
                const user = firebase.auth().currentUser;
                user.updateProfile({
                displayName: name,
                }).then((result) => {
                console.log('User name update successfully.');
                }).catch((error) => {
                console.log(error);
                });  
            }
            event.preventDefault();
    }


    return (
        <div>
                {
                    user.isSignedIn ? <button onClick={handleSignOut}>Sign Out</button> 
                    : <button onClick={handleSignIn}>Sign In with Google</button>
                }
                
                {
                    user.isSignedIn && <p>Wellcome {user.name} <img src={user.photo} alt="" height='50px' width='50px'/></p>  
                }

                <h1>Our Authentication...</h1>
                <input type='checkbox' onChange={()=>setNewUser(!newUser)} name='newUser'/>
                <label htmlfor='newUser'>New User SignUp </label>

                <p style={{color:'white',cursor: 'pointer'}} onClick={()=>setNewUser(!newUser)}>Create account</p>
                <button style={{color:'black'}} onClick={()=>setNewUser(!newUser)}>Create New Account</button>

                    {/* <h1>This is just for toggle practice........</h1>

                    <input type='checkbox' onChange = {()=>setNowUser(!nowUser)}name='nowUser'/>
                    <label htmlfor ='nowUser'>Register</label> */}

               <form onSubmit={handleSubmit}>
                        {/* <p>Your email: {user.email}</p>
                        <p>Your password: {user.password}</p>
                        <p>Your name: {user.name}</p>
                        <p>Your name: {user.lastname}</p> */}
                        
                        {newUser && <input type = 'text' name='name' onBlur={handleChange} placeholder='Enter your name' 
                        required/>}<br/><br/>
                        {newUser && <input type = 'text' name='lastname' onBlur={handleChange} placeholder='Enter your lastname' 
                        required/>} <br/><br/>
                        <input type="text" name='email' onBlur={handleChange} placeholder='Enter your Email' required/><br/><br/>
                        <input type="password" name='password' onBlur={handleChange} placeholder='Enter your password' required/><br/><br/>
                        <input type="submit" value={newUser ? 'SignUP' : 'SignIn'}/> 
                        
               </form>
                        
                        {
                            user.success ? <p style={{color:'green'}}>User {newUser ? 'Created' : 'Loggedin'} Successfully</p> : <p style={{color:'red'}}>{user.error}</p>
                        }
        </div>
    );
};

export default LoginForm;