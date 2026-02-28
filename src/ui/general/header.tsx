import Link from "next/link";
import SearchBar from "./search"

export default function Header()  {
return (
    <header className="w-full border-b bg-white pb-3 pt-6">
      <div className="container mx-auto flex flex-row items-center justify-between px-4 gap-8">
        
        <div className="text-2xl font-bold tracking-tight">
          <a href="/">Cook<span className="text-blue-600">easy</span></a>
        </div>
        <div>
          <a href="/recipes">Recipes</a>
        </div>

        <div className="flex-1">
          <SearchBar />
        </div>

        <div className="flex-shrink-0">
          <button className="rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-gray-800 transition-all">
            Login/register
          </button>
        </div>

      </div>
    </header>
  );
};