"use client";

import { useTranslations } from 'next-intl';
import { useContext, useEffect, useRef, useState } from 'react';
import { FaGlobe, FaMoon, FaSun } from 'react-icons/fa';
import DrawerMobileNavigation from './DrawerMobileNavigation';
import { LanguageContext } from './LanguageContext';
import { ThemeContext } from './ThemeContext';


const classNames = (...classes) => classes.filter(Boolean).join(' ');

export default function Header() {
    const { darkMode, toggleDarkMode } = useContext(ThemeContext);
    const { locale, changeLanguage } = useContext(LanguageContext);
    const t = useTranslations();

    const [activeMenu, setActiveMenu] = useState('home'); // Default value for activeMenu
    const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false); // State to manage dropdown visibility
    const languageMenuRef = useRef();

    const availableLanguages = [
        { code: 'en', label: 'English' },
        { code: 'ar', label: 'العربية' },
        { code: 'fr', label: 'Français' },
        { code: 'es', label: 'Español' },
        { code: 'de', label: 'Deutsch' },
        // Add more languages as needed
    ];

    // Function to change language and log to console
    const handleChangeLanguage = (code) => {
        changeLanguage(code);
        console.log(`Language changed to: ${code}`);
        setIsLanguageMenuOpen(false); // Close the dropdown after selecting a language
    };

    // Close the language menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (languageMenuRef.current && !languageMenuRef.current.contains(event.target)) {
                setIsLanguageMenuOpen(false);
            }
        };

        if (isLanguageMenuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isLanguageMenuOpen]);

    return (
        <header className={classNames(
            'flex items-center justify-between p-4 border-b fixed w-full h-[60px] top-[0px] z-[100]',
            darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        )}>
            {/* Drawer Navigation */}
            <DrawerMobileNavigation
                darkMode={darkMode}
                activeMenu={activeMenu}
                setActiveMenu={setActiveMenu} // Pass the function here
            />

            {/* Logo or Brand Name */}
            <div className="flex items-center">
                <span className={classNames(
                    'text-xl font-bold',
                    darkMode ? 'text-white' : 'text-gray-900'
                )}>
                    {t('brandName') || 'Brand'}
                </span>
            </div>

            {/* Right-side Controls */}
            <div className="flex items-center space-x-4">
                {/* Language Switcher */}
                <div className="relative inline-block text-left" ref={languageMenuRef}>
                    <div>
                        <button
                            type="button"
                            onClick={() => setIsLanguageMenuOpen(prev => !prev)} // Toggle dropdown visibility
                            className={classNames(
                                'inline-flex justify-center w-full rounded-md border shadow-sm px-4 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500',
                                darkMode
                                    ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                                    : 'bg-white text-gray-700 hover:bg-gray-50'
                            )}
                            id="menu-button"
                            aria-expanded={isLanguageMenuOpen} // Update the aria attribute
                            aria-haspopup="true"
                        >
                            <FaGlobe className="mr-2" />
                            {availableLanguages.find(lang => lang.code === locale)?.label || 'Language'}
                            <svg
                                className="-mr-1 ml-2 h-5 w-5"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.584l3.71-4.354a.75.75 0 111.14.976l-4.25 5a.75.75 0 01-1.14 0l-4.25-5a.75.75 0 01.02-1.06z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </button>
                    </div>

                    {/* Dropdown Menu */}
                    {isLanguageMenuOpen && (
                        <div
                            className={`origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50 ${darkMode ? 'bg-gray-800 text-[black]' : 'bg-white'
                                }`}
                        >
                            <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="menu-button">
                                {availableLanguages.map(lang => (
                                    <button
                                        key={lang.code}
                                        className={classNames(
                                            'block w-full text-left px-4 py-2 text-sm',
                                            locale === lang.code
                                                ? 'bg-indigo-100 dark:bg-indigo-700 text-indigo-700 dark:text-white'
                                                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
                                        )}
                                        role="menuitem"
                                        onClick={() => handleChangeLanguage(lang.code)}
                                    >
                                        {lang.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Dark Mode Toggle */}
                <button
                    onClick={toggleDarkMode}
                    className={classNames(
                        'p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2',
                        darkMode
                            ? 'bg-gray-700 hover:bg-gray-600 text-white focus:ring-gray-500'
                            : 'bg-gray-200 hover:bg-gray-300 text-black focus:ring-gray-300'
                    )}
                    aria-label={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                >
                    {darkMode ? <FaSun /> : <FaMoon />}
                </button>
            </div>
        </header>
    );

    // Prop type validation (optional, since there are no props in Header)

    // No props currently, but if you pass any in future, define them here
};
