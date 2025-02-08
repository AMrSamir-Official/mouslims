// app/overview/[videoId]/page.js
'use client';
import { useEffect, useRef, useState } from 'react';

async function fetchVideoById(id) {
    const res = await fetch('https://mp3quran.net/api/v3/videos?language=ar', {
        cache: 'no-store',
    });
    const data = await res.json();

    for (const reciter of data.videos) {
        for (const video of reciter.videos) {
            if (video.id == id) {
                return {
                    video,
                    reciterName: reciter.reciter_name,
                };
            }
        }
    }
    return null;
}

export default function VideoPage({ params }) {
    const { videoId } = params;
    const [videoData, setVideoData] = useState(null);
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(1); // Default volume (1 = 100%)

    useEffect(() => {
        const getVideoData = async () => {
            const data = await fetchVideoById(videoId);
            if (data) {
                setVideoData(data);
            }
        };

        getVideoData();
    }, [videoId]);

    const handlePlayPause = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const handleVolumeChange = (e) => {
        const newVolume = e.target.value;
        setVolume(newVolume);
        if (videoRef.current) {
            videoRef.current.volume = newVolume;
        }
    };

    if (!videoData) {
        return <p>Loading...</p>;
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-900 p-4">
            <h1 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
                {videoData.reciterName}
            </h1>
            <div className="relative w-full max-w-2xl bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                <video
                    ref={videoRef}
                    className="w-full h-64 object-cover"
                    src={videoData.video.video_url}
                    onEnded={() => setIsPlaying(false)}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                    <button
                        onClick={handlePlayPause}
                        className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition duration-200"
                    >
                        {isPlaying ? '❚❚' : '▶'}
                    </button>
                </div>
            </div>
            <div className="flex items-center mt-4 w-full max-w-2xl">
                <label htmlFor="volume" className="mr-2 text-gray-800 dark:text-white">Volume:</label>
                <input
                    type="range"
                    id="volume"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={handleVolumeChange}
                    className="w-full"
                />
            </div>
        </div>
    );
}
