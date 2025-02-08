'use client'; // Indicate that this is a Client Component

import Spinner from '@/components/Landing';
import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';

function RadioPlayerPage() {
    const [radios, setRadios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedRadio, setSelectedRadio] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [audio, setAudio] = useState(null); // Track the audio element

    useEffect(() => {
        const fetchRadios = async () => {
            try {
                const response = await axios.get('https://mp3quran.net/api/v3/radios', {
                    params: {
                        language: 'eng', // Optional: you can change the language here
                    },
                });
                if (response.data.radios) {
                    setRadios(response.data.radios);
                } else {
                    setError('Failed to fetch radio stations.');
                }
            } catch (err) {
                setError('An error occurred while fetching radio stations.');
            } finally {
                setLoading(false);
            }
        };

        fetchRadios();
    }, []);

    const handleRadioChange = (e) => {
        const radioId = e.target.value;
        const radio = radios.find((radio) => radio.id === parseInt(radioId));

        // Reset audio state if a new radio is selected
        if (audio) {
            audio.pause(); // Pause previous audio
            audio.src = ''; // Clear the source
        }

        setSelectedRadio(radio);
        setIsPlaying(false); // Reset playing state

        if (radio) {
            const newAudio = new Audio(radio.url); // Create a new Audio instance
            setAudio(newAudio); // Set audio state
        }
    };

    const handlePlay = () => {
        if (audio) {
            audio.play();
            setIsPlaying(true);
        }
    };

    const handlePause = () => {
        if (audio) {
            audio.pause();
            setIsPlaying(false);
        }
    };

    // Cleanup audio on unmount
    useEffect(() => {
        return () => {
            if (audio) {
                audio.pause();
                audio.src = ''; // Reset the audio src
            }
        };
    }, [audio]);

    if (loading) {
        return <Spinner />; // Show loading spinner
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
                <p className="text-red-500 text-lg">{error}</p>
                <Link href="/" className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
                    Go Back Home
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100 p-6">
            <h1 className="text-3xl font-bold mb-6 text-center">Listen to Radio</h1>
            <div className="bg-gray-800 rounded-lg shadow-lg p-6">
                <label htmlFor="radio-select" className="block mb-4">Select a Radio Station:</label>
                <select
                    id="radio-select"
                    onChange={handleRadioChange}
                    className="p-2 rounded-md border border-gray-700 bg-gray-700 text-gray-200 mb-4"
                >
                    <option value="">-- Select Radio --</option>
                    {radios.map((radio) => (
                        <option key={radio.id} value={radio.id}>
                            {radio.name}
                        </option>
                    ))}
                </select>

                {selectedRadio && (
                    <div className="flex flex-col items-center mt-6">
                        <div className="bg-gray-600 rounded-lg p-4 w-full text-center">
                            <h2 className="text-lg font-semibold">{selectedRadio.name}</h2>
                            <div className="flex items-center justify-center mt-4">
                                <button
                                    className={`bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded ${isPlaying ? 'hidden' : ''}`}
                                    onClick={handlePlay}
                                >
                                    Play
                                </button>
                                <button
                                    className={`bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded ${isPlaying ? '' : 'hidden'}`}
                                    onClick={handlePause}
                                >
                                    Pause
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <div className="mt-6 text-center">
                <Link href="/" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
                    Go Back Home
                </Link>
            </div>
        </div>
    );
}

export default RadioPlayerPage; // Export the component
