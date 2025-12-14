import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "@/_utils/firebase";

// setting the featured card function
export async function setFeaturedCard(userId, cardData) {
  if (!userId) {
    throw new Error("User be logged in to set a featured card");
  }

  const featuredCardData = {
    id: cardData.id,
    name: cardData.name,
    images: cardData.images,
    set: cardData.set,
    types: cardData.types || [],
    supertype: cardData.supertype,
    rarity: cardData.rarity,
  };

  // create a doc for the user's featured card collection (only one featured card)
  try {
    await setDoc(doc(db, "featuredCards", userId), featuredCardData);
  } catch (error) {
    console.error("Error setting a featured card", error);
  }
}

// getting the featured card
export async function getFeaturedCard(userId) {
  if (!userId) {
    return null;
  }

  try {
    // creates doc ref
    const docRef = doc(db, "featuredCards", userId);
    // read the doc
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error getting a featured card", error);
  }
}

// removing a featured card
export async function removeFeaturedCard() {
  if (!userId) {
    throw new Error("User must be logged in to remove a card.");
  }

  try {
    await setDoc((db, "featuredCards", userId), {});
  } catch (error) {
    console.error("Error removing the featured card.");
  }
}
