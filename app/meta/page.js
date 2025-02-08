'use client'; // Indicate that this is a Client Component

import Spinner from '@/components/Landing';
import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';

function MetaPage() {
    const [metaData, setMetaData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMetaData = async () => {
            try {
                const response = await axios.get('http://api.alquran.cloud/v1/meta');
                if (response.data.code === 200) {
                    setMetaData(response.data.data);
                } else {
                    setError('Failed to fetch meta data.');
                }
            } catch (err) {
                setError('An error occurred while fetching meta data.');
            } finally {
                setLoading(false);
            }
        };

        fetchMetaData();
    }, []);

    if (loading) {
        return <Spinner />; // Show loading spinner
    }

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

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
            <h1 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-gray-100">Quran Metadata</h1>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <h2 className="text-2xl font-semibold mb-4 text-gray-700 dark:text-gray-200">Surahs</h2>
                <p className="text-gray-600 dark:text-gray-300">Total Surahs: {metaData.surahCount}</p>

                <h2 className="text-2xl font-semibold mt-6 mb-4 text-gray-700 dark:text-gray-200">Pages</h2>
                <p className="text-gray-600 dark:text-gray-300">Total Pages: {metaData.pageCount}</p>

                <h2 className="text-2xl font-semibold mt-6 mb-4 text-gray-700 dark:text-gray-200">Hizbs</h2>
                <p className="text-gray-600 dark:text-gray-300">Total Hizbs: {metaData.hizbCount}</p>

                <h2 className="text-2xl font-semibold mt-6 mb-4 text-gray-700 dark:text-gray-200">Juzs</h2>
                <p className="text-gray-600 dark:text-gray-300">Total Juzs: {metaData.juzCount}</p>
            </div>
            <div className="mt-6 text-center">
                <Link href="/" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
                    Go Back Home
                </Link>
            </div>
        </div>
    );
}

export default MetaPage; // Export the component
