// components/CustomSwiper.js
import PodcastIntro from '@/components/podcastIntro';
import 'swiper/css'; // استيراد الأنماط الأساسية من Swiper
import 'swiper/css/navigation'; // استيراد أنماط التنقل
import 'swiper/css/pagination'; // استيراد أنماط الترقيم

export default function CustomSwiper() {
    return (
        <div>
            <PodcastIntro />
            <div className="w-full">

                <div className="text-center mb-8">
                    <h6 id="ii67h-2" className="subheadline secondary-color-c text-lg font-semibold">
                        Subscribe & Listen
                    </h6>
                    <h2 id="ic2vl-2" className="text-3xl font-bold">
                        Popular Episodes
                    </h2>

                </div>




            </div>
        </div >
    );
}
