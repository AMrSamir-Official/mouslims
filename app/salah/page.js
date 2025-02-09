'use client'

import { motion } from 'framer-motion';
import Image from 'next/image';

const SalahPage = () => {
    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <motion.h1
                className="text-2xl font-bold mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                Getting Started
            </motion.h1>
            <motion.p
                className="mb-4"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                Now that our wudu has been properly made, we can proceed and begin to pray Salah. Here are the steps of the Salah:
            </motion.p>

            <ol className="list-decimal list-inside mb-4">
                <li>Standing</li>
                <li>Takbir</li>
                <li>Fatihah – Recitation</li>
                <li>Ruku – Bowing</li>
                <li>Sujud – Prostration</li>
                <li>Tashahud – Sitting</li>
            </ol>
            <p className="mb-4">
                To understand the steps of the Salah, it is important to understand that the prayer is made up of rakah, or units of prayer. Every rakah has the same basic steps within it.
            </p>
            <p className="mb-4">
                Depending on which prayer you are performing, there will be slight differences in how these rakah are performed:
            </p>
            <ul className="list-disc list-inside mb-4">
                <li>Fajr – has two rakah, or two units</li>
                <li>Dhur – has four rakah</li>
                <li>Asr – has four rakah</li>
                <li>Maghrib – has three rakah</li>
                <li>Isha – has four rakah</li>
            </ul>
            <h2 className="text-xl font-semibold mb-4">Learning How to Pray: One Rakah at a Time</h2>
            <h3 className="text-lg font-semibold mb-2">Table of Contents</h3>
            <ol className="list-decimal list-inside mb-4">
                <li>Make your intention to pray</li>
                <li>Raise your hands to your ears and say Allahu Akbar</li>
                <li>Place your hands over your chest</li>
                <li>Keep your eyes focused on the ground</li>
                <li>Recite the opening chapter of the Qur’an</li>
                <li>Perform the ruku (bowing down)</li>
                <li>Return to standing up again</li>
                <li>Perform the sujud (prostration)</li>
                <li>Say this phrase in sujud</li>
                <li>Rise up from sujud and sit for a moment</li>
                <li>Perform sujud again and then return to a standing position</li>
                <li>Perform the tashahud</li>
            </ol>

            {/* Step 1 */}
            <motion.h3 className="text-lg font-semibold mb-2" initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }}>Step 1 – Make your intention to pray</motion.h3>
            <p className="mb-4">
                We first began the prayer by making an intention from the heart to pray to Allah...
            </p>
            <Image
                src="https://media.istockphoto.com/id/1291513028/photo/muslim-man-in-prayer.jpg?s=612x612&w=0&k=20&c=KxKmgOBbgu22k9or3qE4HnTe2vFYeShRgTcRMrBZT1E="
                alt="Step 1: Make your intention"
                width={500}
                height={300}
                className="rounded-lg mb-4"
            />

            {/* Step 2 */}
            <motion.h3 className="text-lg font-semibold mb-2" initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }}>Step 2 – Raise your hands to your ears and say ‘Allahu Akbar’</motion.h3>
            <p className="mb-4">
                The moment you say “Allahu Akbar” the prayer will officially begin...
            </p>
            <Image
                src="https://image.shutterstock.com/image-photo/man-raising-hands-praying-islam-260nw-1546650188.jpg"
                alt="Step 2: Takbir"
                width={500}
                height={300}
                className="rounded-lg mb-4"
            />

            {/* Step 3 */}
            <motion.h3 className="text-lg font-semibold mb-2" initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }}>Step 3 – Place your hands over your chest</motion.h3>
            <p className="mb-4">Lower your hands and place them over your naval...</p>
            <Image
                src="https://img.freepik.com/free-photo/muslim-man-doing-prayer_23-2147751287.jpg"
                alt="Step 3: Hands Position"
                width={500}
                height={300}
                className="rounded-lg mb-4"
            />

            {/* Step 4 */}
            <motion.h3 className="text-lg font-semibold mb-2" initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }}>Step 4 – Keep your eyes focused on the ground</motion.h3>
            <p className="mb-4">Prophet Muhammad (peace be upon him) said that while you are praying, your eyes should always look to where you will prostrate.</p>
            <Image
                src="https://media.istockphoto.com/id/1286464400/photo/muslim-man-focusing-on-prayer.jpg?s=612x612&w=0&k=20&c=xsURB4DwHR2FZGuCz4Y_3_oPLb8PEuyU_JDW08HZ8ds="
                alt="Step 4: Eyes Position"
                width={500}
                height={300}
                className="rounded-lg mb-4"
            />

            {/* Step 5 */}
            <motion.h3 className="text-lg font-semibold mb-2" initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }}>Step 5 – Recite the opening chapter of the Qur’an</motion.h3>
            <p className="mb-4">
                The first chapter of the Qur’an is called Surah Fatihah...
            </p>
            <Image
                src="https://www.mymasjid.ca/wp-content/uploads/2017/03/reciting-Quran.jpg"
                alt="Step 5: Reciting Quran"
                width={500}
                height={300}
                className="rounded-lg mb-4"
            />

            {/* Step 6 */}
            <motion.h3 className="text-lg font-semibold mb-2" initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }}>Step 6 – Perform the ruku (bowing down)</motion.h3>
            <p className="mb-4">
                As you are bowing down say ‘Allahu Akbar’...
            </p>
            <Image
                src="https://www.mymasjid.ca/wp-content/uploads/2017/03/make-ruku-prostration.jpg"
                alt="Step 6: Ruku"
                width={500}
                height={300}
                className="rounded-lg mb-4"
            />

            {/* Step 7 */}
            <motion.h3 className="text-lg font-semibold mb-2" initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }}>Step 7 – Return to standing up again</motion.h3>
            <p className="mb-4">
                As you are rising up from the ruku position...
            </p>
            <Image
                src="https://www.mymasjid.ca/wp-content/uploads/2017/03/rising-from-ruku.jpg"
                alt="Step 7: Standing Up"
                width={500}
                height={300}
                className="rounded-lg mb-4"
            />

            {/* Step 8 */}
            <motion.h3 className="text-lg font-semibold mb-2" initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }}>Step 8 – Go down to perform prostration</motion.h3>
            <p className="mb-4">Say “Allahu Akbar” as you are going into sujud.</p>
            <Image
                src="https://www.mymasjid.ca/wp-content/uploads/2017/03/prostration.jpg"
                alt="Step 8: Sujud"
                width={500}
                height={300}
                className="rounded-lg mb-4"
            />

            {/* Step 9 */}
            <motion.h3 className="text-lg font-semibold mb-2" initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }}>Step 9 – Say this phrase in sujud</motion.h3>
            <p className="mb-4">While you are in sujud, say “SubhanaKa Allahumma wa bihamdiKa, wa tabaarak-asmuKa, wa ta-‘aala jadduKa, wa la ilaaha ghayruK.”</p>

            {/* Step 10 */}
            <motion.h3 className="text-lg font-semibold mb-2" initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }}>Step 10 – Rise up from sujud and sit for a moment</motion.h3>
            <p className="mb-4">
                Say “Allahu Akbar” while going back into the sitting position.
            </p>

            {/* Step 11 */}
            <motion.h3 className="text-lg font-semibold mb-2" initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }}>Step 11 – Perform sujud again</motion.h3>
            <p className="mb-4">As you go down for sujud again, say “Allahu Akbar”.</p>

            {/* Step 12 */}
            <motion.h3 className="text-lg font-semibold mb-2" initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }}>Step 12 – Finally, perform the tashahud</motion.h3>
            <p className="mb-4">
                This is the final sitting of your prayer...
            </p>

            <motion.footer className="mt-8 text-sm text-gray-500">
                <p>© 2024 Islamic Prayers Guide</p>
            </motion.footer>
        </div>
    );
};

export default SalahPage;
