import React, { useState, useEffect } from 'react'
import {auth, database} from '../utils/firebase'
import { Redirect, useHistory } from 'react-router'
import { TextField, Button } from '@mui/material'
import NavBar from '../components/NavBar'

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
            <NavBar />
            <div className="grid grid-cols-2 gap-10 h-10/12 m-40">
              <div>
                <img
                  src="https://images.unsplash.com/photo-1485217988980-11786ced9454?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80"
                  className="h-full object-cover rounded"
                />
              </div>
            
              <div>
                <div className="h-full justify-center items-center align-middle grid grid-cols-1 gap-0">
                <h2 className="text-2xl font-medium tracking-tight text-center text-gray-900">Sign In</h2>
                  <TextField value={email} label='Email' onChange={handleEmailInputChange}/>
                  <TextField value={password} type='password' label='Password' onChange={handlePasswordInputChange}/>
                  <Button onClick={handleSignUp}>Register</Button>
                  <Button onClick={handleLogIn}>Login</Button>
                </div>
              </div>
            </div>
        </div>
    )
}