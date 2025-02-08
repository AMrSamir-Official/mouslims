import { useEffect, useRef } from 'react';

const CustomAudioPlayer = ({ audioSrc, onPlay, onPause, isPlaying, title }) => {
    const audioRef = useRef(null);

    useEffect(() => {
        if (isPlaying) {
            audioRef.current.play();
            onPlay();
        } else {
            audioRef.current.pause();
            onPause();
        }
    }, [isPlaying, onPlay, onPause]);

    return (
        <div className="flex flex-col items-center bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mt-4">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">{title}</h2>
            <audio ref={audioRef} src={audioSrc}>
                Your browser does not support the audio tag.
            </audio>
            <div className="flex items-center mt-4">
                <button
                    className={`p-2 rounded-full ${isPlaying ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'
                        } text-white`}
                    onClick={onPlay}
                >
                    {isPlaying ? 'Pause' : 'Play'}
                </button>
            </div>
        </div>
    );
};

export default CustomAudioPlayer;
