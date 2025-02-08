// app/surahs/page.js
'use client';

import Loading from '@/app/loading';

import { ThemeContext } from '@/components/ThemeContext'; // Import ThemeContext
import axios from 'axios';
import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';

export default function SurahsPage() {
    const [surahs, setSurahs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { darkMode } = useContext(ThemeContext); // Get dark mode state from ThemeContext

    useEffect(() => {
        const fetchSurahs = async () => {
            try {
                const response = await axios.get('http://api.alquran.cloud/v1/surah');
                if (response.data.code === 200) {
                    setSurahs(response.data.data);
                } else {
                    setError('Failed to fetch surahs.');
                }
            } catch (err) {
                setError('An error occurred while fetching surahs.');
            } finally {
                setLoading(false); // Ensure loading is set to false after the request is complete
            }
        };

        fetchSurahs();
    }, []);

    // Show loading spinner while loading
    if (loading) return <Loading />;

    // Show error message if there is an error
    if (error) return <div className="text-red-500 text-center mt-4">{error}</div>;

    return (
        <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-100'} p-6`}>
            <h1 className={`text-3xl font-bold mb-6 text-center ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>
                List of Surahs
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {surahs.map((surah) => (
                    <div key={surah.number} className={`rounded-lg shadow p-4 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                        <h2 className={`text-xl font-semibold ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>
                            {surah.englishName} ({surah.name})
                        </h2>
                        <p className={`text-gray-300 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                            Number of Ayahs: {surah.numberOfAyahs}
                        </p>
                        <Link href={`/surahs/${surah.number}`}>
                            <span className="mt-4 inline-block bg-purple-500 hover:bg-purple-600 text-white py-1 px-3 rounded cursor-pointer">
                                View Surah
                            </span>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}
