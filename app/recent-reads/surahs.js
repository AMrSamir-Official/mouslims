// app/recent-reads/surahs.js

"use client"; // Ensures this component is a client component

import { useSearchParams } from 'next/navigation';
import React from 'react';

const SurahsPage = () => {
    const searchParams = useSearchParams(); // Use useSearchParams to get the URL parameters
    const moshafServer = searchParams.get("moshafServer"); // Extract moshafServer

    const [surahNumbers, setSurahNumbers] = React.useState([]);

    // Generate an array of Surah numbers (1 to 114)
    React.useEffect(() => {
        setSurahNumbers(Array.from({ length: 114 }, (_, index) => index + 1));
    }, []);

    const playSurah = (surahNumber) => {
        if (!moshafServer) {
            console.error("moshafServer is not defined.");
            return;
        }
        const audioUrl = `${moshafServer}/${surahNumber.toString().padStart(3, '0')}.mp3`;
        const audio = new Audio(audioUrl);
        audio.play();
    };

    return (
        <div>
            <h1 className="text-2xl font-bold">Select a Surah</h1>
            <ul className="mt-4">
                {surahNumbers.map((surahNumber) => (
                    <li key={surahNumber} className="my-2">
                        <button
                            onClick={() => playSurah(surahNumber)}
                            className="bg-green-500 text-white px-4 py-2 rounded"
                        >
                            Surah {surahNumber}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SurahsPage;
