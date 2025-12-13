export async function getPokemonCards(query) {
  const res = await fetch(`https://api.pokemontcg.io/v2/cards?q=${query}`, {
    headers: {
      "X-Api-Key": process.env.POKEMON_TCG_API_KEY,
    },
    // Next.js caching: re-fetch data every hour (3600 seconds)
    next: { revalidate: 3600 },
  });

  if (!res.ok) throw new Error("Failed to fetch data");

  const data = await res.json();
  return data.data; // The API returns an object with a 'data' array
}

export async function getCardById(id) {
  if (!id) return null;

  const res = await fetch(`https://api.pokemontcg.io/v2/cards/${id}`, {
    headers: {
      "X-Api-Key": process.env.POKEMON_TCG_API_KEY,
    },
    next: { revalidate: 3600 },
  });

  if (!res.ok) return null;

  const data = await res.json();
  return data.data; // API returns an object with 'data' for a single card
}
