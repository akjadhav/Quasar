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
                history.push('/home')
            }
        })
        return unsubscribe
    }, [])

    const clearFields = () => {
        setEmail('')
        setPassword('')
    }

    const initializeUserData = () => {
        const unsubscribe = database
        .ref('users/'+ auth.currentUser.uid +'/scans/')
        .set({numScans: 0});
        return unsubscribe
    }

    const handleSignUp = () => {
        auth
          .createUserWithEmailAndPassword(email, password)
          .then(userCredentials=> {
              const user = userCredentials.user;
              alert("Account Created, Welcome!");
              clearFields();
              history.push('/home')
              //this gives the user data on Login
              initializeUserData();
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