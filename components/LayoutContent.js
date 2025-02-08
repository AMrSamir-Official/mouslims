'use client'; // هذا التوجيه يجعل المكون مكون عميل

import { NextIntlClientProvider } from 'next-intl';
import { useContext } from 'react';
import Header from './Header';
import { LanguageContext } from './LanguageContext';
import LanguageModal from './LanguageModal';
import { ThemeContext } from './ThemeContext';


export default function LayoutContent({ children }) {
    const { locale } = useContext(LanguageContext);
    const messages = require(`../app/translations/${locale}.json`);
    const { darkMode } = useContext(ThemeContext);

    return (
        <NextIntlClientProvider
            className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}

            locale={locale} messages={messages}>

            <Header />


            <LanguageModal />


            <main className="container  w-screen  max-w-[100%]">
                {children}
            </main>


            <footer className="p-4 text-center border-t dark:border-gray-700">
                <p>© 2024 Your Site</p>
            </footer>
        </NextIntlClientProvider>
    );
}
