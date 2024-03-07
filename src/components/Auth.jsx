import {useState} from "react";
import  {createUserWithEmailAndPassword, signInWithPopup} from 'firebase/auth';
import {auth, googleProvider} from "../config/firebase.js";

export const Auth = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signIn = async () => {
        await createUserWithEmailAndPassword(auth, email, password);
    }

    const signInWithGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider)
        } catch (error) {
            console.error(error);
        }
    }


    return (
        <div>
            <input onChange={(ev) => setEmail(ev.target.value)} placeholder={"Email..."}/>
            <input onChange={(ev) => setPassword(ev.target.value)} placeholder={"Password..."}/>
            <button onClick={signIn}>Sign in</button>

            <button onClick={signInWithGoogle} className={"bg-blue"}>
                Sign in with google
            </button>

        </div>
    )
}
