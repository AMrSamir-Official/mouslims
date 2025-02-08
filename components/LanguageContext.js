"use client";

import { useRouter } from 'next/navigation';
import { createContext, useEffect, useState } from 'react';

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    const router = useRouter();
    const [locale, setLocale] = useState('en');
    const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);

    useEffect(() => {
        const storedLocale = localStorage.getItem('locale');
        if (storedLocale) {
            setLocale(storedLocale);
        } else {
            setIsLanguageModalOpen(true);
        }
    }, []);

    const changeLanguage = (newLocale) => {
        setLocale(newLocale);
        localStorage.setItem('locale', newLocale);
        setIsLanguageModalOpen(false);
        // Refresh the page to apply the new locale
        router.refresh();
    };

    return (
        <LanguageContext.Provider value={{ locale, changeLanguage, isLanguageModalOpen, setIsLanguageModalOpen }}>
            {children}
        </LanguageContext.Provider>
    );
};

export default LanguageProvider;
