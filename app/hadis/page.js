"use client";

import { LanguageContext } from '@/components/LanguageContext';
import { ThemeContext } from '@/components/ThemeContext'; // Import ThemeContext

import { useContext, useEffect, useState } from 'react';

const HadithPage = () => {
    const { locale } = useContext(LanguageContext);
    const { darkMode } = useContext(ThemeContext);
    const [editions, setEditions] = useState([]);
    const [selectedEdition, setSelectedEdition] = useState(null);
    const [hadithNumber, setHadithNumber] = useState('');
    const [hadithData, setHadithData] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchEditions = async () => {
            const response = await fetch('https://api.hadith.gading.dev/books');
            const data = await response.json();
            console.log('Available Books:', data);
            if (data && data.data) {
                setEditions(data.data); // Adjusted based on response structure
            }
        };
        fetchEditions();
    }, []);

    const fetchHadith = async (bookName, number) => {
        try {
            const response = await fetch(`https://api.hadith.gading.dev/books/${bookName}/${number}`);
            const data = await response.json();
            console.log('Fetched Hadith Data:', data);
            if (data && data.data) {
                setHadithData(data.data.contents); // Ensure you access the correct structure
            } else {
                setHadithData(null);
            }
        } catch (err) {
            console.error(err);
            setError('Failed to fetch hadith data');
        }
    };

    return (
        <div className={`p-5 ${darkMode ? 'bg-gray-800 text-gray-200' : 'bg-white text-gray-800'}`}>
            <select
                className={`p-2 rounded-md ${darkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-200 text-gray-800'}`}
                onChange={(e) => setSelectedEdition(e.target.value)}
            >
                <option value="">Select Edition</option>
                {editions.map((edition) => (
                    <option key={edition.id} value={edition.id}>
                        {edition.name}
                    </option>
                ))}
            </select>

            <input
                type="number"
                placeholder="Hadith Number"
                value={hadithNumber}
                onChange={(e) => setHadithNumber(e.target.value)}
                className={`p-2 rounded-md ${darkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-200 text-gray-800'}`}
            />

            <button
                onClick={() => fetchHadith(selectedEdition, hadithNumber)}
                className={`p-2 rounded-md ${darkMode ? 'bg-blue-600 text-white' : 'bg-blue-400 text-white'}`}
            >
                Fetch Hadith
            </button>

            {error && <p className="text-red-500">{error}</p>}
            {hadithData && (
                <div className="mt-4">
                    <h2 className="text-lg font-semibold">Hadith Content:</h2>
                    <p>{hadithData.arab}</p> {/* Display the Arabic text */}
                    <p>{hadithData.id}</p> {/* Display the translation text */}
                </div>
            )}
        </div>
    );
};

export default HadithPage;
