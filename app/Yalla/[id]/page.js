'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const ReciterPage = ({ params }) => {
    const router = useRouter();
    const reciterId = params.id;
    const [surahs, setSurahs] = useState([]);

    const fetchSurahs = async () => {
        const res = await fetch(`https://mp3quran.net/api/v3/reciters/${reciterId}/suras`);
        const data = await res.json();
        setSurahs(data.suras || []);
    };

    useEffect(() => {
        fetchSurahs();
    }, [reciterId]);

    return (
        <div className="p-6 bg-gray-100 dark:bg-gray-900 min-h-screen">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">القراءة من القارئ</h1>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">السور المتاحة:</h2>
            <ul className="list-disc pl-5">
                {surahs.map((sura) => (
                    <li key={sura.id} className="text-gray-800 dark:text-white mb-2">
                        {sura.name}
                    </li>
                ))}
            </ul>
            <button
                onClick={() => router.back()}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-200"
            >
                العودة
            </button>
        </div>
    );
};

export default ReciterPage;
