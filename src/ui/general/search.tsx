"use client";

import { Search as SearchIcon } from "lucide-react";

export default function SearchBar() {
  // Her kan du senere legge til state for søketekst:
  // const [query, setQuery] = useState('');

  const handleSearch = (e: Error) => {
    console.log("Search TBC");
  };

  return (
    <form onSubmit={undefined} className="relative w-full max-w-2xl group">
      <div className="relative flex items-center">
        
        <SearchIcon className="absolute left-3 h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />

        <input
          type="text"
          placeholder="search all recipes..."
          className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-4 text-sm outline-none transition-all focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
        />
      </div>
    </form>
  );
}
