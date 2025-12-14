import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");

  if (!query) {
    return NextResponse.json({ data: [] });
  }

  const res = await fetch(
    `https://api.pokemontcg.io/v2/cards?q=${query}&pageSize=300`,
    {
      headers: {
        "X-Api-Key": process.env.POKEMON_TCG_API_KEY,
      },
    }
  );

  if (!res.ok) {
    return NextResponse.json(
      { error: "Failed to fetch cards" },
      { status: 500 }
    );
  }

  const data = await res.json();
  return NextResponse.json(data);
}