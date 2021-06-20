import firebase from "firebase/app";
import "firebase/auth";
import React, { useState } from 'react';
import firebaseConfig from './firebase.config';

firebase.initializeApp(firebaseConfig);

const GoogleAuth = () => {
    const [user, setUser] = useState({
        isSignedIn: false,
        name: '',
        photo: '',
        email: '',
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
            console.log(errorMessage);
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


    return (
        <div>
                {
                    user.isSignedIn ? <button onClick={handleSignOut}>Sign Out</button> 
                    : <button onClick={handleSignIn}>Sign In with Google</button>
                }
                
                {
                    user.isSignedIn && <p>Wellcome {user.name} <img src={user.photo} alt="" height='50px' width='50px'/></p>  
                }
        </div>
    );
};

export default GoogleAuth;