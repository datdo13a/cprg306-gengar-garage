"use client";
import { useEffect, useState } from "react";
import { useUserAuth } from "@/_utils/auth-context";
import { getFeaturedCard } from "../_components/featured-card";
import Image from "next/image";

export default function ProfilePage() {
  const { user } = useUserAuth();
  const [featuredCard, setFeaturedCard] = useState(null);
  const [loading, setLoading] = useState(true);

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
      {/* Featured Card Section */}
      <div className="mb-8">
        {loading ? (
          <div className="flex items-center gap-3">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
            <p>Loading featured card...</p>
          </div>
        ) : featuredCard ? (
          <div className="card lg:card-side bg-base-100 shadow-lg border-1 border-base-300 p-10 mr-30 ml-30">
            <figure>
              <Image
                src={featuredCard.images.large || featuredCard.images.small}
                alt={featuredCard.name}
                width={400}
                height={560}
                className="w-full h-auto rounded-lg"
              />
            </figure>
            <div className="card-body ml-4">
              <h2 className="card-title text-3xl">
                {user.displayName}'s Featured Card
              </h2>
              <div className="mt-4">
                <h3 className="text-2xl font-bold">{featuredCard.name}</h3>
                <p>{featuredCard.supertype}</p>
                <p>HP: {featuredCard.hp}</p>
                <p>{featuredCard.artist}</p>
                <p className="text-gray-600">Set: {featuredCard.set.name}</p>

                {featuredCard.rarity && (
                  <p className="text-gray-600">Rarity: {featuredCard.rarity}</p>
                )}

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
