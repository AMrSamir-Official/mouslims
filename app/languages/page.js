// app/languages/page.js
'use client';

import Loading from '@/app/loading';

import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function LanguagesPage() {
    const [languages, setLanguages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchLanguages = async () => {
            try {
                const response = await axios.get('http://api.alquran.cloud/v1/language');
                if (response.data.code === 200) {
                    setLanguages(response.data.data);
                } else {
                    setError('Failed to fetch languages.');
                }
            } catch (err) {
                setError('An error occurred while fetching languages.');
            } finally {
                setLoading(false);
            }
        };

        fetchLanguages();
    }, []);

    if (loading) return <Loading />;
    if (error) return <div className="text-red-500 text-center mt-4">{error}</div>;

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
            <h1 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-gray-100">Available Languages</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {languages.map((language) => (
                    <div key={language.code} className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
                        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">{language.name}</h2>
                        <p className="text-gray-600 dark:text-gray-300">Code: {language.code}</p>
                        <Link href={`/languages/${language.code}`}>
                            <span className="mt-4 inline-block bg-green-500 hover:bg-green-600 text-white py-1 px-3 rounded cursor-pointer">
                                View Editions
                            </span>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}
