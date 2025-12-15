import { doc, setDoc, getDoc, arrayUnion, updateDoc } from "firebase/firestore";
import { db } from "@/_utils/firebase";

// setting the featured card function
export async function addCardToCollection(userId, cardData) {
  if (!userId) {
    throw new Error("User be logged in to add a card to collection");
  }

  const newCardData = {
    id: cardData.id,
    name: cardData.name,
    images: cardData.images,
    set: cardData.set,
    types: cardData.types || [],
    supertype: cardData.supertype,
    rarity: cardData.rarity,
    number: cardData.number || "Unknown",
    artist: cardData.artist || "Unknown",
    flavour: cardData.flavorText || "",
    hp: cardData.hp,
    rules: cardData.rules || [],
    abilities: cardData.abilities || [],
    attacks: cardData.attacks || [],
  };

  // Append the new card into the user's `cards` array on the `cardCollection/{userId}` doc.
  // Use `setDoc` with `{ merge: true }` so a doc is created if it doesn't exist.
  try {
    const docRef = doc(db, "cardCollection", userId);
    await setDoc(
      docRef,
      { cards: arrayUnion(newCardData) },
      { merge: true }
    );
  } catch (error) {
    console.error("Error adding card to collection", error);
  }
}

// getting the card collection
export async function getCardCollection(userId) {
  if (!userId) {
    return null;
  }

  try {
    // creates doc ref
    const docRef = doc(db, "cardCollection", userId);
    // read the doc
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error getting card collection", error);
  }
}

// removing a card
export async function removeCardFromCollection(userId, cardId) {
  if (!userId) {
    throw new Error("User must be logged in to remove a card.");
  }

  try {
    const docRef = doc(db, "cardCollection", userId);
    const snap = await getDoc(docRef);
    if (!snap.exists()) return;

    const data = snap.data();
    const current = Array.isArray(data.cards) ? data.cards : [];
    const updated = current.filter((c) => c.id !== cardId);

    // Update only the cards array with the filtered result
    await updateDoc(docRef, { cards: updated });
  } catch (error) {
    console.error("Error removing the card.", error);
  }
}
