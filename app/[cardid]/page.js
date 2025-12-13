import { getCardById } from "@/lib/api";
import { notFound } from "next/navigation";

export default async function Page({ params }) {
    const id = params?.id;
    //if (!id) return notFound();

    const card = await getCardById(id);
    //if (!card) return notFound();

    return (
        <main>
        <header>{card.id}</header>
        </main>
    );
}