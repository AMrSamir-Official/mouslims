"use client"; // Mark this component as a Client Component

import { ThemeContext } from '@/components/ThemeContext'; // Import ThemeContext
import { chanels } from "@/Constant/chanels"; // Import your channels data
import Image from "next/image"; // Use Next.js Image component
import Link from "next/link";
import { useContext, useEffect, useState } from "react";

const ChannelsPage = () => {
  const [loading, setLoading] = useState(true);
  const { darkMode } = useContext(ThemeContext); // Get darkMode from context

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer); // Clear the timeout on unmount
  }, []);

  return (
    <div className={`p-4 pt-24 flex flex-wrap justify-center gap-4 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
      {chanels.map((chanel, index) => (
        <div
          key={index}
          className={`max-w-xs bg-transparent border-2 rounded-lg overflow-hidden relative shadow-lg transition-transform transform hover:scale-105 ${darkMode ? 'border-white' : 'border-gray-800'}`}
        >
          {/* Background Image */}
          {loading ? (
            <div className={`animate-pulse ${darkMode ? 'bg-gray-800' : 'bg-gray-300'} h-48 w-full`} />
          ) : (
            <Image
              src={chanel.BackGround}
              alt={chanel.Name}
              layout="responsive" // Use responsive layout for the background image
              width={345}
              height={180}
              className={`h-48 w-full object-cover filter ${darkMode ? 'brightness-75' : 'brightness-100'}`}
            />
          )}
          {/* Profile Image */}
          {loading ? (
            <div className={`animate-pulse rounded-full ${darkMode ? 'bg-gray-800' : 'bg-gray-300'} h-20 w-20 absolute top-36 left-1/2 transform -translate-x-1/2`} />
          ) : (
            <Image
              src={chanel.Img}
              alt={chanel.Name}
              layout="fixed" // Fixed layout for the profile image
              width={80}
              height={80}
              className={`h-20 w-20 rounded-full border-4 absolute top-36 left-1/2 transform -translate-x-1/2 ${darkMode ? 'border-white' : 'border-gray-800'}`}
            />
          )}
          <div className={`text-center mt-8 ${darkMode ? 'text-white' : 'text-black'}`}>
            {loading ? (
              <div className={`animate-pulse ${darkMode ? 'bg-gray-800' : 'bg-gray-300'} h-6 w-2/3 mx-auto`} />
            ) : (
              <h3 className={`font-bold text-xl drop-shadow-md ${darkMode ? 'text-white' : 'text-black'}`}>{chanel.Name}</h3>
            )}
            {loading ? (
              <div className={`animate-pulse ${darkMode ? 'bg-gray-800' : 'bg-gray-300'} h-4 w-4/5 mx-auto mt-2`} />
            ) : (
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{chanel.About}</p>
            )}
          </div>
          <div className="flex justify-center mt-4 space-x-2">
            {loading ? (
              <div className={`animate-pulse ${darkMode ? 'bg-gray-800' : 'bg-gray-300'} h-8 w-32 rounded mx-1`} />
            ) : (
              chanel.Link && (
                <Link href={`/Channels/${chanel.id}`} className={`px-4 py-2 rounded-lg shadow transition-all duration-300 ${darkMode ? 'bg-blue-500 text-white hover:bg-blue-400' : 'bg-blue-200 text-black hover:bg-blue-300'}`}>
                  View Playlists
                </Link>
              )
            )}
            {loading ? (
              <div className={`animate-pulse ${darkMode ? 'bg-gray-800' : 'bg-gray-300'} h-8 w-32 rounded mx-1`} />
            ) : (
              chanel.payBal && (
                <a
                  href={chanel.payBal}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`border-2 rounded-lg shadow transition-all duration-300 ${darkMode ? 'border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white' : 'border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white'}`}
                >
                  Support on PayPal
                </a>
              )
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChannelsPage;
