import { getPokemonCards } from "@/lib/api";
import Image from "next/image";
import NavBar from "./_components/navbar";
import SideBar from "./_components/sidebar";
import Footer from "./_components/footer";
import Link from "next/link";

export default function MainPage() {
  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage: "url('/landing-page-cards.png')",
      }}
    >
      <div className="hero-overlay"></div>
      <div className="hero-content text-neutral-content text-center">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold">Hello there, trainer!</h1>
          <p className="mb-5">
            Welcome to Gengar Garage! Begin your journey of Pokemon collecting.
            Add, search, feature your favourite cards and catch them all.
          </p>
          <Link href="/sign-in">
            <button className="w-75 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:from-purple-600 hover:to-pink-600 transition-all cursor-pointer duration-300 transform hover:scale-105">
              Get Started
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
