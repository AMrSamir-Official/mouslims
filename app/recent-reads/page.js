// app/recent-reads/page.js

"use client"; // Add this directive to enable client-side features

import { useRouter } from 'next/navigation';
import React from 'react';

const RecentReadsPage = () => {
    const [reads, setReads] = React.useState([]);
    const router = useRouter(); // Use the router for navigation

    // Fetch the recent reads from the API
    React.useEffect(() => {
        const fetchReads = async () => {
            try {
                const res = await fetch('https://mp3quran.net/api/v3/recent_reads?language=eng');
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await res.json();
                setReads(data.reads);
            } catch (error) {
                console.error('Failed to fetch reads:', error);
            }
        };

        fetchReads();
    }, []); // Empty dependency array to run only on mount

    // Handle the selection of a Sheikh
    const handleSurahSelect = (moshaf) => {
        // Navigate to the SurahsPage with the moshaf server as a query parameter
        router.push(`/recent-reads/surahs?moshafServer=${encodeURIComponent(moshaf)}`);
    };

    return (
        <div>
            <h1 className="text-2xl font-bold">Choose a Sheikh</h1>
            <ul className="mt-4">
                {reads.length === 0 ? (
                    <li>Loading...</li> // Show loading text while fetching
                ) : (
                    reads.map((read) => (
                        <li key={read.id} className="my-2">
                            <h2 className="text-lg">{read.name}</h2>
                            <button
                                onClick={() => handleSurahSelect(read.moshaf[0].server)} // Assuming each read has at least one moshaf
                                className="bg-blue-500 text-white px-4 py-2 rounded"
                            >
                                Listen
                            </button>
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
};

export default RecentReadsPage;
