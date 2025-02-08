'use client'; // Enabling React client-side rendering

import Loading from '@/app/loading';

import { ThemeContext } from '@/components/ThemeContext';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';

export default function RukuPage() {
    const { darkMode } = useContext(ThemeContext); // Get darkMode from context

    const [ruku, setRuku] = useState([]);
    const [selectedRuku, setSelectedRuku] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchRuku = async (rukuNumber) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(`http://api.alquran.cloud/v1/ruku/${rukuNumber}/quran-uthmani`);
            if (response.data.code === 200) {
                setRuku(response.data.data.ayahs);
                setSelectedRuku(rukuNumber);
            } else {
                setError('Failed to fetch Ruku.');
            }
        } catch (err) {
            setError('An error occurred while fetching Ruku.');
        } finally {
            setLoading(false);
        }
    };

    // Fetch Ruku 1 by default
    useEffect(() => {
        fetchRuku(1);
    }, []);

    const handleRukuChange = (e) => {
        const rukuNumber = e.target.value;
        if (rukuNumber) {
            fetchRuku(rukuNumber);
        }
    };

    return (
        <div className={`min-h-screen ${darkMode ? 'bg-gray-100 dark:bg-gray-900' : 'bg-gray-900 dark:bg-gray-100'} p-6`}>
            <h1 className={`text-3xl font-bold mb-6 text-center ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>Ruku Details</h1>

            {/* Ruku Selector */}
            <div className="flex justify-center mb-6">
                <select
                    value={selectedRuku || 1}
                    onChange={handleRukuChange}
                    className={`p-2 rounded-md border ${darkMode ? 'border-gray-700 bg-gray-800 text-gray-100' : 'border-gray-300 bg-white text-gray-800'}`}
                >
                    {Array.from({ length: 556 }, (_, i) => i + 1).map((rukuNumber) => (
                        <option key={rukuNumber} value={rukuNumber}>
                            Ruku {rukuNumber}
                        </option>
                    ))}
                </select>
            </div>

            {loading && <Loading />}
            {error && <div className="text-red-500 text-center">{error}</div>}

            {!loading && !error && (
                <div className="space-y-4">
                    {ruku.map((ayah) => (
                        <div key={ayah.number} className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow p-4`}>
                            <p className={`text-lg text-center ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>{ayah.text}</p>
                            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'} mt-2`}>Surah {ayah.surah.number}:Ayah {ayah.numberInSurah}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
