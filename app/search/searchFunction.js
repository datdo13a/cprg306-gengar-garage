"use client";
import { useState } from "react";
import { getPokemonCards } from "@/lib/api";
import Image from "next/image";

export default function searchPage() {

    const [searchWord, setSearchWord] = useState("");
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error , setError] = useState(null);
    
    const handleSearch = async (e) => {
        e.preventDefault();
        if(!searchQuery.trim()) return;

        setLoading(true);
        setError(null);
        
        try{
            const results = await getPokemonCards (`name: ${searchWord}`);
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
      <div className="max-w-7xl mx-auto">

      </div>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-5">
        
        
        {/* mapping pokemon cards: */}
        {cards.map((card) => (
          <div
            key={card.id}
            className="shadow-lg border border-gray-200 p-4 rounded-xl"
          >
            <img
              src={card.images.small}
              alt={card.name}
              className="w-100 h-auto"
            />
            
            
            {/* CARD NAME */}
            <h3 className="pt-4 text-xl font-bold">{card.name}</h3>
            
            
            {/* SET NAME */}
            <p>Set: {card.set.name}</p>
          </div>
        ))}
      </div>
    </main>
  );
}