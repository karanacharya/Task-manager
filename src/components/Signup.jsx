import React, { useContext, useState } from 'react';
import { auth } from "../firebase";
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

const Signup = () => {
    
    const { signup, error } = useAuth();
    const navigate = useNavigate(); // Use the context
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const provider = new GoogleAuthProvider(); // Google provider

    const handleSignup = async (e) => {
        e.preventDefault();
    await signup(email, password);
     navigate("/login");
     
    };

    const handleGoogleSignup = async () => {
        try {
            await signInWithPopup(auth, provider);
            alert("Google signup successful!");
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100"> {/* Tailwind classes for layout */}
            <h2 className="text-2xl font-bold mb-4">Signup</h2>
            <input 
                type="email" 
                placeholder="Email" 
                className="mb-2 p-2 border border-gray-300 rounded w-80" 
                onChange={(e) => setEmail(e.target.value)} 
            />
            <input 
                type="password" 
                placeholder="Password" 
                className="mb-4 p-2 border border-gray-300 rounded w-80" 
                onChange={(e) => setPassword(e.target.value)} 
            />
            <button 
                onClick={handleSignup} 
                className="mb-2 p-2 bg-blue-500 text-white rounded w-80 hover:bg-blue-600"
            >
                Signup
            </button>
            <button 
                onClick={handleGoogleSignup} 
                className="p-2 bg-red-500 text-white rounded w-80 hover:bg-red-600"
            >
                Signup with Google
            </button>
        </div>
    );
};

export default Signup;