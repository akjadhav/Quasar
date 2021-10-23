import React, { useState, useEffect } from 'react'
import {auth, database} from '../utils/firebase'
import { Redirect, useHistory } from 'react-router'
import { TextField, Button } from '@mui/material'

export default function Login() {
    const history = useHistory()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                <Redirect to='/home' />
            }
        })
        return unsubscribe
    }, [])

    const clearFields = () => {
        setEmail('')
        setPassword('')
    }

    const handleSignUp = () => {
        auth
          .createUserWithEmailAndPassword(email, password)
          .then(userCredentials=> {
              const user = userCredentials.user;
              alert("Account Created, Welcome!");
              clearFields();
              <Redirect push to='/home' />
              //this gives the user data on Login
              // will need to instead pull Steelcase Data in the future
              //initializeUserData(user.uid);
          })
          .catch(error => alert(error.message))        
    }

    const handleLogIn = () => {
        auth
        .signInWithEmailAndPassword(email, password)
        .then(userCredentials=> {
            const user = userCredentials.user;
            alert("Logged In, Welcome!")
            clearFields();
            history.push('/home')
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
            <Button onClick={handleSignUp}>Register</Button>
            <Button onClick={handleLogIn}>Login</Button>
        </div>
    )
}