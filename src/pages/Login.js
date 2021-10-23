import React, {useState} from 'react'

export default function Home() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    /* useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                navigation.replace("Home")
            }
        })
        return unsubscribe
    }, []) */

    return (
        <div>
            <h1>THIS IS THE LOGIN</h1>
        </div>
    )
}