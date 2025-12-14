export async function getPokemonCards(query) {
  const res = await fetch(`/api/cards?q=${query}`);

  if (!res.ok) {
    throw new Error("Failed to fetch cards");
  }

  const data = await res.json();
  return data.data;
}
