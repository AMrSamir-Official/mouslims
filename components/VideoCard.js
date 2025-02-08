import { useTranslations } from 'next-intl';
import Link from 'next/link';

const VideoCard = ({
    src = '/assets/islamic_4.mp4',
    poster = '/assets/islamic_1.png',
    title = 'Default Title',
    description = 'Default description',
    width = '350px',
    height = '200px',
    link = '/next-page', // Default link to navigate
    reverse = false, // New prop to control the layout direction
}) => {
    const t = useTranslations();

    return (
        <div dir='auto' className={`flex flex-col text-start  md:flex-row ${reverse ? 'md:flex-row-reverse' : ''} justify-between items-center space-y-6 md:space-y-0 p-6 rounded-lg shadow-lg`}>
            {/* Title and Description on the left or right */}
            <div className="md:w-1/2 flex flex-col justify-center text-left space-y-4">
                <h3 className="text-3xl text-start   font-bold text-gray-800 dark:text-white">{title}</h3>
                <p className="text-lg text-gray-600  text-start  dark:text-gray-300">{description}</p>
                <Link href={link} passHref>
                    <div className="flex items-center mt-4 text-blue-600 cursor-pointer">
                        <span className="text-lg font-semibold">{t('Explore')} {title}</span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="size-4">
                            <path fill-rule="evenodd" d="M4.22 11.78a.75.75 0 0 1 0-1.06L9.44 5.5H5.75a.75.75 0 0 1 0-1.5h5.5a.75.75 0 0 1 .75.75v5.5a.75.75 0 0 1-1.5 0V6.56l-5.22 5.22a.75.75 0 0 1-1.06 0Z" clip-rule="evenodd" />
                        </svg>


                    </div>
                </Link>
            </div>

            {/* Video on the right or left */}
            <div className="md:w-1/2 flex justify-center">
                <div className="relative rounded-lg overflow-hidden" style={{ width, height }}>
                    <video
                        autoPlay
                        loop
                        muted
                        poster={poster}
                        className="w-full h-full object-cover"
                    >
                        <source src={src} type="video/mp4" />
                    </video>
                </div>
            </div>
        </div>
    );
};

export default VideoCard;
