'use client';

import Loading from '@/app/loading';

import { ThemeContext } from '@/components/ThemeContext'; // Import ThemeContext
import axios from 'axios';
import { useContext, useState } from 'react';

export default function AyahPage() {
    const { darkMode } = useContext(ThemeContext); // Get dark mode state from ThemeContext
    const [reference, setReference] = useState('');
    const [edition, setEdition] = useState('');
    const [ayah, setAyah] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleFetchAyah = async () => {
        if (!reference) {
            setError('Please enter a reference.');
            return;
        }
        setLoading(true);
        setError(null);
        setAyah(null);
        try {
            const response = await axios.get(`http://api.alquran.cloud/v1/ayah/${reference}/${edition || 'quran-uthmani'}`);
            if (response.data.code === 200) {
                setAyah(response.data.data);
            } else {
                setError('Failed to fetch Ayah.');
            }
        } catch (err) {
            setError('An error occurred while fetching Ayah.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={`min-h-screen p-6 ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
            <h1 className={`text-3xl font-bold mb-6 text-center ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>
                Get an Ayah
            </h1>

            {/* Input Form */}
            <div className={`max-w-md mx-auto rounded-lg shadow p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <div className="mb-4">
                    <label htmlFor="reference" className={`block font-semibold mb-2 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                        Reference (e.g., 2:255 or 262)
                    </label>
                    <input
                        type="text"
                        id="reference"
                        value={reference}
                        onChange={(e) => setReference(e.target.value)}
                        className={`w-full p-2 border rounded-md ${darkMode ? 'border-gray-700 bg-gray-700 text-gray-100' : 'border-gray-300 bg-gray-50 text-gray-800'}`}
                        placeholder="Enter Ayah reference"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="edition" className={`block font-semibold mb-2 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                        Edition (optional)
                    </label>
                    <input
                        type="text"
                        id="edition"
                        value={edition}
                        onChange={(e) => setEdition(e.target.value)}
                        className={`w-full p-2 border rounded-md ${darkMode ? 'border-gray-700 bg-gray-700 text-gray-100' : 'border-gray-300 bg-gray-50 text-gray-800'}`}
                        placeholder="Enter Edition Identifier (e.g., en.asad)"
                    />
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'} mt-1`}>
                        Leave blank for default Arabic text.
                    </p>
                </div>

                <button
                    onClick={handleFetchAyah}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded shadow transition"
                >
                    Fetch Ayah
                </button>
            </div>

            {/* Display Ayah */}
            <div className="max-w-2xl mx-auto mt-6">
                {loading && <Loading />}
                {error && <div className="text-red-500 text-center">{error}</div>}
                {ayah && (
                    <div className={`rounded-lg shadow p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                        <p className={`text-lg ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>{ayah.text}</p>
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'} mt-2`}>
                            Surah {ayah.surah.number}: Ayah {ayah.numberInSurah} ({ayah.surah.englishName})
                        </p>
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'} mt-1`}>
                            Edition: {ayah.edition.identifier}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
