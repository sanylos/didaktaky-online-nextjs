// @ts-nocheck
"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/api';

const UserContext = createContext({
    user: null,
    login: () => { },
    logout: () => { },
});

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
    const [userData, setUserData] = useState(null);

    const fetchUserData = async () => {
        try {
            const { data, error } = await supabase.auth.getUser();
            if (!error) {
                setUserData(data);
                console.log(data);
            } else {
                setUserData(null);
                console.log(error);
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
        } else {
            console.error('Login failed:', error.message);
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
        <UserContext.Provider value={{ userData, login: handleLogin, logout: handleLogout }}>
            {children}
        </UserContext.Provider>
    );
};