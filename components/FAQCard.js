import Link from "next/link";

export default function FAQCard() {
    return (
        <div className="max-w-full m-auto w-96 bg-gray-800 text-white shadow-md rounded-lg overflow-hidden resize-x flex flex-col md:flex-row">
            {/* Left section */}
            <div className="flex flex-col justify-center bg-blue-600 p-6 flex-shrink-0 w-full md:w-48">
                <p className="text-4xl font-bold">89</p>
                <p className="text-blue-200">FAQs answered, see if yours is one of them.</p>
            </div>

            {/* Right section */}
            <div className="flex flex-col p-4 space-y-4 w-full">
                {/* Image */}
                <div className="relative aspect-w-19 aspect-h-8">
                    <img
                        alt="FAQ Illustration"
                        src="https://static.vecteezy.com/system/resources/previews/006/409/485/original/people-thinking-to-make-decision-problem-solving-and-find-creative-ideas-with-question-mark-in-flat-cartoon-background-for-poster-illustration-vector.jpg"
                        className="object-contain"
                    />
                </div>

                {/* Text content */}
                <div className="text-left">
                    <p className="text-lg font-semibold">Need Some Help?</p>
                    <p className="text-sm mt-1 text-gray-300">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.
                    </p>
                </div>

                {/* Button */}
                <Link href='/faq' className="border-2 border-blue-500 text-blue-500 rounded-full px-6 py-2 mx-auto hover:bg-blue-600 hover:text-white transition duration-300">
                    See FAQ
                </Link>
            </div>
        </div>
    );
}
