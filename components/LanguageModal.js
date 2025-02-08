"use client";

import { useContext } from 'react';
import { FaTimes } from 'react-icons/fa';
import { LanguageContext } from './LanguageContext';

export default function LanguageModal() {
    const { changeLanguage, isLanguageModalOpen, setIsLanguageModalOpen } = useContext(LanguageContext);

    if (!isLanguageModalOpen) return null;

    const availableLanguages = [
        { code: 'en', label: 'English' },
        { code: 'ar', label: 'العربية' },
        { code: 'fr', label: 'Français' },

    ];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-80 relative">
                <button
                    className="absolute top-2 right-2 text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-100"
                    onClick={() => setIsLanguageModalOpen(false)}
                    aria-label="Close Language Selection"
                >
                    <FaTimes />
                </button>
                <h2 className="text-xl font-semibold mb-4">Select Your Language</h2>
                <div className="space-y-2">
                    {availableLanguages.map(lang => (
                        <button
                            key={lang.code}
                            className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                            onClick={() => changeLanguage(lang.code)}
                        >
                            {lang.label}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
