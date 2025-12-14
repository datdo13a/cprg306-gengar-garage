"use client";
import { useEffect, useState } from "react";
import { useUserAuth } from "@/_utils/auth-context";
import { getFeaturedCard } from "../_components/featured-card";
import Image from "next/image";

export default function ProfilePage() {
  const { user } = useUserAuth();
  const [featuredCard, setFeaturedCard] = useState(null);
  const [loading, setLoading] = useState(true);
  // Move join date calculation here, outside the if block
  let formattedJoinDate = "N/A";
  if (user) {
    const creationTime = user.metadata.creationTime;
    const joinDate = new Date(creationTime);

    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    formattedJoinDate = joinDate.toLocaleDateString(undefined, options);
  }

  useEffect(() => {
    async function loadFeaturedCard() {
      if (user) {
        console.log("Loading featured card for user:", user.uid); // Debug log
        try {
          const card = await getFeaturedCard(user.uid);
          console.log("Featured card loaded:", card); // Debug log
          setFeaturedCard(card);
        } catch (error) {
          console.error("Error loading featured card:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    }

    loadFeaturedCard();
  }, [user]);

  if (!user) {
    return (
      <div className="p-8">
        <p>Please log in to view your profile</p>
      </div>
    );
  }

  return (
    <div className="p-8">
      {/* Profile Info */}
      <div className="mb-8 border-1 rounded-lg border-base-300">
        <div className="card bg-base-100 w-full shadow-lg">
          {/* Stats Block */}
          <div className="mt-4 flex justify-center">
            <div className="stats shadow-sm border-1 border-base-300">
              <div className="stat place-items-center">
                <div className="stat-title">Featured card</div>
                <div className="stat-value text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                  {featuredCard ? featuredCard.name : "None"}
                </div>
              </div>

              <div className="stat place-items-center">
                <div className="stat-title">Cards in Collection</div>
                <div className="stat-value text-secondary">4,200</div>
                <div className="stat-desc text-secondary">↗︎ 40 (2%)</div>
              </div>

              <div className="stat place-items-center">
                <div className="stat-title">Date Joined</div>
                <div className="stat-value">{formattedJoinDate}</div>
              </div>
            </div>
          </div>
          <div className="card-body">
            <div className="flex justify-center gap-4 items-center">
              {/* Profile Image Block */}
              <div className="flex-shrink-0">
                <img
                  src={user.photoURL}
                  className="w-20 h-20 rounded-full"
                  alt={user.displayName}
                />
              </div>

              {/* Name and Email Block */}
              <div>
                <h2 className="card-title text-2xl">{user.displayName}</h2>
                <h2 className="text-lg">{user.email}</h2>
              </div>
            </div>
            {/* Buttons */}
            <div className="card-actions flex justify-center mt-4 gap-4">
              <button
                href="/search"
                className=" bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-3"
              >
                Search
              </button>
              <button
                href="/collection"
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-3"
              >
                Go to Collection
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Card Section */}
      <div className="mb-8">
        {loading ? (
          <div className="flex items-center gap-3">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
            <p>Loading featured card...</p>
          </div>
        ) : featuredCard ? (
          <div className="card 2xl:card-side shadow-lg border-1 border-base-100 22 border-base-300 p-10 mr-30 ml-30">
            <figure className="shadow-xl rounded-xl">
              <Image
                src={featuredCard.images.large || featuredCard.images.small}
                alt={featuredCard.name}
                width={400}
                height={560}
                className="w-full h-auto"
              />
            </figure>
            <div className="card-body ml-4">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                {user.displayName}'s Featured Card
              </h2>
              <div className="">
                <p className="text-lg mt-5">Set: {featuredCard.set.name}</p>

                {featuredCard.rarity && (
                  <p className="text-lg mt-2">Rarity: {featuredCard.rarity}</p>
                )}
                <p className="text-lg mt-2">
                  Flavor Text: {featuredCard.flavour}
                </p>
                <p className="text-lg mt-2">Artist: {featuredCard.artist}</p>
                <p></p>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-6 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
            <p className="text-gray-500">
              No featured card set. Search for a card and click "Feature This
              Card"!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
