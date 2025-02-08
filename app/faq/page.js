// app/faq/page.js

// Add "use client" directive to use state hooks
"use client";

import React from 'react';

const faqData = [
    {
        question: "What is E-Edition?",
        answer: "Available text and audio editions of the Quran for accessible learning.",
    },
    {
        question: "How can I get a complete Quran edition?",
        answer: "You can request the complete Quran edition from our services.",
    },
    {
        question: "How can I get a Juz of the Quran?",
        answer: "Request a Juz to study and recite specific sections of the Quran.",
    },
    {
        question: "How can I get a Surah of the Quran?",
        answer: "You can request individual Surahs for focused study.",
    },
    {
        question: "How can I get an Ayah of the Quran?",
        answer: "You can get specific Ayahs for detailed exploration and memorization.",
    },
    {
        question: "How can I search the text of the Quran?",
        answer: "Use our search feature to find specific verses or topics within the Quran.",
    },
    {
        question: "What is Manzil?",
        answer: "Manzil refers to a specific compilation of Quranic verses for daily recitation.",
    },
    {
        question: "How can I get a Ruku of the Quran?",
        answer: "Request a Ruku to read specific sections of the Quran that cover particular themes.",
    },
    {
        question: "How can I get a Page of the Quran?",
        answer: "Request a specific page of the Quran for easier reference.",
    },
    {
        question: "What is Hizb Quarter?",
        answer: "A Hizb Quarter is a section of the Quran that divides the text into manageable portions for recitation.",
    },
    {
        question: "What are Sajda verses?",
        answer: "Sajda verses are specific Ayahs that require prostration during recitation.",
    },
    {
        question: "What is Meta data?",
        answer: "Meta data includes additional information about Surahs, Pages, Hizbs, and Juzs for better understanding.",
    },
];

export default function FAQPage() {
    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-center mb-6">Frequently Asked Questions</h1>

            <div className="space-y-4">
                {faqData.map((faq, index) => (
                    <Accordion key={index} question={faq.question} answer={faq.answer} />
                ))}
            </div>
        </div>
    );
}

const Accordion = ({ question, answer }) => {
    const [isOpen, setIsOpen] = React.useState(false);

    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="border border-gray-700 rounded-lg">
            <button
                onClick={toggleAccordion}
                className="flex justify-between items-center w-full p-4 text-left bg-gray-700 text-white rounded-lg hover:bg-gray-600 focus:outline-none"
            >
                <span className="text-lg font-medium">{question}</span>
                <span>{isOpen ? '−' : '+'}</span>
            </button>
            <div
                className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                    }`}
            >
                <div className="p-4 bg-gray-800 text-gray-300 rounded-b-lg">
                    <p>{answer}</p>
                </div>
            </div>
        </div>
    );
}
