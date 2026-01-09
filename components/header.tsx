import Image from "next/image";

export default function Header({ pokemonTypes, search, setSearch, sort, setSort, sortOrder, setSortOrder, type, setType }: any) {
    return (
        <header className='bg-white shadow-md sticky top-0 z-50'>
            <div className='py-3 px-4 sm:px-10 bg-rose-500 w-full'>
                <div className="flex justify-between">
                    <div className='flex flex-wrap items-center gap-4 max-w-screen-xl mx-auto w-full'>
                        {/* <Image src={'/logo.svg'} alt="logo" width={40} height={40} /> */}
                        <p className="text-2xl font-bold text-white">Pokédex</p>
                    </div>
                    <div className='relative'>
                        <input
                            type='text'
                            placeholder='Search by name'
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className='w-full bg-white text-sm outline-none pr-10 pl-4 py-2.5 border border-gray-300 rounded-lg focus:border-slate-900 transition-all'
                        />
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192.904 192.904" width="16px" className="absolute right-4 top-1/2 -translate-y-1/2 fill-gray-400">
                            <path d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z"></path>
                        </svg>
                    </div>
                </div>
            </div>
            <div className='py-3 px-4 sm:px-10 bg-white tracking-wide relative z-50 w-full'>
                <div className='flex flex-wrap items-center gap-4  mx-auto w-full'>
                    <div className='flex gap-4 w-full justify-end'>
                        <select
                            value={sort}
                            onChange={(e) => setSort(e.target.value)}
                            className="block w-40 px-3 py-2.5 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand shadow-xs placeholder:text-body"
                        >
                            <option value="">Sort</option>
                            <option value="id">ID</option>
                            <option value="name">Name</option>
                        </select>
                        <select
                            value={sortOrder}
                            onChange={(e) => setSortOrder(e.target.value)}
                            className="block w-40 px-3 py-2.5 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand shadow-xs placeholder:text-body"
                        >
                            <option value="asc">Asc</option>
                            <option value="desc">Desc</option>
                        </select>
                        <select
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            className="block w-40 px-3 py-2.5 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand shadow-xs placeholder:text-body"
                        >
                            <option value="">All Types</option>
                            {pokemonTypes.map((type: string) => (
                                <option key={type} value={type.toLowerCase()}>{type}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
        </header>
    )
}