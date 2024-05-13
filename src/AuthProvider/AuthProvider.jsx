

import { GithubAuthProvider, GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import auth from "../firebase/Firebase.config";
import axios from "axios";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentRoom, setCurrentRoom] = useState({});


    // user create
    const register = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    };

    // login with google
    const googleProvider = new GoogleAuthProvider();
    const signInGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider)
    }

    // login with github
    const githubProvider = new GithubAuthProvider();
    const signInGithub = () => {
        setLoading(true);
        return signInWithPopup(auth, githubProvider);
    }

    // login user
    const login = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    };

    // logOut
    const logOut = () => {
        setLoading(true);
        return signOut(auth)
    };
    // add name and userProfile pic
    const handleUpdateProfile = (name, photo) => {
        setLoading(true);
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photo
        })
    }



    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);

            const loggedUser = { email: currentUser?.email };
            // if user thakle token create korbo
            if (currentUser) {
                axios.post('https://assignment-eleven-server-delta.vercel.app/jwt', loggedUser, { withCredentials: true })
                    .then(res => {
                        console.log("Token responce", res.data)
                    })
            }
            else{
                axios.post('https://assignment-eleven-server-delta.vercel.app/logout', loggedUser, {withCredentials: true})
                .then(res => {
                    console.log(res.data)
                })
            }


        });

        return () => {
            unSubscribe();
        }
    }, []);


    console.log(" Current user: ", user)


    const authInfo = { register, login, user, logOut, signInGoogle, signInGithub, loading, handleUpdateProfile, setCurrentRoom, currentRoom }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;