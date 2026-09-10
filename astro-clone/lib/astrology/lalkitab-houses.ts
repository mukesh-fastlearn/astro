// Lal Kitab planet-in-house readings — all 108 combinations.
//
// Generated as a flat table so every planet/house pair is present and the
// count can be asserted. Lal Kitab's own phrasing is often blunt and
// moralising; these restate the readings as tendencies. They remain recorded
// traditional practice, not established fact.

export interface LalKitabHouseReading {
  planet: string;
  house: number;
  effect: string;
  measures: string[];
  avoid: string[];
}

export const LAL_KITAB_HOUSE_READINGS: LalKitabHouseReading[] = [
  { planet: "Sun", house: 1, effect: "Strong sense of self and visibility; ego can run ahead of patience.", measures: ["Offer water to the rising sun"], avoid: ["Accepting free hospitality habitually"] },
  { planet: "Sun", house: 2, effect: "Family wealth and speech carry weight; care needed with harsh words.", measures: ["Donate jaggery on Sunday"], avoid: ["Harsh speech within the family"] },
  { planet: "Sun", house: 3, effect: "Courage and initiative are marked; siblings feature strongly.", measures: ["Feed jaggery to a cow"], avoid: ["Quarrels with siblings"] },
  { planet: "Sun", house: 4, effect: "Home and the mother's side are central; restlessness at home possible.", measures: ["Keep a copper vessel of water at home"], avoid: ["Neglecting the mother"] },
  { planet: "Sun", house: 5, effect: "Creative and intellectual drive; children a focus.", measures: ["Offer water to the sun at sunrise"], avoid: ["Arrogance when teaching"] },
  { planet: "Sun", house: 6, effect: "Capable in service and dispute; the father's health bears watching.", measures: ["Donate wheat"], avoid: ["Taking free food as a habit"] },
  { planet: "Sun", house: 7, effect: "Partnership tests authority; ego and marriage interact.", measures: ["Donate wheat on Sunday"], avoid: ["Dominating the spouse"] },
  { planet: "Sun", house: 8, effect: "Sudden change; longevity themes and hidden matters.", measures: ["Float jaggery in flowing water"], avoid: ["Risky ventures"] },
  { planet: "Sun", house: 9, effect: "Fortune through the father and dharma; long journeys favoured.", measures: ["Serve the father and elders"], avoid: ["Disrespecting teachers"] },
  { planet: "Sun", house: 10, effect: "Career and public standing prominent; authority arrives.", measures: ["Offer water to the sun daily"], avoid: ["Misuse of position"] },
  { planet: "Sun", house: 11, effect: "Gains through status and networks.", measures: ["Donate wheat and jaggery"], avoid: ["Greed in gains"] },
  { planet: "Sun", house: 12, effect: "Expenditure and foreign matters; a pull toward solitude.", measures: ["Donate at a temple"], avoid: ["Secret conflicts"] },
  { planet: "Moon", house: 1, effect: "Sensitive, adaptable temperament; mood shapes the body.", measures: ["Keep silver on the person"], avoid: ["Emotional volatility"] },
  { planet: "Moon", house: 2, effect: "Family and speech carry feeling; wealth fluctuates.", measures: ["Offer milk at a temple"], avoid: ["Giving milk away after dark"] },
  { planet: "Moon", house: 3, effect: "Emotional courage; a strong bond with siblings.", measures: ["Serve the mother"], avoid: ["Restlessness in effort"] },
  { planet: "Moon", house: 4, effect: "Deep attachment to home and mother; comfort matters.", measures: ["Keep a vessel of water by the bed overnight"], avoid: ["Neglecting the mother"] },
  { planet: "Moon", house: 5, effect: "Imaginative mind; children and creativity central.", measures: ["Offer rice at a temple"], avoid: ["Speculation on impulse"] },
  { planet: "Moon", house: 6, effect: "Emotional strain through work or health; an inclination to serve.", measures: ["Donate rice and milk"], avoid: ["Worry-driven decisions"] },
  { planet: "Moon", house: 7, effect: "Partnership deeply felt; the spouse influences mood.", measures: ["Keep silver at home"], avoid: ["Emotional dependence"] },
  { planet: "Moon", house: 8, effect: "Emotional intensity; hidden matters surface.", measures: ["Float rice in flowing water"], avoid: ["Brooding"] },
  { planet: "Moon", house: 9, effect: "Faith and travel bring peace; the mother's fortune features.", measures: ["Serve elderly women"], avoid: ["Neglecting tradition"] },
  { planet: "Moon", house: 10, effect: "Public-facing work; reputation moves with mood.", measures: ["Offer milk on Monday"], avoid: ["Inconsistency at work"] },
  { planet: "Moon", house: 11, effect: "Gains through people and networks; many acquaintances.", measures: ["Donate white cloth"], avoid: ["Unreliable company"] },
  { planet: "Moon", house: 12, effect: "Inner life and seclusion; sleep and dreams significant.", measures: ["Donate milk at a temple"], avoid: ["Isolation from family"] },
  { planet: "Mars", house: 1, effect: "Direct, energetic, physically robust; temper needs a channel.", measures: ["Feed sweet chapati to dogs"], avoid: ["Picking fights"] },
  { planet: "Mars", house: 2, effect: "Forceful speech; earnings come through effort.", measures: ["Keep sweet items in the house"], avoid: ["Harsh words in the family"] },
  { planet: "Mars", house: 3, effect: "Strong courage and drive; siblings prominent.", measures: ["Donate red lentils on Tuesday"], avoid: ["Rivalry with siblings"] },
  { planet: "Mars", house: 4, effect: "Property and home involve effort or dispute.", measures: ["Plant or care for a neem tree"], avoid: ["Property disputes"] },
  { planet: "Mars", house: 5, effect: "Bold with children and ventures; competitive intellect.", measures: ["Feed sweet chapati to dogs"], avoid: ["Gambling"] },
  { planet: "Mars", house: 6, effect: "Excellent at overcoming opposition; strong constitution.", measures: ["Donate jaggery on Tuesday"], avoid: ["Provoking conflict"] },
  { planet: "Mars", house: 7, effect: "Marriage carries heat; Manglik themes are traditionally read here.", measures: ["Donate red items on Tuesday"], avoid: ["Aggression with the spouse"] },
  { planet: "Mars", house: 8, effect: "Sudden events; surgery and accident themes traditionally noted.", measures: ["Float red lentils in flowing water"], avoid: ["Reckless speed"] },
  { planet: "Mars", house: 9, effect: "Energetic in belief and travel; the father's vigour.", measures: ["Serve at a temple"], avoid: ["Dogmatism"] },
  { planet: "Mars", house: 10, effect: "Drive in career; leadership through action.", measures: ["Donate copper"], avoid: ["Confrontation at work"] },
  { planet: "Mars", house: 11, effect: "Gains through bold action and elder siblings.", measures: ["Feed dogs regularly"], avoid: ["Risky financial bets"] },
  { planet: "Mars", house: 12, effect: "Hidden energy; expenditure through disputes.", measures: ["Donate red cloth"], avoid: ["Secret enmity"] },
  { planet: "Mercury", house: 1, effect: "Quick, communicative, analytical temperament.", measures: ["Keep a pierced copper coin"], avoid: ["Deceit in speech"] },
  { planet: "Mercury", house: 2, effect: "Skilled speech and trade; wealth through words.", measures: ["Feed green fodder to cows"], avoid: ["False promises"] },
  { planet: "Mercury", house: 3, effect: "Writing, media and siblings prominent.", measures: ["Donate green cloth"], avoid: ["Gossip"] },
  { planet: "Mercury", house: 4, effect: "Learning at home; the mother's education matters.", measures: ["Give green vegetables in charity"], avoid: ["Mental restlessness at home"] },
  { planet: "Mercury", house: 5, effect: "Sharp intellect; studious children.", measures: ["Donate books"], avoid: ["Over-analysis"] },
  { planet: "Mercury", house: 6, effect: "Analytical at work; disputes handled cleverly.", measures: ["Feed green fodder to cows"], avoid: ["Clever manipulation"] },
  { planet: "Mercury", house: 7, effect: "Business partnership; a communicative spouse.", measures: ["Donate green items on Wednesday"], avoid: ["Sharp practice in contracts"] },
  { planet: "Mercury", house: 8, effect: "Research and hidden knowledge; an investigative mind.", measures: ["Float moong in flowing water"], avoid: ["Secrecy in dealings"] },
  { planet: "Mercury", house: 9, effect: "Learning and higher study; travel for knowledge.", measures: ["Donate books to students"], avoid: ["Intellectual arrogance"] },
  { planet: "Mercury", house: 10, effect: "Career in communication, trade or analysis.", measures: ["Keep a copper coin with a hole"], avoid: ["Dishonesty at work"] },
  { planet: "Mercury", house: 11, effect: "Gains through networks, trade and information.", measures: ["Donate green cloth"], avoid: ["Speculative trading"] },
  { planet: "Mercury", house: 12, effect: "Thought turns inward; foreign trade possible.", measures: ["Donate to a school"], avoid: ["Overthinking"] },
  { planet: "Jupiter", house: 1, effect: "Principled, respected, growth-oriented temperament.", measures: ["Apply saffron tilak"], avoid: ["Self-righteousness"] },
  { planet: "Jupiter", house: 2, effect: "Wealth and family supported; measured speech.", measures: ["Donate turmeric on Thursday"], avoid: ["Overindulgence"] },
  { planet: "Jupiter", house: 3, effect: "Wisdom applied to effort; supportive siblings.", measures: ["Water a peepal tree"], avoid: ["Laziness"] },
  { planet: "Jupiter", house: 4, effect: "Comfort, property and a learned mother.", measures: ["Serve teachers"], avoid: ["Neglecting the home"] },
  { planet: "Jupiter", house: 5, effect: "Children, learning and merit strongly favoured.", measures: ["Donate books and chana dal"], avoid: ["Preachiness"] },
  { planet: "Jupiter", house: 6, effect: "Wisdom overcomes obstacles, though gains may narrow.", measures: ["Donate yellow cloth"], avoid: ["Disputes with elders"] },
  { planet: "Jupiter", house: 7, effect: "A supportive marriage; a principled spouse.", measures: ["Apply saffron tilak"], avoid: ["Moralising at the spouse"] },
  { planet: "Jupiter", house: 8, effect: "Interest in the occult; longevity supported.", measures: ["Water a peepal tree on Thursday"], avoid: ["Inheritance disputes"] },
  { planet: "Jupiter", house: 9, effect: "Strong fortune and dharma; a supportive father.", measures: ["Serve one's guru"], avoid: ["Religious rigidity"] },
  { planet: "Jupiter", house: 10, effect: "A respected career, often in teaching or counsel.", measures: ["Donate turmeric"], avoid: ["Taking credit unduly"] },
  { planet: "Jupiter", house: 11, effect: "Steady gains; benefit from mentors.", measures: ["Feed the needy on Thursday"], avoid: ["Over-expansion"] },
  { planet: "Jupiter", house: 12, effect: "Spiritual leaning; expenditure on good causes.", measures: ["Donate to a temple or school"], avoid: ["Escapism"] },
  { planet: "Venus", house: 1, effect: "Charm, refinement and an eye for beauty.", measures: ["Keep silver at home"], avoid: ["Vanity"] },
  { planet: "Venus", house: 2, effect: "Pleasant speech; wealth through art or trade.", measures: ["Feed cows"], avoid: ["Extravagance"] },
  { planet: "Venus", house: 3, effect: "Artistic effort; harmony with siblings.", measures: ["Donate white cloth on Friday"], avoid: ["Indulgent company"] },
  { planet: "Venus", house: 4, effect: "Comfort, vehicles and a refined home.", measures: ["Serve the mother"], avoid: ["Luxury beyond means"] },
  { planet: "Venus", house: 5, effect: "Romance and creativity; artistic children.", measures: ["Donate curd and rice"], avoid: ["Impulsive attachments"] },
  { planet: "Venus", house: 6, effect: "Work in beauty, art or hospitality; relationship strain possible.", measures: ["Feed cows regularly"], avoid: ["Entanglements at work"] },
  { planet: "Venus", house: 7, effect: "Marriage and partnership central and generally favoured.", measures: ["Respect the spouse and the women of the house"], avoid: ["Infidelity"] },
  { planet: "Venus", house: 8, effect: "Hidden attachments; sudden gain through partnership.", measures: ["Float sugar in flowing water"], avoid: ["Secret relationships"] },
  { planet: "Venus", house: 9, effect: "Fortune through refinement and travel.", measures: ["Donate white items"], avoid: ["Indulgence disguised as culture"] },
  { planet: "Venus", house: 10, effect: "Career in art, design, media or luxury.", measures: ["Donate silver on Friday"], avoid: ["Superficiality at work"] },
  { planet: "Venus", house: 11, effect: "Gains through art, women and networks.", measures: ["Feed cows"], avoid: ["Dependence on others' generosity"] },
  { planet: "Venus", house: 12, effect: "Private pleasures; expenditure on comfort, foreign links.", measures: ["Donate white cloth at a temple"], avoid: ["Hidden indulgence"] },
  { planet: "Saturn", house: 1, effect: "Serious, enduring temperament; responsibility arrives early.", measures: ["Feed crows and stray dogs"], avoid: ["Alcohol and intoxicants"] },
  { planet: "Saturn", house: 2, effect: "Slow but durable wealth; measured speech.", measures: ["Donate mustard oil on Saturday"], avoid: ["Harsh speech"] },
  { planet: "Saturn", house: 3, effect: "Persistent effort; distance from siblings possible.", measures: ["Serve labourers"], avoid: ["Neglecting duty"] },
  { planet: "Saturn", house: 4, effect: "Home and mother carry responsibility; delay in property.", measures: ["Keep an iron item in the house"], avoid: ["Neglecting the home"] },
  { planet: "Saturn", house: 5, effect: "Delay regarding children; a disciplined intellect.", measures: ["Feed crows"], avoid: ["Pressuring children"] },
  { planet: "Saturn", house: 6, effect: "Excellent at sustained work; overcomes opposition by endurance.", measures: ["Donate iron on Saturday"], avoid: ["Overwork"] },
  { planet: "Saturn", house: 7, effect: "Delay or maturity in marriage; an older or serious partner.", measures: ["Serve the elderly"], avoid: ["Coldness with the spouse"] },
  { planet: "Saturn", house: 8, effect: "Longevity supported; slow, deep transformation.", measures: ["Float black sesame in flowing water"], avoid: ["Morbid thinking"] },
  { planet: "Saturn", house: 9, effect: "Fortune builds late; disciplined belief.", measures: ["Serve the poor"], avoid: ["Cynicism about faith"] },
  { planet: "Saturn", house: 10, effect: "Career through persistence; authority earned slowly.", measures: ["Donate blankets"], avoid: ["Shortcuts at work"] },
  { planet: "Saturn", house: 11, effect: "Gains come late but hold; benefit from elders.", measures: ["Feed crows on Saturday"], avoid: ["Impatience for returns"] },
  { planet: "Saturn", house: 12, effect: "Solitude, foreign residence, expenditure on duty.", measures: ["Donate blankets to the needy"], avoid: ["Isolation"] },
  { planet: "Rahu", house: 1, effect: "An unconventional presence; strong drive for recognition.", measures: ["Keep silver on the person"], avoid: ["Deception"] },
  { planet: "Rahu", house: 2, effect: "Unusual sources of wealth; speech can mislead.", measures: ["Donate barley"], avoid: ["Exaggeration"] },
  { planet: "Rahu", house: 3, effect: "Bold, unconventional effort; media and technology.", measures: ["Feed stray dogs"], avoid: ["Reckless ventures"] },
  { planet: "Rahu", house: 4, effect: "Restlessness at home; property through unusual means.", measures: ["Float coal or a coconut in flowing water"], avoid: ["An unclean home"] },
  { planet: "Rahu", house: 5, effect: "Unconventional intellect; speculation attracts.", measures: ["Donate mustard"], avoid: ["Gambling"] },
  { planet: "Rahu", house: 6, effect: "Strong against opposition and illness; benefits from struggle.", measures: ["Feed dogs regularly"], avoid: ["Shortcuts in service"] },
  { planet: "Rahu", house: 7, effect: "Unusual partnership; a foreign or unconventional spouse.", measures: ["Donate blankets on Saturday"], avoid: ["Deceit in marriage"] },
  { planet: "Rahu", house: 8, effect: "Occult interest; sudden and unexpected events.", measures: ["Float a coconut in flowing water"], avoid: ["Dangerous experimentation"] },
  { planet: "Rahu", house: 9, effect: "Unorthodox belief; foreign travel and study.", measures: ["Serve at a temple"], avoid: ["Rejecting all tradition"] },
  { planet: "Rahu", house: 10, effect: "Career in technology, foreign trade or the unconventional.", measures: ["Keep silver at the workplace"], avoid: ["Manipulation for advancement"] },
  { planet: "Rahu", house: 11, effect: "Large gains, often sudden and from unusual sources.", measures: ["Donate barley and mustard"], avoid: ["Greed"] },
  { planet: "Rahu", house: 12, effect: "Foreign residence; hidden expenditure and isolation.", measures: ["Donate blankets"], avoid: ["Secretive habits"] },
  { planet: "Ketu", house: 1, effect: "A detached temperament; self-doubt alternating with insight.", measures: ["Feed stray dogs"], avoid: ["Self-neglect"] },
  { planet: "Ketu", house: 2, effect: "Detachment from family wealth; sparse speech.", measures: ["Donate sesame"], avoid: ["Careless speech"] },
  { planet: "Ketu", house: 3, effect: "Independent effort; distance from siblings.", measures: ["Keep a two-coloured blanket"], avoid: ["Isolation from family"] },
  { planet: "Ketu", house: 4, effect: "Detachment from home; the mother's health bears watching.", measures: ["Donate blankets"], avoid: ["Neglecting the home"] },
  { planet: "Ketu", house: 5, effect: "Concern regarding children; an intuitive intellect.", measures: ["Feed dogs"], avoid: ["Superstition about children"] },
  { planet: "Ketu", house: 6, effect: "Good at overcoming hidden opposition; unusual ailments.", measures: ["Donate sesame on Tuesday"], avoid: ["Ignoring health signals"] },
  { planet: "Ketu", house: 7, effect: "Detachment in marriage; the partner may be spiritually inclined.", measures: ["Respect the spouse"], avoid: ["Emotional withdrawal"] },
  { planet: "Ketu", house: 8, effect: "A strong occult and research leaning; sudden insight.", measures: ["Float sesame in flowing water"], avoid: ["Obsession with the hidden"] },
  { planet: "Ketu", house: 9, effect: "Spiritual seeking in place of conventional faith.", measures: ["Serve mendicants"], avoid: ["Rejecting guidance"] },
  { planet: "Ketu", house: 10, effect: "Career in research, spirituality or the technical.", measures: ["Donate blankets"], avoid: ["Detachment from responsibility"] },
  { planet: "Ketu", house: 11, effect: "Gains come and go; detachment from desire.", measures: ["Feed dogs regularly"], avoid: ["Careless generosity"] },
  { planet: "Ketu", house: 12, effect: "A strong moksha leaning; a foreign or secluded life.", measures: ["Donate to a spiritual cause"], avoid: ["Escapism"] },
];

/** 9 planets x 12 houses. Asserted so a dropped row fails loudly. */
export function verifyHouseReadings(): { ok: boolean; count: number; missing: string[] } {
  const seen = new Set(LAL_KITAB_HOUSE_READINGS.map((r) => r.planet + "-" + r.house));
  const missing: string[] = [];
  for (const p of ["Sun", "Moon", "Mars", "Mercury", "Jupiter", "Venus", "Saturn", "Rahu", "Ketu"]) {
    for (let h = 1; h <= 12; h++) {
      if (!seen.has(p + "-" + h)) missing.push(p + "-" + h);
    }
  }
  return {
    ok: missing.length === 0 && LAL_KITAB_HOUSE_READINGS.length === 108,
    count: LAL_KITAB_HOUSE_READINGS.length,
    missing,
  };
}

export function readingFor(planet: string, house: number): LalKitabHouseReading | undefined {
  return LAL_KITAB_HOUSE_READINGS.find((r) => r.planet === planet && r.house === house);
}
