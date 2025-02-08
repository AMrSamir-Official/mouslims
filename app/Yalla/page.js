'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const languages = ['ar', 'eng', 'fr', 'ru', 'de', 'es', 'tr', 'cn', 'th', 'ur', 'bn', 'bs', 'ug', 'fa', 'tg', 'ml', 'tl', 'id', 'pt', 'ha', 'sw'];
const rewayas = [
    { id: 1, name: "Hafs A'n Assem" },
    { id: 5, name: "Warsh A’n Nafi’" },
    { id: 2, name: "Qalon A’n Nafi’" },
    // Add more rewayas as needed
];
const surahs = [
    { id: 18, name: "Al-Kahf" },
    // Add more surahs as needed
];

const OverviewPage = () => {
    const router = useRouter();
    const [reciters, setReciters] = useState([]);
    const [language, setLanguage] = useState('ar');
    const [reciterId, setReciterId] = useState('');
    const [rewayaId, setRewayaId] = useState('');
    const [suraId, setSuraId] = useState('');

    const fetchReciters = async () => {
        const queryParams = new URLSearchParams();
        queryParams.append('language', language);
        if (reciterId) queryParams.append('reciter', reciterId);
        if (rewayaId) queryParams.append('rewaya', rewayaId);
        if (suraId) queryParams.append('sura', suraId);

        const res = await fetch(`https://mp3quran.net/api/v3/reciters?${queryParams}`);
        const data = await res.json();
        setReciters(data.reciters || []);
    };

    const navigateToReciter = (reciter) => {
        router.push(`/reciter/${reciter.id}`);
    };

    useEffect(() => {
        fetchReciters();
    }, [language, reciterId, rewayaId, suraId]);

    return (
        <div className="p-6 bg-gray-100 dark:bg-gray-900 min-h-screen flex flex-col justify-start">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">عرض القراء</h1>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
                هنا يمكنك عرض كل أسماء القراء مع عدة خيارات متنوعة:
            </p>
            <div className="mb-4">
                <label className="block mb-2 text-gray-800 dark:text-white">اختر لغة:</label>
                <select value={language} onChange={(e) => setLanguage(e.target.value)} className="border border-gray-300 rounded p-2 dark:bg-gray-800 dark:text-white">
                    {languages.map((lang) => (
                        <option key={lang} value={lang}>{lang}</option>
                    ))}
                </select>
            </div>

            <div className="mb-4">
                <label className="block mb-2 text-gray-800 dark:text-white">اختر رقم القارئ:</label>
                <input
                    type="number"
                    value={reciterId}
                    onChange={(e) => setReciterId(e.target.value)}
                    className="border border-gray-300 rounded p-2 dark:bg-gray-800 dark:text-white"
                    placeholder="رقم القارئ"
                />
            </div>

            <div className="mb-4">
                <label className="block mb-2 text-gray-800 dark:text-white">اختر رواية:</label>
                <select value={rewayaId} onChange={(e) => setRewayaId(e.target.value)} className="border border-gray-300 rounded p-2 dark:bg-gray-800 dark:text-white">
                    <option value="">اختر رواية</option>
                    {rewayas.map((rewaya) => (
                        <option key={rewaya.id} value={rewaya.id}>{rewaya.name}</option>
                    ))}
                </select>
            </div>

            <div className="mb-4">
                <label className="block mb-2 text-gray-800 dark:text-white">اختر سورة:</label>
                <select value={suraId} onChange={(e) => setSuraId(e.target.value)} className="border border-gray-300 rounded p-2 dark:bg-gray-800 dark:text-white">
                    <option value="">اختر سورة</option>
                    {surahs.map((sura) => (
                        <option key={sura.id} value={sura.id}>{sura.name}</option>
                    ))}
                </select>
            </div>

            <button
                onClick={fetchReciters}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-200 mb-6"
            >
                عرض القراء
            </button>

            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">القراء:</h2>
            <ul className="list-disc pl-5">
                {reciters.map((reciter) => (
                    <li key={reciter.id} className="text-gray-800 dark:text-white mb-2 flex justify-between">
                        <span>{reciter.name} - {reciter.letter}</span>
                        <button
                            onClick={() => navigateToReciter(reciter)}
                            className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition duration-200"
                        >
                            السور
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default OverviewPage;
