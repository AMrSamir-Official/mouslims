'use client'; // Indicate that this is a Client Component

import Spinner from '@/components/Landing'; // Loading spinner component
import { LanguageContext } from '@/components/LanguageContext';
// Adjust the import according to your file structure
import axios from 'axios';
import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';

function TafsirPage() {
    const [tafisrs, setTafisrs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { locale } = useContext(LanguageContext); // Get the locale from LanguageContext

    useEffect(() => {
        const fetchTafisrs = async () => {
            setLoading(true); // Start loading
            setError(null); // Reset error state
            try {
                // Fetch available Tafasirs with language parameter
                const response = await axios.get(`https://mp3quran.net/api/v3/tafasir?language=${locale}`);
                console.log('API Response:', response.data); // Log the response data for debugging
                if (response.data.tafasirs) {
                    setTafisrs(response.data.tafasirs);
                } else {
                    setError('No Tafasirs found.');
                }
            } catch (err) {
                console.error('Error fetching Tafasirs:', err); // Log the full error for debugging
                setError('An error occurred while fetching Tafasirs.');
            } finally {
                setLoading(false); // End loading
            }
        };

        fetchTafisrs();
    }, [locale]); // Dependency on locale

    // Loading state
    if (loading) {
        return <Spinner />;
    }

    // Error state
    if (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
                <p className="text-red-500 text-lg">{error}</p>
                <Link href="/" className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
                    Go Back Home
                </Link>
            </div>
        );
    }

    // Render Tafasirs
    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
            <h1 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-gray-100">Tafasirs</h1>
            <div className="space-y-4">
                {tafisrs.map((tafsir) => (
                    <div key={tafsir.id} className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
                        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">{tafsir.name}</h2>
                        <Link
                            href={tafsir.url}
                            target="_blank"
                            className="text-blue-500 hover:text-blue-700 dark:text-blue-300 dark:hover:text-blue-500"
                        >
                            Listen to {tafsir.name}
                        </Link>
                    </div>
                ))}
            </div>
            <div className="mt-6 text-center">
                <Link href="/" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
                    Go Back Home
                </Link>
            </div>
        </div>
    );
}

export default TafsirPage; // Export the component
