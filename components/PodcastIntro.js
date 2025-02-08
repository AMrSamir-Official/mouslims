'use client';

import { LanguageContext } from '@/components/LanguageContext';
import { ThemeContext } from '@/components/ThemeContext';
import { useContext } from 'react';



function SurahDetail({ params }) {


    const { darkMode } = useContext(ThemeContext);
    const { locale } = useContext(LanguageContext); // Get locale from LanguageContext

    return (
        <div dir='auto' className={`min-h-screen p-8 ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'} transition-colors duration-300`}>
            welcome
        </div>
    );
}

export default SurahDetail;
