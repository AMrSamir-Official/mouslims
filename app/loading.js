// components/Loading.js


const Loading = () => {

    return (
        <div className="flex items-center justify-center min-h-screen bg-[#11182740]">
            <div className="relative">
                <div className="animate-spin rounded-full h-24 w-24 border-8 border-solid border-blue-500 border-t-transparent"></div>
                <div className="absolute top-0 left-0 h-24 w-24 rounded-full border-8 border-dashed border-gray-300 animate-pulse"></div>
            </div>

        </div>
    );
};

export default Loading;
