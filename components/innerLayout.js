// components/InnerLayout.js
import { NextIntlClientProvider } from 'next-intl';
import { useContext } from 'react';
import Header from './Header';
import { LanguageContext } from './LanguageContext';
import LanguageModal from './LanguageModal';

const InnerLayout = ({ children }) => {
    const { locale } = useContext(LanguageContext);
    const messages = require(`../app/translations/${locale}.json`);

    return (
        <NextIntlClientProvider locale={locale} messages={messages}>
            {/* Header */}
            <Header />

            {/* Language Selection Modal */}
            <LanguageModal />

            {/* Main Content */}
            <main className="container w-screen">
                {children}
            </main>

            {/* Footer */}
            <footer className="p-4 text-center border-t dark:border-gray-700">
                <p>© 2024 Your Site</p>
            </footer>
        </NextIntlClientProvider>
    );
};

export default InnerLayout;
