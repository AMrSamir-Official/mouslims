// app/overview/page.js
'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

async function fetchVideos() {
    const res = await fetch('https://mp3quran.net/api/v3/videos?language=ar', {
        cache: 'no-store',
    });
    if (!res.ok) {
        throw new Error('Failed to fetch videos');
    }
    return res.json();
}

export default function Overview() {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        const getVideos = async () => {
            const data = await fetchVideos();
            setVideos(data.videos);
        };

        getVideos();
    }, []);

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-6">
                يمكنك هنا استعراض الفيديوهات بحسب تاريخ الإضافة ، (الأحدث أولا)
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {videos.map((reciter) =>
                    reciter.videos.map((video) => (
                        <div
                            key={video.id}
                            className="bg-white shadow-md p-4 rounded-lg dark:bg-gray-800"
                        >
                            <img
                                src={video.video_thumb_url}
                                alt={`Thumbnail of ${reciter.reciter_name}`}
                                className="mb-4 w-full h-40 object-cover rounded"
                            />
                            <h2 className="text-xl font-semibold mb-2">
                                {reciter.reciter_name}
                            </h2>
                            <Link
                                href={`/overview/${video.id}`}
                                className="text-blue-500 hover:underline"
                            >
                                شاهد الفيديو
                            </Link>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
