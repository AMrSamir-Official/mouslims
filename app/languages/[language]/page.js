// app/languages/[language]/page.js
'use client';

import Spinner from '@/components/Spinner';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

function LanguageDetail({ params }) {
    const { language } = params;
    const [editions, setEditions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const fetchEditionsByLanguage = async () => {
            try {
                const response = await axios.get(`http://api.alquran.cloud/v1/language/${language}`);
                if (response.data.code === 200) {
                    setEditions(response.data.data);
                } else {
                    setError('Failed to fetch editions for this language.');
                }
            } catch (err) {
                setError('An error occurred while fetching editions.');
            } finally {
                setLoading(false);
            }
        };

        fetchEditionsByLanguage();
    }, [language]);

    if (loading) return <Spinner />;
    if (error) return <p className="text-red-500 text-center">{error}</p>;
    if (!editions || editions.length === 0) return <p className="text-center">No editions found for this language.</p>;

    return (
        <div className="min-h-screen p-8 bg-gray-100 dark:bg-gray-900">
            <button
                onClick={() => router.back()}
                className="mb-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
                Back
            </button>
            <h1 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-gray-200">Editions in {language.toUpperCase()}</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {editions.map((edition) => (
                    <Link key={edition.identifier} href={`/editions/${edition.identifier}`}>
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300 cursor-pointer">
                            <h2 className="text-xl font-semibold text-blue-600 dark:text-blue-400">{edition.name}</h2>
                            <p className="text-gray-600 dark:text-gray-400">Type: {edition.type}</p>
                            <p className="text-gray-600 dark:text-gray-400">Format: {edition.format}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default LanguageDetail;
