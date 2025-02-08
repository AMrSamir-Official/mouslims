'use client';

import Loading from '@/app/loading';
import { LanguageContext } from '@/components/LanguageContext';
import { ThemeContext } from '@/components/ThemeContext';
import axios from 'axios';
import { useTranslations } from 'next-intl';
import { useContext, useEffect, useState } from 'react';

export default function JuzPage() {
    const [juz, setJuz] = useState([]);
    const [selectedJuz, setSelectedJuz] = useState(1); // Default to 1
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { darkMode } = useContext(ThemeContext);
    const { locale } = useContext(LanguageContext); // Get the current locale
    const t = useTranslations();

    const fetchJuz = async (juzNumber) => {
        setLoading(true);
        setError(null);
        try {
            // Determine the API endpoint based on the current locale
            const edition = locale === 'ar' ? 'quran-uthmani' : 'en.asad'; // Add more editions as necessary
            const response = await axios.get(`http://api.alquran.cloud/v1/juz/${juzNumber}/${edition}`);
            if (response.data.code === 200) {
                setJuz(response.data.data.ayahs);
                setSelectedJuz(juzNumber);
            } else {
                setError(t('fetchError')); // Use translation for error message
            }
        } catch (err) {
            setError(t('fetchError')); // Use translation for error message
        } finally {
            setLoading(false);
        }
    };

    // Fetch Juz when component mounts or when selectedJuz or locale changes
    useEffect(() => {
        fetchJuz(selectedJuz);
    }, [selectedJuz, locale]); // Include locale in dependencies

    const handleJuzChange = (e) => {
        const juzNumber = e.target.value;
        if (juzNumber) {
            fetchJuz(juzNumber);
        }
    };

    return (
        <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-100'} p-6 transition-colors duration-300`}>
            <h1 className="text-3xl font-bold mb-6 text-center text-gray-100 dark:text-gray-900">{t('juzDetails')}</h1>

            {/* Juz Selector */}
            <div className="flex justify-center mb-6">
                <select
                    value={selectedJuz}
                    onChange={handleJuzChange}
                    className={`p-2 rounded-md border border-gray-700 ${darkMode ? 'bg-gray-800 text-gray-100' : 'bg-gray-300 text-gray-800'}`}
                >
                    {Array.from({ length: 30 }, (_, i) => i + 1).map((juzNumber) => (
                        <option key={juzNumber} value={juzNumber}>
                            {t('juz')} {juzNumber}
                        </option>
                    ))}
                </select>
            </div>

            {loading && <Loading />}
            {error && <div className="text-red-500 text-center">{error}</div>}

            {!loading && !error && (
                <div className="space-y-4">
                    {juz.map((ayah) => (
                        <div
                            key={ayah.number}
                            className={`${darkMode ? 'bg-gray-100 dark:bg-gray-900' : 'bg-gray-800 dark:bg-gray-200'} rounded-lg shadow-lg p-4 transition-colors duration-300`}
                        >
                            <p className={`text-lg text-center ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                                {ayah.text} {/* This will be in the selected language based on the edition */}
                            </p>
                            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mt-2`}>
                                {t('surah')} {ayah.surah.number}: {t('ayah')} {ayah.numberInSurah}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
