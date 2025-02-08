// app/editions/[edition]/page.js
'use client';

import Spinner from '@/components/Spinner';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

function EditionDetail({ params }) {
    const { edition } = params;
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const fetchEditionDetail = async () => {
            try {
                const response = await axios.get(`http://api.alquran.cloud/v1/edition/${edition}`);
                if (response.data.code === 200) {
                    setData(response.data.data);
                } else {
                    setError('Failed to fetch edition details.');
                }
            } catch (err) {
                setError('An error occurred while fetching edition details.');
            } finally {
                setLoading(false);
            }
        };

        fetchEditionDetail();
    }, [edition]);

    if (loading) return <Spinner />;
    if (error) return <p className="text-red-500 text-center">{error}</p>;
    if (!data) return <p className="text-center">No data available.</p>;

    return (
        <div className="min-h-screen p-8 bg-gray-100 dark:bg-gray-900">
            <button
                onClick={() => router.back()}
                className="mb-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
                Back
            </button>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <h1 className="text-3xl font-bold mb-4 text-gray-800 dark:text-gray-200">{data.name}</h1>
                <p className="text-gray-700 dark:text-gray-400"><strong>Language:</strong> {data.languageName}</p>
                <p className="text-gray-700 dark:text-gray-400"><strong>Type:</strong> {data.type}</p>
                <p className="text-gray-700 dark:text-gray-400"><strong>Format:</strong> {data.format}</p>
                <p className="text-gray-700 dark:text-gray-400"><strong>Version:</strong> {data.version}</p>
                {/* Add more details as needed */}
            </div>
        </div>
    );
}

export default EditionDetail;
