//@ts-nocheck
"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/api';
import { useRouter } from 'next/navigation'

const UserContext = createContext({
    user: null,
    login: (email: string, password: string) => { },
    logout: () => { },
    register: (email: string, password: string) => { },
});

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [userData, setUserData] = useState();
    const router = useRouter();

    const fetchUserData = async () => {
        try {
            const { data, error } = await supabase.auth.getUser();
            if (!error) {
                setUserData(data);
                console.log(data);
            } else {
                setUserData(null);
                console.log("Not logged in!");
            }
        } catch (error) {
            console.error('Error fetching user data:', error.message);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    const handleLogin = async (email, password) => {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
        })
        if (!error) {
            setUserData(data);
            console.log('Login successful:', data);
            router.push('/');
        } else {
            console.error('Login failed:', error.message);
        }
    };

    const handleRegister = async (email, password) => {
        console.log(email); console.log(password);
        const { data, error } = await supabase.auth.signUp({
            email,
            password
        })
        if (!error) {
            setUserData(data);
            console.log('Register successful:', data);
            router.push('/');
        } else {
            console.error('Register failed:', error.message);
        }
    };

    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut();
        if (!error) {
            setUserData(null);
            console.log('Logout successful');
        } else {
            console.error('Logout failed:', error.message);
        }
    };

    return (
        <UserContext.Provider value={{ userData, login: handleLogin, logout: handleLogout, register: handleRegister }}>
            {children}
        </UserContext.Provider>
    );
};