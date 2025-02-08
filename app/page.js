'use client'; // Indicate that this is a Client Component

import { ThemeContext } from '@/components/ThemeContext'; // Import ThemeContext
import Link from 'next/link'; // Import Link from Next.js
import { Suspense, useContext, useEffect, useState } from "react";

import ImageCard from "@/components/ImageCard";
import LoadingPage from "@/components/Landing"; // Import default Loading component
import PodcastIntro from "@/components/podcastIntro"; // Ensure PodcastIntro.js exports default PodcastIntro
import VideoCard from "@/components/VideoCard";
import Virtualslides from "@/components/Virtualslides";
import { useTranslations } from 'next-intl';
import Loading from './loading';
function Page() {
    const { darkMode } = useContext(ThemeContext); // Get dark mode state from ThemeContext
    const [loading, setLoading] = useState(true); // Loading state
    const t = useTranslations();

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false); // After 2 seconds, set loading to false
        }, 2000);

        return () => clearTimeout(timer); // Clean up the timer on unmount
    }, []);

    // Show loading spinner while loading
    if (loading) {
        return <Loading />;
    }
    return (
        <Suspense fallback={<LoadingPage />}>

            <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
                <LoadingPage />

                <PodcastIntro />
                <VideoCard link='/ayah' title={t('ayahs')} description={t('ayahs-desc')} src="/assets/islamic_2.mp4" />
                <VideoCard link='/editions' title={t('Edition ')} description={t('Edition-desc')} poster='/assets/islamic_2.png' src='/assets/islamic_2.mp4' reverse={true} src="/assets/islamic_3.mp4" />
                <ImageCard />
                <Virtualslides />

                {/* Navigation Buttons */}
                <div className="flex flex-wrap justify-center gap-4 p-6">
                    <Link href="/search" className={`bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded shadow transition ${darkMode ? 'bg-blue-600' : ''}`}>
                        Search the Quran
                    </Link>
                    <Link href="/editions" className={`bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded shadow transition ${darkMode ? 'bg-green-600' : ''}`}>
                        View Editions
                    </Link>
                    <Link href="/surahs" className={`bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded shadow transition ${darkMode ? 'bg-purple-600' : ''}`}>
                        Explore Surahs
                    </Link>
                    <Link href="/juz" className={`bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded shadow transition ${darkMode ? 'bg-yellow-600' : ''}`}>
                        Juz Details
                    </Link>
                    <Link href="/sajda" className={`bg-lime-500 hover:bg-lime-600 text-white font-semibold py-2 px-4 rounded shadow transition ${darkMode ? 'bg-lime-600' : ''}`}>
                        Quran Sajda
                    </Link>
                    {/* Add more buttons as needed */}
                </div>
            </div>
        </Suspense>
    );
}

export default Page; // Export the component
