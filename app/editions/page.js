// app/editions/page.js
'use client';

import Loading from '@/app/loading';

import { ThemeContext } from '@/components/ThemeContext';
import axios from 'axios';
import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';

export default function EditionsPage() {
    const { darkMode } = useContext(ThemeContext);

    const [editions, setEditions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEditions = async () => {
            try {
                const response = await axios.get('http://api.alquran.cloud/v1/edition');
                if (response.data.code === 200) {
                    setEditions(response.data.data);
                } else {
                    setError('Failed to fetch editions.');
                }
            } catch (err) {
                setError('An error occurred while fetching editions.');
            } finally {
                setLoading(false);
            }
        };

        fetchEditions();
    }, []);

    if (loading) return <Loading />;
    if (error) return <div className="text-red-500 text-center mt-4">{error}</div>;

    return (
        <div className={`min-h-screen ${darkMode ? 'bg-gray-100 dark:bg-gray-900' : 'bg-gray-900 dark:bg-gray-100'} p-6`}>
            <h1 className={`text-3xl font-bold mb-6 text-center ${!darkMode ? 'text-gray-800' : 'text-gray-100'}`}>Available Quran Editions</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {editions.map((edition) => (
                    <div key={edition.identifier} className={`${!darkMode ? 'bg-white' : 'bg-gray-800'} rounded-lg shadow p-4`}>
                        <h2 className={`text-xl font-semibold ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>{edition.name}</h2>
                        <p className={darkMode ? 'text-gray-600 ' : 'text-gray-300 '}>Language: {edition.languageName}</p>
                        < p className={darkMode ? 'text-gray-600 ' : 'text-gray-300 '}>Format: {edition.format}</p>
                        <p className={darkMode ? 'text-gray-600 ' : 'text-gray-300 '}>Type: {edition.type}</p>
                        <Link href={`/editions/${edition.identifier}`}>
                            <span className="mt-4 inline-block bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded cursor-pointer">
                                View Edition
                            </span>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}
