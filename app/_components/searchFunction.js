"use client";
import { useState } from "react";
import { getPokemonCards } from "@/lib/api";
import Image from "next/image";

export default function SearchPage() {

    const [searchWord, setSearchWord] = useState("");
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error , setError] = useState(null);
    const [hasSearched, setHasSearched] = useState(false);
    
    const handleSearch = async (e) => {
        e.preventDefault();
        if(!searchWord.trim()) return;

        setLoading(true);
        setError(null);
        setHasSearched(true);
        
        try{
            const results = await getPokemonCards (`name:${searchWord}`);
            setCards(results);
        } catch (err){
            setError("Please try again");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

return (
    <main style={{ padding: "20px" }}>

      {/***Search Bar***/}
      <form onSubmit={handleSearch} className="mb-8">
        <div className="flex gap-2">
            <input 
            type="text" 
            value={searchWord}
            onChange={(e) => setSearchWord (e.target.value)}
            placeholder="Search by Pokemon name"
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
            type="submit"
            disabled={loading || !searchWord.trim()}
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
                {loading ? "Searching..." : "Search"}
            </button>
        </div>
      </form>

      {/*--- Loading state (make it look fancy) --- */}
        {loading && (
            <div>
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        )}

      {/*--- Error handling ---*/}
        {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
                {error}
            </div>
        )}

       {/*--- If no results show up --- */}
       {!loading && cards.length && hasSearched === 0 &&(
        <div className="text-center py-12">
            <p className="text-gray-600 text-lg">
                No cards found :|
            </p>
        </div>
       )}

        {/*---Show cards from search results--- */}
        {!loading && cards.length > 0 && (
        <>
        <div className="mb-4">
            <p className="text-gray-600">
            Found <span className="font-semibold">{cards.length}</span>{" "}
            card{cards.length !== 1 ? "s" : ""}
            </p>
        </div>

        <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-5">
            {cards.map((card) => (
            <div
                key={card.id}
                className="bg-white shadow-lg border border-gray-200 p-4 rounded-xl hover:shadow-xl transition-shadow cursor-pointer"
            >
            <Image
              src={card.images.small}
              alt={card.name}
              width={245}
              height={342}
              className="w-full h-auto"
            />
            
            {/* --- CARD NAME --- */}
            <h3 className="pt-4 text-xl font-bold">{card.name}</h3>
            
            {/* --- SET NAME --- */}
            <p>Set: {card.set.name}</p>
          </div>
        ))}
      </div>
      </>
        )}
        {/*** Default State ***/}
        {!hasSearched && !loading &&(
            <div className="text-center py-12">
                <p className="text-gray-500 text-lg">
                    Enter Pokemon name to get started
                </p>
            </div>
        )}
    </main>
    );
}