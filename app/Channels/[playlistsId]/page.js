"use client"; // تأكد من إضافة هذا السطر في بداية الملف

import axios from "axios";
import Image from "next/image"; // استخدم مكون Image الخاص بـ Next.js
import { useRouter } from "next/navigation"; // استخدام next/navigation
import { useEffect, useState } from "react";


const API_KEY = "AIzaSyAB9dG_zzrdvTcfVFlGbkZ_GQjPhqPE1yQ";
const CHANNEL_USERNAME = "OsamaElzero"; // اسم القناة

const PlaylistsPage = () => {
  const [playlists, setPlaylists] = useState([]);
  const [filteredPlaylists, setFilteredPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [channelId, setChannelId] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("date");
  const router = useRouter();

  useEffect(() => {
    const fetchChannelId = async () => {
      try {
        const response = await axios.get(
          `https://www.googleapis.com/youtube/v3/channels`,
          {
            params: {
              part: "id",
              forUsername: CHANNEL_USERNAME,
              key: API_KEY,
            },
          }
        );
        const channelId = response.data.items[0].id;
        setChannelId(channelId);
      } catch (error) {
        console.error("Error fetching channel ID:", error);
        setError("Error fetching channel ID");
        setLoading(false);
      }
    };

    fetchChannelId();
  }, []);

  useEffect(() => {
    if (channelId) {
      const fetchPlaylists = async () => {
        try {
          const response = await axios.get(
            `https://www.googleapis.com/youtube/v3/playlists`,
            {
              params: {
                part: "snippet,contentDetails",
                channelId: channelId,
                maxResults: 25,
                key: API_KEY,
              },
            }
          );
          const fetchedPlaylists = response.data.items.map((playlist) => ({
            id: playlist.id,
            title: playlist.snippet.title,
            thumbnail: playlist.snippet.thumbnails.high.url,
            itemCount: playlist.contentDetails.itemCount,
            publishedAt: new Date(playlist.snippet.publishedAt),
          }));
          setPlaylists(fetchedPlaylists);
          setFilteredPlaylists(fetchedPlaylists);
        } catch (error) {
          console.error("Error fetching playlists:", error);
          setError("Error fetching playlists");
        } finally {
          setLoading(false);
        }
      };

      fetchPlaylists();
    }
  }, [channelId]);

  useEffect(() => {
    let filtered = playlists.filter((playlist) =>
      playlist.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (sortOrder === "a-z") {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOrder === "z-a") {
      filtered.sort((a, b) => b.title.localeCompare(a.title));
    } else {
      filtered.sort((a, b) => b.publishedAt - a.publishedAt);
    }

    setFilteredPlaylists(filtered);
  }, [searchTerm, sortOrder, playlists]);

  if (loading)
    return (
      <div className="container mx-auto py-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <div className="bg-gray-800 rounded-lg p-4" key={index}>
              <div className="animate-pulse h-40 bg-gray-700 rounded-lg mb-2" />
              <div className="animate-pulse h-6 bg-gray-700 rounded mb-1" />
              <div className="animate-pulse h-6 bg-gray-700 rounded" />
            </div>
          ))}
        </div>
      </div>
    );

  if (error) return <p className="text-red-500">Error: {error}</p>;
  const playlistsId = channelId;
  return (
    <div className="container mx-auto py-4">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search Playlists"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-2"
        />
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        >
          <option value="date">Sort By Date</option>
          <option value="a-z">Sort A-Z</option>
          <option value="z-a">Sort Z-A</option>
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPlaylists.map((playlist) => (
          <div
            key={playlist.id}
            className="bg-gray-800 rounded-lg cursor-pointer"
            onClick={() => router.push(`/Channels/${playlistsId}/${playlist.id}`)}
          >
            <Image
              src={playlist.thumbnail}
              alt={playlist.title}
              width={400}
              height={225}
              className="rounded-t-lg"
            />
            <div className="p-4">
              <h3 className="text-white text-lg">{playlist.title}</h3>
              <p className="text-gray-400">{`Number of Videos: ${playlist.itemCount}`}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlaylistsPage;
