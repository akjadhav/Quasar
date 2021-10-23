import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router'
import getSiteById from '../utils/getSiteById'

import { useHistory } from 'react-router'
import { auth } from '../utils/firebase'
import { Button } from '@mui/material'

export default function Home() {
    const [isAuth, setAuth] = useState(false)
    const history = useHistory()

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                setAuth(true)
            } else {
                history.replace("/")
            }
        })
        return unsubscribe
    }, [])

    const handleSignOut = () => {
        if (isAuth){
            auth
            .signOut()
            .then(() => {
                history.replace('/')
            })
            .catch(error => alert(error.message))
        }   
    }
    
    return (
        <div>
            {isAuth && <div>
                <Button onClick={handleSignOut}>Sign Out</Button>
                <h1>THIS IS THE HOMEPAGE</h1>
            </div>}
        </div>
    )
}