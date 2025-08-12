'use client';

import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import api from '@/lib/app';
import { useFavorites } from '@/hooks/useFavourites';  // fixed import spelling

interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  image: string;
}

export default function CharacterDetail() {
  const params = useParams();
  const router = useRouter();
  const { favorites, toggleFavorite } = useFavorites();

  const { data, isLoading, isError, refetch } = useQuery<Character>({
    queryKey: ['character', params.id],
    queryFn: async () => {
      const res = await api.get(`/character/${params.id}`);
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-600">
        Loading...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center h-screen space-y-4">
        <p className="text-red-500">Failed to load character details.</p>
        <button
          onClick={() => refetch()}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-2xl">
      <button
        onClick={() => router.back()}
        className="mb-6 inline-flex items-center px-3 py-2 bg-gray-100 cursor-pointer rounded-lg hover:bg-gray-200 transition"
      >
        ⬅ Back
      </button>

      <div className="flex flex-col items-center text-center space-y-4">
        <Image
          src={data!.image}
          alt={data!.name}
          width={192}
          height={192}
          className="object-cover rounded-full border-4 border-gray-200 shadow-md"
        />
        <h1 className="text-3xl font-bold text-gray-800">{data!.name}</h1>
        <p className="text-lg text-gray-600">
          <span className="font-medium">Status:</span> {data!.status}
        </p>
        <p className="text-lg text-gray-600">
          <span className="font-medium">Species:</span> {data!.species}
        </p>

        <button
          onClick={() => toggleFavorite(data!.id)}
          className={`mt-4 px-6 py-2 rounded-lg shadow transition ${
            favorites.includes(data!.id)
              ? 'bg-yellow-400 text-white hover:bg-yellow-500'
              : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
          }`}
        >
          {favorites.includes(data!.id) ? '★ Unfavorite' : '☆ Favorite'}
        </button>
      </div>
    </div>
  );
}



