import { getPokemonCards } from "@/lib/api";
import Image from "next/image";

export default async function Page() {
  const cards = await getPokemonCards("name:mewtwo");

  return (
    <main style={{ padding: "20px" }}>
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
