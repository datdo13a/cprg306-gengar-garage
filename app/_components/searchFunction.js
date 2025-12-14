"use client";
import { useState } from "react";
import { getPokemonCards } from "@/lib/api";
import Image from "next/image";
import getCardDescription from "./getCardDescription";

export default function SearchPage() {

    const [searchWord, setSearchWord] = useState("");
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error , setError] = useState(null);
    const [hasSearched, setHasSearched] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null)
    
    const handleSearch = async (e) => {
        e.preventDefault();
        if(!searchWord.trim()) return;

    setLoading(true);
    setError(null);
    setHasSearched(true);

    try {
      const results = await getPokemonCards(`name:${searchWord}`);
      setCards(results);
    } catch (err) {
      setError("Please try again");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSetFeatured = async (card) => {
    if (!user) {
      setError("You must be logged in to feature a card.");
      return;
    }

    setfeaturedCardId(card.id);
    try {
      await setFeaturedCard(user.uid, card);
      alert(
        `${card.name} is now your featured card! Check your profile page to view your featured card.`
      );
    } catch (error) {
      console.error("Failed to set featured card. Try again.");
    } finally {
      setfeaturedCardId(null);
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
            onChange={(e) => setSearchWord(e.target.value)}
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
            <div className="flex flex-col items-center justify-center gap-4">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                <p>Loading... This may take awhile!</p>
            </div>
        )}

      {/*--- Error handling ---*/}
        {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
                {error}
            </div>
        )}

       {/*--- If no results show up --- */}
        {!loading && cards.length === 0 && hasSearched && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No cards found :|</p>
          </div>
        )}

        {/*---Show cards from search results--- */}
        {!loading && cards.length > 0 && (
        <>
          <div className="mb-4">
            <p className="text-gray-600">
              Found <span className="font-semibold">{cards.length}</span> card
              {cards.length !== 1 ? "s" : ""}
            </p>
          </div>

          <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-5">
            {cards.map((card) => (
              <div
                key={card.id}
                className="bg-white shadow-lg border border-gray-200 p-4 rounded-xl hover:shadow-xl transition-shadow cursor-pointer"
                onClick={() => setSelectedCard(card)}
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

        {/* Modal */}
        {selectedCard && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div
              className="bg-white rounded-xl max-w-4xl w-full mx-4 relative
                        max-h-[90vh] overflow-y-auto"
            >
              {/* Close button */}
              <button
                onClick={() => setSelectedCard(null)}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-2xl font-bold"
                aria-label="Close modal"
              >
                &times;
              </button>

              {/* Header */}
              <h2 className="text-2xl font-bold p-6 pb-2">
                {selectedCard.name}
              </h2>

              {/* CONTENT */}
              <div className="flex flex-col md:flex-row gap-6 p-6">

                {/* IMAGE */}
                <div className="shrink-0 md:w-1/3">
                  <Image
                    src={selectedCard.images.large || selectedCard.images.small}
                    alt={selectedCard.name}
                    width={200}
                    height={320}
                    className="w-full h-auto rounded-lg"
                  />
                  <p className="pt-2 text-gray-600">
                    Set: {selectedCard.set.name}
                  </p>
                  
                </div>

                {/* DESCRIPTION */}
                <div className="md:w-2/3 space-y-3 text-sm overflow-y-auto">
                <p className="text-2xl font-bold">Description: </p>
                  {selectedCard.rules?.map((rule, i) => (
                    <p key={i}>{rule}</p>
                  ))}

                  {selectedCard.abilities?.map((ability, i) => (
                    <p key={i}>
                      <strong>{ability.name}:</strong> {ability.text}
                    </p>
                  ))}

                  {selectedCard.attacks?.map((attack, i) => (
                    <p key={i}>
                      <strong>{attack.name}:</strong> {attack.text}
                    </p>
                  ))}
                  <br></br>

                  {/* ADD BUTTON */}
                  <button
                    onClick={() => addCardToSet(selectedCard)}
                    className="mt-4 w-50 px-4 py-2 bg-green-600 text-white font-semibold rounded-lg
                              hover:bg-green-700 transition-colors"
                  >
                    Add to Set
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
    </main>
  );
}