'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import api from '@/lib/app';
import CharacterCard from '@/components/characterCard';
import { useFavorites } from '@/hooks/useFavourites';
import { useState, useEffect, useMemo } from 'react';
import debounce from 'lodash.debounce';
import SkeletonCard from '@/components/skeletonCard';

interface Character {
  id: number;
  name: string;
  status: string;
  image: string;
  species?: string;
  // add other fields you need
}

export default function CharactersClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { favorites, toggleFavorite } = useFavorites();

  const [search, setSearch] = useState(searchParams.get('q') || '');
  const [inputValue, setInputValue] = useState(search);
  const [status, setStatus] = useState(searchParams.get('status') || '');
  const page = Number(searchParams.get('page')) || 1;

  useEffect(() => {
    const params = new URLSearchParams();
    if (search) params.set('q', search);
    if (status) params.set('status', status);
    params.set('page', page.toString());
    router.push(`/characters?${params.toString()}`);
  }, [search, status, page, router]);

  const debouncedSearch = useMemo(() => debounce((value: string) => setSearch(value), 400), []);
  useEffect(() => () => debouncedSearch.cancel(), [debouncedSearch]);

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['characters', search, status, page],
    queryFn: async () => {
      const res = await api.get(`/character`, { params: { name: search, status, page } });
      return res.data;
    },
    enabled: status !== 'favorites',
  });

  const [favChars, setFavChars] = useState<Character[]>([]);
  const [favLoading, setFavLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;

    if (status !== 'favorites') {
      setFavChars([]);
      setFavLoading(false);
      return;
    }

    if (!favorites || favorites.length === 0) {
      setFavChars([]);
      setFavLoading(false);
      return;
    }

    setFavLoading(true);
    api
      .get(`/character/${favorites.join(',')}`)
      .then((res) => {
        if (cancelled) return;
        const chars = Array.isArray(res.data) ? res.data : [res.data];
        const filtered = search
          ? chars.filter((c: Character) => c.name.toLowerCase().includes(search.toLowerCase()))
          : chars;
        setFavChars(filtered);
      })
      .catch(() => {
        if (!cancelled) setFavChars([]);
      })
      .finally(() => {
        if (!cancelled) setFavLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [status, favorites, search]);

  const onInputChange = (v: string) => {
    setInputValue(v);
    debouncedSearch(v);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Rick & Morty Characters</h1>

      {/* Filter Bar */}
      <div className="flex flex-wrap gap-3 mb-6 bg-white p-4 rounded-lg shadow-sm items-center">
        <input
          type="text"
          value={inputValue}
          placeholder="Search characters..."
          className="border border-gray-300 px-3 py-2 rounded-lg flex-1 min-w-[200px] focus:ring-2 focus:ring-blue-400 outline-none"
          onChange={(e) => onInputChange(e.target.value)}
        />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
        >
          <option value="">All Status</option>
          <option value="alive">Alive</option>
          <option value="dead">Dead</option>
          <option value="unknown">Unknown</option>
          <option value="favorites">★ Favorites</option>
        </select>

        <button
          onClick={() => {
            setInputValue('');
            setSearch('');
            setStatus('');
            router.push('/characters');
          }}
          className="ml-auto px-3 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
        >
          Reset
        </button>
      </div>

      {/* Content */}
      {status === 'favorites' ? (
        favLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : favChars.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            No favorites yet{search ? ' matching your search' : ''}.
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {favChars.map((char) => (
              <CharacterCard
                key={char.id}
                character={char}
                isFavorite={favorites.includes(char.id)}
                onToggleFavorite={() => toggleFavorite(char.id)}
              />
            ))}
          </div>
        )
      ) : isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : isError ? (
        <div className="flex justify-center mt-6">
          <button
            onClick={() => refetch()}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          >
            Retry
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {data?.results?.map((char: Character) => (
            <CharacterCard
              key={char.id}
              character={char}
              isFavorite={favorites.includes(char.id)}
              onToggleFavorite={() => toggleFavorite(char.id)}
            />
          ))}
        </div>
      )}

      {status !== 'favorites' && (
        <div className="flex justify-center gap-4 mt-8 cursor-pointer">
          <button
            disabled={page <= 1}
            onClick={() => router.push(`/characters?q=${search}&status=${status}&page=${page - 1}`)}
            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Prev
          </button>
          <button
            disabled={!data?.info?.next}
            onClick={() => router.push(`/characters?q=${search}&status=${status}&page=${page + 1}`)}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
