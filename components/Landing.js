'use client'; // Enabling React client-side rendering

import { useTranslations } from 'next-intl'; // Importing translation hook from next-intl
import { useEffect, useRef, useState } from 'react'; // Importing useState and useEffect for auto-scroll logic

export default function LoadingPage() {
    const t = useTranslations();
    const [currentIndex, setCurrentIndex] = useState(0); // Current slide index
    const [isDragging, setIsDragging] = useState(false); // To track if user is dragging
    const [isAutoScrolling, setIsAutoScrolling] = useState(true); // Control auto-scroll
    const slides = [
        { title: t('fantasyText1'), description: t('description1'), image: 'https://swiperjs.com/demos/images/nature-1.jpg' },
        { title: t('fantasyText2'), description: t('description2'), image: 'https://swiperjs.com/demos/images/nature-2.jpg' },
        { title: t('fantasyText3'), description: t('description3'), image: 'https://swiperjs.com/demos/images/nature-3.jpg' },
        { title: t('fantasyText4'), description: t('description4'), image: 'https://swiperjs.com/demos/images/nature-4.jpg' },
    ];

    const sliderRef = useRef(null); // Ref for the slider container
    const autoScrollTimeout = useRef(null); // Ref for the auto-scroll timeout
    const interactionTimeout = useRef(null); // Ref for resuming auto-scroll after interaction
    const [startPosition, setStartPosition] = useState(0); // Start position for dragging

    // Automatically go to the next slide after a certain interval
    useEffect(() => {
        if (isAutoScrolling) {
            autoScrollTimeout.current = setTimeout(() => {
                handleNext();
            }, 6000); // 3 seconds delay for auto scroll
        }

        return () => clearTimeout(autoScrollTimeout.current); // Clean up on unmount
    }, [currentIndex, isAutoScrolling]);

    // Go to the next slide
    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex === slides.length - 1 ? 0 : prevIndex + 1)); // Loop back to first slide
    };

    // Go to the previous slide
    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? slides.length - 1 : prevIndex - 1)); // Loop back to last slide
    };

    // Handle drag/swipe start
    const handleDragStart = (e) => {
        clearTimeout(autoScrollTimeout.current); // Stop auto-scroll when dragging starts
        setIsAutoScrolling(false); // Disable auto-scroll temporarily
        setIsDragging(true); // Set dragging state
        setStartPosition(e.type === 'touchstart' ? e.touches[0].clientX : e.clientX); // Record start position
    };

    // Handle drag/swipe end
    const handleDragEnd = (e) => {
        setIsDragging(false);
        const endPosition = e.type === 'touchend' ? e.changedTouches[0].clientX : e.clientX;

        if (startPosition - endPosition > 50) {
            handleNext(); // Swipe left for next
        } else if (startPosition - endPosition < -50) {
            handlePrev(); // Swipe right for previous
        }

        // Resume auto-scroll after a delay
        interactionTimeout.current = setTimeout(() => {
            setIsAutoScrolling(true); // Re-enable auto-scroll
        }, 3000); // 3 seconds delay before resuming auto scroll
    };

    // Clean up timeouts when the component unmounts
    useEffect(() => {
        return () => {
            clearTimeout(autoScrollTimeout.current);
            clearTimeout(interactionTimeout.current);
        };
    }, []);

    return (
        <div
            className="relative  overflow-hidden w-screen max-w-[100%]"
            ref={sliderRef}
            onMouseDown={handleDragStart}
            onMouseUp={handleDragEnd}
            onTouchStart={handleDragStart}
            onTouchEnd={handleDragEnd}
        >
            {/* Slider */}
            <div
                className="flex transition-transform duration-500 ease-in-out h-[45vh] min-h-fit w-screen"
                style={{ transform: `translateX(-${currentIndex * 100}%)`, width: `100%` }}
            >
                {slides.map((slide, index) => (
                    <div key={index} className="w-full h-full flex-shrink-0 flex flex-col items-center justify-center">
                        <div
                            className="w-full h-full bg-cover bg-center object-cover"
                            style={{ backgroundImage: `url(${slide.image})`, height: '100%' }}
                        >
                            <div dir='auto' className="bg-black bg-opacity-50 p-6 h-full flex flex-col justify-center">
                                <h2 className="text-4xl text-start text-white shadow-lg">{slide.title}</h2>
                                <p className="text-2xl text-start text-white shadow-md mt-2">{slide.description}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>





            <style jsx>{`
                .slider-container {
                    width: 100%;
                    height: 100%;
                    display: flex;
                    overflow: hidden;
                }
                .slide {
                    flex-shrink: 0;
                    width: 100%;
                    height: 100%;
                    background-size: cover;
                    background-position: center;
                }
            `}</style>
        </div>
    );
}
