const ImageCard = ({
    src = 'https://images.unsplash.com/photo-1502657877623-f66bf489d236?auto=format&fit=crop&w=800',
    title = 'Default Title', // Default value for title
    description = 'Default description', // Default value for description
    width = '200px',
    height = '200px',
}) => {
    return (
        <div className="min-w-[300px] flex-grow">
            <div className="relative rounded-lg overflow-hidden" style={{ width, height }}>
                <img
                    src={src}
                    loading="lazy"
                    alt={description}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-end justify-start bg-black bg-opacity-50 p-4">
                    <div>
                        <h3 className="text-lg text-white font-semibold">{title}</h3>
                        <p className="text-sm text-white">{description}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ImageCard;
