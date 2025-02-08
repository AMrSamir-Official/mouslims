"use client";

import { createContext, useEffect, useState } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [darkMode, setDarkMode] = useState(false);

    // Initialize dark mode based on system preference or localStorage
    useEffect(() => {
        const storedDarkMode = localStorage.getItem('darkMode');
        if (storedDarkMode !== null) {
            setDarkMode(storedDarkMode === 'true');
            document.documentElement.classList.toggle('dark', storedDarkMode === 'true');
        } else {
            const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
            setDarkMode(prefersDark);
            document.documentElement.classList.toggle('dark', prefersDark);
        }
    }, []);

    // Toggle dark mode and save preference
    const toggleDarkMode = () => {
        setDarkMode(prev => {
            localStorage.setItem('darkMode', !prev);
            document.documentElement.classList.toggle('dark', !prev);
            return !prev;
        });
    };

    return (
        <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
            {children}
        </ThemeContext.Provider>
    );
};
