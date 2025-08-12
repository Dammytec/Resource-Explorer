'use client';

import Link from 'next/link';
import Image from 'next/image';

interface Character {
  id: number | string;
  name: string;
  image: string;
  status: string;
  // add more fields if needed
}

interface Props {
  character: Character;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

export default function CharacterCard({ character, isFavorite, onToggleFavorite }: Props) {
  return (
    <div className="border rounded-lg p-4 flex flex-col items-center shadow bg-white">
      <Image
        src={character.image}
        alt={character.name}
        width={128}
        height={128}
        className="rounded-full mb-2"
      />
      <h3 className="font-bold text-lg">{character.name}</h3>
      <p className="text-sm text-gray-500">{character.status}</p>
      <div className="flex gap-2 mt-2">
        <button
          onClick={onToggleFavorite}
          className="px-2 py-1 border rounded bg-yellow-100 hover:bg-yellow-200"
        >
          {isFavorite ? '★ Unfavorite' : '☆ Favorite'}
        </button>
        <Link
          href={`/characters/${character.id}`}
          className="px-2 py-1 border rounded bg-blue-100 hover:bg-blue-200"
        >
          View
        </Link>
      </div>
    </div>
  );
}

