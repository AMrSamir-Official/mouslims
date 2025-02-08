'use client';

import { LanguageContext } from '@/components/LanguageContext';
import Spinner from '@/components/Spinner';
import { ThemeContext } from '@/components/ThemeContext';
import axios from 'axios';
import { useTranslations } from 'next-intl';
import { useContext, useState } from 'react';

export default function SearchPage() {
    const [keyword, setKeyword] = useState('');
    const [surah, setSurah] = useState('all');
    const [edition, setEdition] = useState('');
    const [language, setLanguage] = useState('en');
    const [results, setResults] = useState([]); // Initialized as an empty array
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { darkMode } = useContext(ThemeContext);
    const { locale } = useContext(LanguageContext);
    const t = useTranslations();

    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setResults([]); // Reset results before the search

        let apiUrl = `http://api.alquran.cloud/v1/search/${encodeURIComponent(keyword)}/${surah}`;
        if (edition) {
            apiUrl += `/${edition}`;
        } else if (language) {
            apiUrl += `/${language}`;
        }

        try {
            const response = await axios.get(apiUrl);
            if (response.data.code === 200) {
                setResults(response.data.data.ayahs);
            } else {
                setError(t('noResults'));
            }
        } catch (err) {
            setError(t('searchError'));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={`min-h-screen pt-20 ${darkMode ? 'bg-gray-900' : 'bg-gray-100'} p-4 transition-colors duration-300`}>
            <h1 className={`text-3xl font-bold text-center mb-6 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                {t('searchQuran')}
            </h1>

            <form onSubmit={handleSearch} className={`max-w-xl mx-auto ${darkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded shadow transition-colors duration-300`}>
                <div className="mb-4">
                    <label htmlFor="keyword" className={`block ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                        {t('keyword')}:
                    </label>
                    <input
                        type="text"
                        id="keyword"
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        required
                        className={`w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-800'}`}
                        placeholder={t('keywordPlaceholder')}
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="surah" className={`block ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                        {t('surah')}:
                    </label>
                    <select
                        id="surah"
                        value={surah}
                        onChange={(e) => setSurah(e.target.value)}
                        className={`w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-800'}`}
                    >
                        <option value="all">{t('allSurahs')}</option>
                        {[...Array(114)].map((_, i) => (
                            <option key={i + 1} value={i + 1}>
                                {t('surah')} {i + 1}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-4">
                    <label htmlFor="edition" className={`block ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                        {t('edition')}:
                    </label>
                    <input
                        type="text"
                        id="edition"
                        value={edition}
                        onChange={(e) => setEdition(e.target.value)}
                        className={`w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-800'}`}
                        placeholder={t('editionPlaceholder')}
                    />
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'} mt-1`}>{t('leaveBlankForAll')}</p>
                </div>

                <div className="mb-4">
                    <label htmlFor="language" className={`block ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                        {t('language')}:
                    </label>
                    <select
                        id="language"
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        className={`w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-yellow-500 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-800'}`}
                    >
                        <option value="en">English</option>
                        <option value="ar">العربية</option>
                        <option value="fr">Français</option>
                        <option value="es">Español</option>
                        <option value="de">Deutsch</option>
                        {/* Add more languages as needed */}
                    </select>
                </div>

                <button
                    type="submit"
                    className={`w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded shadow transition-colors duration-300 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={loading}
                >
                    {loading ? t('searching') : t('search')}
                </button>
            </form>

            <div className="max-w-4xl mx-auto mt-8">
                {loading && <Spinner />}
                {error && <p className={`text-center text-red-500 ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>{error}</p>}
                {!loading && results && results.length > 0 && (
                    <div className={`bg-white dark:bg-gray-800 p-6 rounded shadow transition-colors duration-300`}>
                        <h2 className={`text-2xl font-semibold mb-4 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                            {t('searchResults')}
                        </h2>
                        <ul>
                            {results.map((ayah) => (
                                <li key={ayah.number} className="mb-4 border-b pb-2">
                                    <p className={`text-gray-700 dark:text-gray-300`}>
                                        <strong>{t('surah')} {ayah.surah.number}:</strong> {ayah.text}
                                    </p>
                                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                        {t('ayah')} {ayah.numberInSurah} | {t('edition')}: {ayah.edition.identifier}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}
