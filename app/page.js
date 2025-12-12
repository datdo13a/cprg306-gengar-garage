import { getPokemonCards } from "@/lib/api";
import Image from "next/image";
import NavBar from "./_components/navbar";
import SideBar from "./_components/sidebar";
import Footer from "./_components/footer";

export default function MainPage() {
  return (
    <main>
      <NavBar />
      <SideBar />
      <div>
        <Footer />
      </div>
    </main>
  );
}
