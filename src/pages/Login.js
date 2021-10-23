import React, { useState, useEffect } from 'react'
import {auth, database} from '../utils/firebase'
import { Redirect } from 'react-router'
import { TextField } from '@mui/material'

export default function Login() {
    const [email, setEmail] = useState('')
    console.log(email)
    const [password, setPassword] = useState('')
    
    /* if (authSucceeds) {
        return <Redirect to='/home'  />
    } */

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                <Redirect to='/home' />
            }
        })
        return unsubscribe
    }, [])

    const handleSignUp = () => {
        auth
          .createUserWithEmailAndPassword(email, password)
          .then(userCredentials=> {
              const user = userCredentials.user;

              //this gives the user data on Login
              // will need to instead pull Steelcase Data in the future
              //initializeUserData(user.uid);
          })
          .catch(error => alert(error.message))        
    }

    const handleLogin = () => {
        auth
          .signInWithEmailAndPassword(email, password)
          .then(userCredentials=> {
              const user = userCredentials.user;
          })
          .catch(error => alert(error.message))
    }

    const handleEmailInputChange = (e) => {
        setEmail(e.target.value)
    }

    const handlePasswordInputChange = (e) => {
        setPassword(e.target.value)
    }

    return (
        <div>
            <h1>THIS IS THE LOGIN</h1>
            <TextField value={email} label='Email' onChange={handleEmailInputChange}/>
            <TextField value={password} type='password' label='Password' onChange={handlePasswordInputChange}/>
            <p>test</p>
        </div>
    )
}