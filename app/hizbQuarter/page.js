'use client';

import Loading from '@/app/loading';
import { LanguageContext } from '@/components/LanguageContext';
import { ThemeContext } from '@/components/ThemeContext';
import axios from 'axios';
import { useTranslations } from 'next-intl';
import { useContext, useEffect, useState } from 'react';

export default function HizbQuarterPage() {
    const [hizbQuarter, setHizbQuarter] = useState([]);
    const [selectedHizb, setSelectedHizb] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { darkMode } = useContext(ThemeContext);
    const { locale } = useContext(LanguageContext) || { locale: 'en' }; // قيمة افتراضية
    const t = useTranslations();

    const fetchHizbQuarter = async (hizbNumber) => {
        setLoading(true);
        setError(null);
        try {
            const edition = locale === 'ar' ? 'quran-uthmani' : 'en.asad';
            const response = await axios.get(`https://api.alquran.cloud/v1/hizbQuarter/${hizbNumber}`, {
                params: { edition }
            });

            if (response.data.code === 200) {
                setHizbQuarter(response.data.data.ayahs);
                setSelectedHizb(hizbNumber);
            } else {
                setError(t('fetchError'));
            }
        } catch (err) {
            setError(t('fetchError'));
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (selectedHizb) fetchHizbQuarter(selectedHizb);
    }, [selectedHizb, locale]);

    const handleHizbChange = (e) => {
        const hizbNumber = Number(e.target.value);
        if (hizbNumber) fetchHizbQuarter(hizbNumber);
    };

    return (
        <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-100'} p-6 transition-colors duration-300`}>
            <h1 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-gray-100">
                {t('hizbQuarterDetails')}
            </h1>

            {/* اختيار الحزب */}
            <div className="flex justify-center mb-6">
                <select
                    value={selectedHizb}
                    onChange={handleHizbChange}
                    className={`p-2 rounded-md border ${darkMode ? 'border-gray-700 bg-gray-800 text-gray-100' : 'border-gray-300 bg-white text-gray-800'}`}
                >
                    {Array.from({ length: 240 }, (_, i) => i + 1).map((hizbNumber) => (
                        <option key={hizbNumber} value={hizbNumber}>
                            {t('hizbQuarter')} {hizbNumber}
                        </option>
                    ))}
                </select>
            </div>

            {/* عرض البيانات */}
            {loading ? (
                <Loading />
            ) : error ? (
                <div className="text-red-500 text-center">{error}</div>
            ) : (
                <div className="space-y-4">
                    {hizbQuarter.map((ayah) => (
                        <div key={ayah.number} className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow p-4`}>
                            <p className={`text-lg text-center ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>
                                {ayah.text}
                            </p>
                            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'} mt-2`}>
                                {t('surah')} {ayah.surah.number}: {t('ayah')} {ayah.numberInSurah}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
