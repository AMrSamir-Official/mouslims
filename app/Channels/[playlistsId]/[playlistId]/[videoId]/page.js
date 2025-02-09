"use client";
import scrollToTop from "@/hooks/scrollToTop"; // تأكد من أن هذا الهوك موجود
import axios from "axios";
import { useRouter } from 'next/router'; // استخدام useRouter بدلاً من useNavigate
import { useEffect, useState } from "react";

const API_KEY = "AIzaSyAB9dG_zzrdvTcfVFlGbkZ_GQjPhqPE1yQ";
const defaultThumbnail = "https://via.placeholder.com/300x200?text=No+Thumbnail";

const PlaylistVideosPage = ({ playlistId }) => {
    const router = useRouter();
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortOrder, setSortOrder] = useState("default");
    useEffect(() => {
        const fetchVideos = async () => {
            let allVideos = [];
            let nextPageToken = null;

            try {
                do {
                    const response = await axios.get(
                        `https://www.googleapis.com/youtube/v3/playlistItems`,
                        {
                            params: {
                                part: "snippet",
                                playlistId: playlistId,
                                maxResults: 25,
                                pageToken: nextPageToken,
                                key: API_KEY,
                            },
                        }
                    );

                    const fetchedVideos = response.data.items.map((video) => {
                        const thumbnail =
                            video.snippet.thumbnails?.high?.url || defaultThumbnail;
                        return {
                            id: video.snippet.resourceId.videoId,
                            title: video.snippet.title,
                            thumbnail: thumbnail,
                            description:
                                video.snippet.description || "No description available",
                            publishedAt: video.snippet.publishedAt,
                            videoUrl: `https://www.youtube.com/watch?v=${video.snippet.resourceId.videoId}`,
                        };
                    });

                    allVideos = [...allVideos, ...fetchedVideos];
                    nextPageToken = response.data.nextPageToken;
                } while (nextPageToken);

                setVideos(allVideos);
            } catch (error) {
                console.error("Error fetching videos:", error);
                setError("Error fetching videos");
            } finally {
                setLoading(false);
            }
        };

        fetchVideos();
    }, [playlistId]);

    useEffect(() => {
        scrollToTop(); // تأكد من استخدام هذا الهوك في المكان الصحيح
    }, []);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSort = (event) => {
        setSortOrder(event.target.value);
    };

    const filteredVideos = videos
        .filter((video) =>
            video.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => {
            if (sortOrder === "title-asc") {
                return a.title.localeCompare(b.title);
            } else if (sortOrder === "title-desc") {
                return b.title.localeCompare(a.title);
            } else if (sortOrder === "newest") {
                return new Date(b.publishedAt) - new Date(a.publishedAt);
            } else if (sortOrder === "oldest") {
                return new Date(a.publishedAt) - new Date(b.publishedAt);
            }
            return 0; // default order
        });

    const handleVideoClick = (videoUrl) => {
        const videoId = videoUrl.split("v=")[1];
        router.push(`/video/${videoId}`); // التوجيه باستخدام next/router
    };

    if (loading) {
        return (
            <div className="container mx-auto p-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {Array.from({ length: 6 }).map((_, index) => (
                        <div className="bg-gray-800 rounded-lg shadow-md p-4" key={index}>
                            <div className="animate-pulse h-48 bg-gray-700 rounded" />
                            <div className="mt-4">
                                <div className="h-4 bg-gray-700 rounded w-3/4 mb-2" />
                                <div className="h-4 bg-gray-700 rounded w-1/2" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (error) {
        return <p className="text-red-500">Error: {error}</p>;
    }

    return (
        <div className="container mx-auto p-4">
            <input
                type="text"
                placeholder="Search Videos"
                className="w-full p-2 mb-4 border rounded bg-gray-800 text-white"
                value={searchTerm}
                onChange={handleSearch}
            />
            <select
                value={sortOrder}
                onChange={handleSort}
                className="w-full p-2 mb-4 border rounded bg-gray-800 text-white"
            >
                <option value="default">Default</option>
                <option value="title-asc">Title: A-Z</option>
                <option value="title-desc">Title: Z-A</option>
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
            </select>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {filteredVideos.map((video) => (
                    <div
                        className="bg-gray-800 rounded-lg shadow-md cursor-pointer"
                        key={video.id}
                        onClick={() => handleVideoClick(video.videoUrl)}
                    >
                        <img
                            src={video.thumbnail}
                            alt={video.title}
                            className="h-48 w-full object-cover rounded-t-lg"
                        />
                        <div className="p-4">
                            <h3 className="text-white text-lg">{video.title}</h3>
                            <p className="text-gray-400">
                                Published: {new Date(video.publishedAt).toLocaleDateString()}
                            </p>
                            <p className="text-gray-300 mt-2">
                                {video.description.length > 100
                                    ? `${video.description.slice(0, 100)}...`
                                    : video.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PlaylistVideosPage;
