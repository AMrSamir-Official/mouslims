'use client';

import { LanguageContext } from '@/components/LanguageContext';
import Spinner from '@/components/Spinner';
import { ThemeContext } from '@/components/ThemeContext';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import useSWR from 'swr';

const fetcher = (url) => axios.get(url).then(res => res.data);

function SurahDetail({ params }) {
    const { surah } = params; // Surah number
    const router = useRouter();

    const { darkMode } = useContext(ThemeContext);
    const { locale } = useContext(LanguageContext);

    const readers = [
        { id: 1, name: 'Reader 1' }, // Replace with actual reader names
        { id: 2, name: 'Reader 2' },
        { id: 3, name: 'Reader 3' },
        // Add more readers as needed
    ];

    const [selectedReader, setSelectedReader] = useState(readers[0].id); // Default to the first reader
    const [currentAudio, setCurrentAudio] = useState(null); // State to hold the current audio instance
    const [isPlaying, setIsPlaying] = useState(false); // State to manage play/pause status
    const [currentTime, setCurrentTime] = useState(0); // State to manage current time of the audio
    const [duration, setDuration] = useState(0); // State to manage duration of the audio
    const [playingAyah, setPlayingAyah] = useState(null); // State to keep track of the currently playing ayah

    const editions = {
        'ar': 'ar.alafasy',
        'en': 'en.asad',
    };

    const edition = editions[locale] || editions['en'];

    const { data, error } = useSWR(`https://api.alquran.cloud/v1/surah/${surah}/${edition}`, fetcher, { revalidateOnFocus: false });

    useEffect(() => {
        // Clean up audio instance when the component unmounts
        return () => {
            if (currentAudio) {
                currentAudio.pause();
                currentAudio.src = ''; // Reset the audio source
            }
        };
    }, [currentAudio]);

    if (error) return <p className="text-red-500 text-center">{locale === 'ar' ? 'فشل في جلب تفاصيل السورة.' : 'Failed to fetch surah details.'}</p>;
    if (!data) return <Spinner />;

    if (data.code !== 200) return <p className="text-red-500 text-center">{locale === 'ar' ? 'فشل في جلب تفاصيل السورة.' : 'Failed to fetch surah details.'}</p>;

    const surahData = data.data;

    const playAudio = (ayahNumber) => {
        // Stop the currently playing audio if it's different ayah
        if (currentAudio && playingAyah !== ayahNumber) {
            currentAudio.pause();
            currentAudio.src = ''; // Reset the audio source
            setCurrentAudio(null);
            setIsPlaying(false);
        }

        // Create a new audio instance
        const audio = new Audio(`https://quranaudio.pages.dev/${selectedReader}/${surah}_${ayahNumber}.mp3`);
        setCurrentAudio(audio);
        setPlayingAyah(ayahNumber);

        // Set up event listeners for audio
        audio.addEventListener('loadedmetadata', () => {
            setDuration(audio.duration);
        });

        audio.addEventListener('timeupdate', () => {
            setCurrentTime(audio.currentTime);
        });

        audio.play();
        setIsPlaying(true);

        // Handle audio end event
        audio.addEventListener('ended', () => {
            setIsPlaying(false);
            setPlayingAyah(null);
            setCurrentTime(0);
            setCurrentAudio(null);
        });
    };

    const pauseAudio = () => {
        if (currentAudio) {
            currentAudio.pause();
            setIsPlaying(false);
        }
    };

    const togglePlayPause = (ayahNumber) => {
        if (isPlaying && playingAyah === ayahNumber) {
            pauseAudio();
        } else {
            playAudio(ayahNumber);
        }
    };

    const handleProgressChange = (e) => {
        const newTime = e.target.value;
        if (currentAudio) {
            currentAudio.currentTime = newTime; // Update the audio time based on progress change
            setCurrentTime(newTime); // Update state for current time
        }
    };

    return (
        <div dir='auto' className={`min-h-screen p-8 ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'} transition-colors duration-300`}>
            <button
                onClick={() => router.back()}
                className={`mb-6 px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors ${darkMode ? 'bg-blue-500 hover:bg-blue-600' : ''}`}
            >
                {locale === 'ar' ? 'رجوع' : 'Back'}
            </button>
            <div className={`rounded-lg shadow-lg p-8 ${darkMode ? 'bg-gray-800' : 'bg-white'} transition-colors duration-300`}>
                <h1 className="text-4xl font-bold mb-6 text-center">
                    {locale === 'ar' ? surahData.name : surahData.englishName} ({surahData.name})
                </h1>
                <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 mb-8`}>
                    <div>
                        <p className="text-lg">
                            <strong>{locale === 'ar' ? 'رقم السورة' : 'Surah Number'}:</strong> {surahData.number}
                        </p>
                    </div>
                    <div>
                        <p className="text-lg">
                            <strong>{locale === 'ar' ? 'عدد الآيات' : 'Number of Ayahs'}:</strong> {surahData.numberOfAyahs}
                        </p>
                    </div>
                    <div>
                        <p className="text-lg">
                            <strong>{locale === 'ar' ? 'نوع الوحي' : 'Revelation Type'}:</strong> {surahData.revelationType}
                        </p>
                    </div>
                </div>
                <div>
                    <h2 className="text-2xl font-semibold mb-4 text-center">
                        {locale === 'ar' ? 'الآيات' : 'Ayahs'}
                    </h2>

                    {/* Reader Selection Dropdown */}
                    <div className="mb-4">
                        <label className="block text-lg mb-2">
                            {locale === 'ar' ? 'اختر القارئ' : 'Select Reader'}:
                        </label>
                        <select
                            value={selectedReader}
                            onChange={(e) => setSelectedReader(e.target.value)}
                            className={`p-2 rounded-md ${darkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-200 text-gray-800'}`}
                        >
                            {readers.map((reader) => (
                                <option key={reader.id} value={reader.id}>
                                    {reader.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Ayahs List with Custom Audio Player */}
                    <div className="overflow-y-scroll max-h-80 custom-scrollbar">
                        {surahData.ayahs.map((ayah) => (
                            <div key={ayah.numberInSurah} className={`p-4 rounded-md ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} transition-colors duration-300`}>
                                <div className="flex flex-col">
                                    <p className={`text-lg ${darkMode ? 'text-gray-100' : 'text-gray-800'} break-all`}>
                                        {locale === 'ar' ? ayah.text : (ayah.translation || ayah.text)}
                                    </p>
                                    <p className={`text-sm text-gray-500 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                        {locale === 'ar' ? `آية ${ayah.numberInSurah}` : `Ayah ${ayah.numberInSurah}`}
                                    </p>
                                    {/* Custom Audio Player for each Ayah */}
                                    <div className="flex items-center mt-2">
                                        <button
                                            onClick={() => togglePlayPause(ayah.numberInSurah)}
                                            className={`px-4 py-2 rounded-md ${isPlaying && playingAyah === ayah.numberInSurah ? 'bg-red-600' : 'bg-green-600'} text-white`}
                                        >
                                            {isPlaying && playingAyah === ayah.numberInSurah ? (locale === 'ar' ? 'توقف' : 'Pause') : (locale === 'ar' ? 'تشغيل' : 'Play')}
                                        </button>
                                        {isPlaying && playingAyah === ayah.numberInSurah && (
                                            <input
                                                type="range"
                                                value={currentTime}
                                                max={duration}
                                                onChange={handleProgressChange}
                                                className="mx-4"
                                            />
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SurahDetail;
