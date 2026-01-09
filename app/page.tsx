'use client';
import Header from "@/components/header";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [pokemonData, setPokemonData] = useState<any[]>([]);
  const [pokemonTypes, setPokemonTypes] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [type, setType] = useState('');
  const [next, setNext] = useState<string | null>(null);

  async function getData(url: string, reset = false) {
    const pokemonList = await fetch(url).then(res => res.json());
    setPokemonData(prevData => reset ? pokemonList?.data : [...prevData, ...pokemonList?.data]);
    setNext(pokemonList?.next);
  }

  async function getPokemonTypes() {
    const typesData = await fetch('http://localhost:5000/v3/pokemon/types').then(res => res.json());
    const types = typesData?.data.map((type: any) => type.english);
    setPokemonTypes(types);
  }

  useEffect(() => {
    getPokemonTypes();
  }, []);

  useEffect(() => {
    const url = `http://localhost:5000/v3/pokemon?page=1&q=${search}&sort=${sort}&order=${sortOrder}&type=${type}`;
    getData(url, true);
  }, [search, sort, sortOrder, type]);

  return (
    <>
      <Header
        pokemonTypes={pokemonTypes}
        search={search}
        setSearch={setSearch}
        sort={sort}
        setSort={setSort}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        type={type}
        setType={setType}
      />
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
        <main className="flex min-h-screen w-full max-w-6xl flex-col items-center justify-start py-16 px-16 bg-white dark:bg-black sm:items-start">
          <div className="w-full">
            <div className="container mx-auto p-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {pokemonData?.length > 0 && pokemonData?.map(item => {
                  const typeColor: any = {
                    bug: 'bg-lime-400',
                    dark: 'bg-stone-700',
                    dragon: 'bg-indigo-700',
                    electric: 'bg-yellow-400',
                    fairy: 'bg-pink-400',
                    fighting: 'bg-orange-700',
                    fire: 'bg-orange-500',
                    flying: 'bg-sky-400',
                    ghost: 'bg-indigo-900',
                    grass: 'bg-green-500',
                    ground: 'bg-yellow-700',
                    ice: 'bg-cyan-300',
                    normal: 'bg-stone-400',
                    poison: 'bg-purple-600',
                    psychic: 'bg-pink-600',
                    rock: 'bg-yellow-800',
                    steel: 'bg-slate-500',
                    water: 'bg-blue-500',
                  };
                  const primaryType = item.type[0].toLowerCase();
                  const cardBgColor = typeColor[primaryType] || 'bg-gray-400';

                  return (
                    <div className="rounded-xl shadow-lg relative mt-12" key={item?.id}>
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 translate-y-6">
                        <Image width={150} height={150} src={item?.image?.hires} alt={item.name.english} className="w-32 h-32 object-contain" />
                      </div>
                      <div className={`${cardBgColor} p-4 rounded-t-xl`}>
                        <p className="text-right text-white font-bold">#{String(item.id).padStart(3, '0')}</p>
                        <div className="h-12"></div>
                      </div>
                      <div className="bg-white p-6 rounded-b-xl text-center pt-10">
                        <h2 className="text-2xl font-bold mb-2 capitalize text-stone-700">{item.name.english}</h2>
                        <div className="flex gap-2 mt-2 justify-center">
                          {item.type.map((t: string) => (
                            <span key={t} className={`${typeColor[t.toLowerCase()]} text-white text-xs font-semibold px-3 py-1 rounded-full`}>
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              {next && (
                <div className="flex justify-center mt-8">
                  <button
                    onClick={() => getData(next)}
                    className="bg-rose-500 text-white font-bold py-2 px-4 rounded-full hover:bg-rose-600 transition-colors"
                  >
                    Load More
                  </button>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
