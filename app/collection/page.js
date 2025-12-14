"use client";
import { useEffect, useState } from "react";
import { useUserAuth } from "@/_utils/auth-context";
import {
  getCardCollection,
  removeCardFromCollection,
} from "../_components/card-collection";
import Image from "next/image";

export default function Collection() {
  const { user } = useUserAuth();
  const [loading, setLoading] = useState(true);
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);

  async function handleRemoveSelected() {
    if (!user || !selectedCard) return;
    try {
      await removeCardFromCollection(user.uid, selectedCard.id);
      setCards((prev) => prev.filter((c) => c.id !== selectedCard.id));
      setSelectedCard(null);
    } catch (err) {
      console.error("Failed to remove card:", err);
    }
  }

  useEffect(() => {
    async function loadCardCollection() {
      if (user) {
        try {
          const data = await getCardCollection(user.uid);
          setCards(data?.cards || []);
        } catch (error) {
          console.error("Error loading card collection:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    }

    loadCardCollection();
  }, [user]);

  if (!user) {
    return (
      <div className="p-8">
        <p>Please log in to view your collection</p>
      </div>
    );
  }

  return (
    <div className="p-8">
      {loading ? (
        <p>Loading collection...</p>
      ) : cards.length === 0 ? (
        <p>No cards in your collection yet.</p>
      ) : (
        <div>
          <h2 className="text-2xl font-bold mb-4">My Collection</h2>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-5">
            {cards.map((card) => (
              <div
                key={card.id}
                className="bg-white shadow-lg border border-gray-200 p-4 rounded-xl"
                onClick={() => setSelectedCard(card)}
              >
                <Image
                  src={
                    card.images?.small ||
                    card.images?.large ||
                    "/placeholder.png"
                  }
                  alt={card.name}
                  width={245}
                  height={342}
                  className="w-full h-auto"
                />
                <h3 className="pt-4 text-xl font-bold">{card.name}</h3>
                <p>Set: {card.set?.name || card.set}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      {selectedCard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl max-w-4xl w-full mx-4 relative max-h-[90vh] overflow-y-auto">
            {/* Close button */}
            <button
              onClick={() => setSelectedCard(null)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-2xl font-bold"
              aria-label="Close modal"
            >
              &times;
            </button>

            {/* Header */}
            <h2 className="text-2xl font-bold p-6 pb-2">{selectedCard.name}</h2>

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
                <br />

                {/* REMOVE BUTTON */}
                <button
                  onClick={handleRemoveSelected}
                  className="mt-4 w-50 px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors"
                >
                  Remove from collection
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
