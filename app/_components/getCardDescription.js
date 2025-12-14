export default function getCardDescription(card) {
  const parts = [];

  if (card.rules?.length) {
    parts.push(...card.rules);
  }

  if (card.abilities?.length) {
    card.abilities.forEach(ability => {
      parts.push(`${ability.name}: ${ability.text}`);
    });
  }

  if (card.attacks?.length) {
    card.attacks.forEach(attack => {
      parts.push(`${attack.name}: ${attack.text}`);
    });
  }

  return parts.length ? parts.join("\n\n") : "No description available.";
}
