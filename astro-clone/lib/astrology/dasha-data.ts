// Vimshottari Dasha interpretation data — ported faithfully from the target site.

export interface MahaInfo {
  title: string;
  overview: string;
  positive: string;
  challenges: string;
  career: string;
  health: string;
  relationships: string;
  spirituality: string;
  remedies: string;
}

export const MAHADASHA_INFO: Record<string, MahaInfo> = {
  Sun: {
    title: "Sun Mahadasha (Surya Dasha) — 6 Years",
    overview: "The Sun Mahadasha is a period of authority, identity, and self-realization. Sun illuminates your life with ambition, leadership, and a strong desire to be recognized. Your true self comes to the forefront — you may rise to positions of authority, gain fame, or take on roles of responsibility. The soul's purpose becomes clearer.",
    positive: "Career advancement, government or administrative success, strong health and vitality, clarity of purpose, father-figure relationships improve, name and fame grow, confidence peaks, spiritual awakening through disciplined practice.",
    challenges: "Ego conflicts, arrogance, conflicts with authority figures, health issues related to heart and eyes, tendency toward pride, possible estrangement from father, overwork, inflexibility.",
    career: "Ideal for government jobs, politics, administration, medicine, gold and precious metals trade, leadership roles. Promotions and recognition are likely.",
    health: "Watch for heart-related issues, high blood pressure, eye problems, bone-related ailments, headaches, fever. Maintain work-life balance.",
    relationships: "Father figure plays a significant role. Spouse may feel neglected due to career focus. Maintain humility. Possible conflicts due to ego.",
    spirituality: "Strong inclination toward worship of the Sun, Shiva, or Vishnu. Surya Namaskar, Gayatri Mantra chanting, and fire rituals are highly beneficial.",
    remedies: "Chant Aditya Hrudayam or Gayatri Mantra daily. Offer water to the rising Sun. Wear Ruby (if Sun is benefic). Donate wheat, copper, and red items on Sundays.",
  },
  Moon: {
    title: "Moon Mahadasha (Chandra Dasha) — 10 Years",
    overview: "The Moon Mahadasha governs emotions, mind, mother, public life, and the subconscious. This deeply personal period where feelings, intuition, and emotional intelligence drive your life. You become more sensitive, empathetic, and in tune with your inner self. Public life and popularity often increase.",
    positive: "Emotional growth, strong intuition, popularity with masses, good for creative fields, motherly support, travel, domestic happiness, financial gains through public dealings, imagination and artistic talents flourish.",
    challenges: "Emotional instability, mood swings, anxiety, depression, overthinking, dependency issues, water-related health concerns, changing mind, attachment to past.",
    career: "Excellent for public relations, hospitality, travel, nursing, psychology, arts and entertainment, food and beverages, real estate near water, import-export.",
    health: "Watch for mental health fluctuations, hormonal imbalances, digestive issues, cold and cough, water retention, sleep disorders. Rest and routine are essential.",
    relationships: "Very strong focus on mother and maternal relationships. Domestic life is highlighted. Marriage is emotionally deep but sensitive.",
    spirituality: "Devotion to Goddess (Durga, Lakshmi, Saraswati), Moon worship, chanting Om Chandraya Namah, visiting water bodies and temples. Monday fasts are beneficial.",
    remedies: "Wear Pearl or Moonstone (if Moon is benefic). Chant Chandra Mantra 108 times on Mondays. Offer milk and white flowers to Shiva.",
  },
  Mars: {
    title: "Mars Mahadasha (Mangala Dasha) — 7 Years",
    overview: "Mars Mahadasha is a period of energy, courage, ambition, and action. Mars infuses life with drive, confidence, and a desire to conquer. This is a time for bold moves, physical pursuits, and asserting oneself. Real estate, engineering, and military matters are highlighted.",
    positive: "Tremendous energy, courage to face challenges, success in competitive environments, real estate gains, leadership in crisis, surgical procedures succeed, siblings play positive roles.",
    challenges: "Aggression, accidents, injuries, conflicts with authority, legal disputes, impulsive decisions, blood pressure issues, tendency toward anger.",
    career: "Best for military, police, engineering, surgery, real estate, sports, construction, manufacturing, fire services, martial arts.",
    health: "Watch for accidents, cuts, burns, blood disorders, inflammation, fever, surgery-related events, head injuries. Exercise regularly but avoid recklessness.",
    relationships: "Siblings (especially brothers) play key roles. Marital life may see friction due to aggression. Passion is high.",
    spirituality: "Worship of Kartikeya (Murugan), Hanuman, Lord Shiva. Chant Mangala Stotram. Tuesdays are auspicious.",
    remedies: "Chant Om Angarakaya Namah 108 times on Tuesdays. Donate red lentils, copper utensils on Tuesdays. Visit Hanuman temple.",
  },
  Rahu: {
    title: "Rahu Mahadasha — 18 Years",
    overview: "Rahu Mahadasha is one of the most transformative and unpredictable periods. Rahu represents obsession, illusion, foreign elements, technology, and sudden change. This 18-year period brings extraordinary opportunities mixed with illusions and confusion. It disrupts the status quo and pushes toward unconventional paths.",
    positive: "Sudden rise in status, foreign travel and settlements, gains through technology, material success, breakthroughs in career, fame in media, research and innovation thrive, hidden talents emerge.",
    challenges: "Illusions and deception, mysterious health problems, relationship deceptions, addictive behaviors, mental restlessness, fear and anxiety, sudden falls from success.",
    career: "Excellent for IT and technology, media, politics, aviation, foreign trade, research, occult sciences, pharmaceuticals, cinema.",
    health: "Watch for mysterious illnesses, skin disorders, mental health issues, phobias, poisoning or allergies, neurological concerns.",
    relationships: "Unconventional relationships, foreign spouses possible. Deception in partnerships is a risk. Clear communication essential.",
    spirituality: "Worship of Durga, Kali, or Saraswati. Chant Durga Saptashati or Rahu Beej Mantra. Feed crows.",
    remedies: "Chant Om Rahave Namah 108 times daily. Donate blue/black items on Saturdays. Feed crows and homeless people.",
  },
  Jupiter: {
    title: "Jupiter Mahadasha (Guru Dasha) — 16 Years",
    overview: "Jupiter Mahadasha is widely considered the most auspicious major period. Jupiter brings wisdom, expansion, spirituality, prosperity, and good fortune. Life tends to expand in positive ways — financially, spiritually, and socially. Higher education, marriage, children, and religious pursuits are all blessed.",
    positive: "Wealth accumulation, successful marriage and children, higher education success, professional recognition, spiritual growth, religious travel, good reputation, guru relationships.",
    challenges: "Overindulgence (weight gain), overconfidence, laziness due to comfort, liver and metabolism issues, preachiness, financial over-extension.",
    career: "Outstanding for teaching, law, finance, banking, advisory roles, philosophy, religion, publishing, academia, counseling, investment.",
    health: "Generally excellent. Watch for liver issues, obesity, diabetes, blood sugar, fatty liver. Maintain discipline in diet.",
    relationships: "Marriage and children are strongly blessed. Relationship with gurus and mentors is meaningful. Family expands.",
    spirituality: "Golden period for spiritual practice. Yagnas, pilgrimages, studying Vedas. Worship Vishnu, Brihaspati, or Dattatreya.",
    remedies: "Chant Om Gurave Namah. Wear Yellow Sapphire if Jupiter is benefic. Donate yellow items on Thursdays. Serve teachers.",
  },
  Saturn: {
    title: "Saturn Mahadasha (Shani Dasha) — 19 Years",
    overview: "Saturn Mahadasha is the longest at 19 years and one of the most karmic and transformative. Saturn demands discipline, hard work, patience, and accountability. This period is rarely easy, but its rewards — earned through genuine effort — are lasting and profound. Saturn teaches humility, service, and karma.",
    positive: "Lasting career success through hard work, mastery of a field, justice prevails, discipline and organization, gains through service, support from elderly, land and property gains, spiritual depth.",
    challenges: "Delays and obstacles, health challenges (joints, bones, chronic illness), depression, loneliness, separation, legal troubles, financial strain, burden of responsibilities.",
    career: "Best for engineering, law, mining, construction, agriculture, service to society, oil and gas, real estate, judiciary, astrology, meditation instruction.",
    health: "Watch for joint pain, arthritis, chronic diseases, dental issues, nerve problems, depression, skin disorders, digestive sluggishness.",
    relationships: "Relationships may feel burdensome or cold initially. Commitment and loyalty are tested. Service to partner is key.",
    spirituality: "Deepest spiritual lessons come through Saturn. Service to the poor, aged, and disabled. Worship Shani Dev, Bhairav, or Hanuman.",
    remedies: "Chant Shani Chalisa or Om Shanaischaraya Namah on Saturdays. Donate black sesame, mustard oil, iron on Saturdays. Serve your elders.",
  },
  Mercury: {
    title: "Mercury Mahadasha (Budha Dasha) — 17 Years",
    overview: "Mercury Mahadasha is a period of intellect, communication, commerce, analysis, and adaptability. Mercury makes this a time of mental sharpness, learning, writing, trading, and networking. Business ventures tend to succeed due to Mercury's commercial nature.",
    positive: "Business success, excellent communication, writing and publishing opportunities, educational achievements, multiple income sources, sharp analytical mind, successful negotiations.",
    challenges: "Indecisiveness, nervousness, overthinking, scattered energy, skin and nervous system issues, speech-related problems, tendency to manipulate.",
    career: "Best for business, commerce, accounting, writing, journalism, IT and software, mathematics, astrology, teaching, marketing, public relations.",
    health: "Watch for nervous disorders, skin conditions, breathing issues, intestinal problems, speech disorders. Yoga and meditation are beneficial.",
    relationships: "Intellectual connection matters most. Communication with spouse is key. Siblings relationships are highlighted.",
    spirituality: "Worship of Lord Vishnu, Saraswati, or Ganesha. Wednesday is auspicious. Study of scriptures and sacred texts is beneficial.",
    remedies: "Chant Om Budhaya Namah on Wednesdays. Donate green vegetables, moong dal, books. Wear Emerald if Mercury is benefic.",
  },
  Ketu: {
    title: "Ketu Mahadasha — 7 Years",
    overview: "Ketu Mahadasha is a period of spiritual depth, detachment, past-life karma resolution, and inner transformation. Ketu represents liberation, moksha, and the mystical. This 7-year period often pulls you away from material pursuits toward spiritual seeking. Enormous inner growth occurs.",
    positive: "Spiritual awakening, liberation from old karmas, occult knowledge, psychic abilities may develop, success in healing arts, past-life wisdom surfaces.",
    challenges: "Confusion and lack of direction, unexpected losses, accidents, misdiagnoses, isolation or separation, mysterious health ailments, feelings of meaninglessness.",
    career: "Best for spiritual teaching, alternative healing, occult sciences, research, mathematics, computers, foreign travel, introspective work.",
    health: "Watch for mysterious or misdiagnosed conditions, nerve-related issues, wounds, accidents, spiritual/emotional burnout.",
    relationships: "Relationships may feel karmic or destined. Some separations occur. Deep soul-level connections are possible.",
    spirituality: "Most spiritually charged period. Meditation, solitude, pilgrimage. Study of tantra, yoga, vedanta. Worship Ganesha, Bhairav, or Kali.",
    remedies: "Chant Om Ketave Namah 108 times. Donate blankets and sesame seeds. Worship Ganesha. Feed dogs.",
  },
  Venus: {
    title: "Venus Mahadasha (Shukra Dasha) — 20 Years",
    overview: "Venus Mahadasha is the longest and often most pleasurable at 20 full years. Venus governs love, beauty, luxury, arts, relationships, comforts, and refinement. This period brings wealth, romance, artistic success, and a refined lifestyle. For many, this is the most enjoyable phase of life.",
    positive: "Marriage and romantic fulfillment, artistic success, luxury and comforts increase, financial prosperity, vehicles and property, travel to beautiful places, good food and lifestyle.",
    challenges: "Over-indulgence in pleasures, laziness, reproductive health issues, excessive spending, jealousy, attachment to material comforts.",
    career: "Best for arts, entertainment, music, film, fashion, luxury goods, hospitality, cosmetics, jewelry, textiles, interior design, food industry.",
    health: "Watch for reproductive system issues, diabetes, kidney concerns, hormonal imbalances, skin conditions. Moderation in diet is key.",
    relationships: "Most romantic of all Dashas. Marriage is likely. Love relationships are passionate and deep. Spouse tends to be attractive and refined.",
    spirituality: "Worship of Goddess Lakshmi, Saraswati, or Radha. Friday fasts are auspicious. Arts and music as offerings to the divine.",
    remedies: "Chant Om Shukraya Namah on Fridays. Donate white rice, sugar, ghee on Fridays. Wear Diamond or White Sapphire if Venus is benefic.",
  },
};

type Rel = "self" | "friend" | "enemy" | "neutral";

export const RELATIONSHIP: Record<string, Record<string, Rel>> = {
  Sun: { Sun: "self", Moon: "friend", Mars: "friend", Mercury: "neutral", Jupiter: "friend", Venus: "enemy", Saturn: "enemy", Rahu: "enemy", Ketu: "enemy" },
  Moon: { Sun: "friend", Moon: "self", Mars: "neutral", Mercury: "friend", Jupiter: "neutral", Venus: "neutral", Saturn: "neutral", Rahu: "enemy", Ketu: "enemy" },
  Mars: { Sun: "friend", Moon: "friend", Mars: "self", Mercury: "enemy", Jupiter: "friend", Venus: "neutral", Saturn: "neutral", Rahu: "enemy", Ketu: "neutral" },
  Mercury: { Sun: "friend", Moon: "enemy", Mars: "neutral", Mercury: "self", Jupiter: "neutral", Venus: "friend", Saturn: "neutral", Rahu: "friend", Ketu: "neutral" },
  Jupiter: { Sun: "friend", Moon: "friend", Mars: "friend", Mercury: "enemy", Jupiter: "self", Venus: "enemy", Saturn: "neutral", Rahu: "enemy", Ketu: "neutral" },
  Venus: { Sun: "enemy", Moon: "enemy", Mars: "neutral", Mercury: "friend", Jupiter: "neutral", Venus: "self", Saturn: "friend", Rahu: "friend", Ketu: "neutral" },
  Saturn: { Sun: "enemy", Moon: "enemy", Mars: "enemy", Mercury: "friend", Jupiter: "neutral", Venus: "friend", Saturn: "self", Rahu: "friend", Ketu: "neutral" },
  Rahu: { Sun: "enemy", Moon: "enemy", Mars: "enemy", Mercury: "friend", Jupiter: "neutral", Venus: "friend", Saturn: "friend", Rahu: "self", Ketu: "enemy" },
  Ketu: { Sun: "neutral", Moon: "friend", Mars: "friend", Mercury: "enemy", Jupiter: "friend", Venus: "enemy", Saturn: "neutral", Ketu: "self", Rahu: "enemy" },
};

export interface PlanetDomain {
  domains: string[];
  positive: string;
  negative: string;
  deity: string;
}

export const PLANET_DOMAINS: Record<string, PlanetDomain> = {
  Sun: { domains: ["career", "government", "father", "authority", "health"], positive: "Authority, confidence, and leadership", negative: "Ego conflicts and pride", deity: "Surya/Shiva" },
  Moon: { domains: ["emotions", "mother", "mind", "public life", "creativity"], positive: "Intuition, popularity, and emotional depth", negative: "Anxiety, mood swings, and overthinking", deity: "Parvati/Lakshmi" },
  Mars: { domains: ["property", "siblings", "energy", "competition", "surgery"], positive: "Courage, energy, and determination", negative: "Aggression, accidents, and conflicts", deity: "Hanuman/Kartikeya" },
  Mercury: { domains: ["business", "communication", "education", "trade", "intellect"], positive: "Intelligence, commerce, and adaptability", negative: "Nervousness, deception, and scattered focus", deity: "Vishnu/Saraswati" },
  Jupiter: { domains: ["wisdom", "wealth", "children", "spirituality", "law"], positive: "Wisdom, prosperity, and divine grace", negative: "Overconfidence and excess", deity: "Brihaspati/Vishnu" },
  Venus: { domains: ["marriage", "luxury", "arts", "beauty", "vehicles"], positive: "Beauty, harmony, and material comfort", negative: "Overindulgence, laziness, and attachment", deity: "Lakshmi/Radha" },
  Saturn: { domains: ["service", "discipline", "karma", "longevity", "hardship"], positive: "Discipline, endurance, and lasting success", negative: "Delays, depression, and chronic issues", deity: "Shani Dev/Hanuman" },
  Rahu: { domains: ["foreign", "technology", "ambition", "transformation", "illusion"], positive: "Ambition, innovation, and breakthrough", negative: "Illusion, confusion, and deception", deity: "Durga/Kali" },
  Ketu: { domains: ["spirituality", "detachment", "past karma", "occult", "liberation"], positive: "Spiritual insight and liberation", negative: "Confusion, isolation, and material loss", deity: "Ganesha/Bhairav" },
};

export const YOGAS: Record<string, { yoga?: string; note: string }> = {
  "Moon-Jupiter": { yoga: "Gaja Kesari Yoga", note: "One of the most auspicious combinations bringing wisdom, wealth, and emotional abundance." },
  "Jupiter-Moon": { yoga: "Gaja Kesari Yoga", note: "Emotional abundance, prosperity, public popularity, and deep satisfaction." },
  "Mars-Rahu": { yoga: "Angarak Yoga", note: "Highly volatile and accident-prone period. Channel energy into technology and defense." },
  "Rahu-Mars": { yoga: "Angarak Yoga", note: "Explosive, impulsive energy. Risk of fire, accidents, and violent confrontations." },
  "Rahu-Jupiter": { yoga: "Guru Chandal Yoga", note: "Tension between wisdom and ambition. Rapid expansion through unconventional means." },
  "Jupiter-Rahu": { yoga: "Guru Chandal Yoga", note: "Blessings partially disrupted by Rahu. Maintain strict ethical standards." },
  "Rahu-Ketu": { note: "Full activation of the nodal axis. Highly unpredictable, fated events. Stay grounded." },
  "Ketu-Rahu": { note: "Nodal axis storm. Sudden gains and losses, unexpected meetings, karmic completions." },
  "Sun-Saturn": { note: "King and servant in conflict. Obstacles, delays, and tests of humility." },
  "Saturn-Sun": { note: "Service vs authority tension. Conflicts with government and father figures." },
  "Saturn-Saturn": { note: "Maximum karmic weight. Heaviest period requiring absolute discipline and service." },
  "Venus-Venus": { note: "Peak of all Venusian themes. Maximum love, luxury, artistic success, and marriage prospects." },
  "Jupiter-Jupiter": { note: "Maximum divine grace. All auspicious events, promotions, marriage, and spiritual growth." },
  "Mars-Mars": { note: "Double Martian intensity. Enormous drive but very high accident and conflict risk." },
  "Ketu-Jupiter": { yoga: "Moksha Combination", note: "One of the most spiritually elevated combinations. Past-life spiritual achievements surface." },
  "Moon-Rahu": { note: "Rahu eclipses the Moon, creating mental unrest, illusions, and possible psychic experiences." },
  "Sun-Rahu": { note: "Rahu eclipses the Sun, creating confusion around identity and goals." },
  "Mars-Venus": { note: "The cosmic warrior meets the lover. Intense passion, creative energy, and sensual experiences." },
  "Venus-Mars": { note: "Passionate action fueled by desire. Romance is intensely physical and emotionally charged." },
  "Saturn-Venus": { note: "Friends in astrology. Disciplined creative work in arts, luxury, or real estate bears lasting fruit." },
  "Venus-Saturn": { note: "Steady, disciplined accumulation of luxury, wealth, and professional recognition." },
  "Mercury-Venus": { note: "Friends bringing creative commerce, arts business, beauty industry, and charming communication." },
  "Venus-Mercury": { note: "Creative communication and business success in arts, beauty, fashion, and media." },
};

export const PLANET_GLYPH: Record<string, { bg: string; text: string; icon: string; badge: string }> = {
  Sun: { bg: "#FF6B35", text: "#fff", icon: "☀️", badge: "Su" },
  Moon: { bg: "#A8B8D8", text: "#333", icon: "🌙", badge: "Mo" },
  Mars: { bg: "#CC2936", text: "#fff", icon: "♂", badge: "Ma" },
  Mercury: { bg: "#2DC653", text: "#fff", icon: "☿", badge: "Me" },
  Jupiter: { bg: "#F4A261", text: "#333", icon: "♃", badge: "Ju" },
  Venus: { bg: "#E76F51", text: "#fff", icon: "♀", badge: "Ve" },
  Saturn: { bg: "#4A4063", text: "#fff", icon: "♄", badge: "Sa" },
  Rahu: { bg: "#2C3E50", text: "#fff", icon: "☊", badge: "Ra" },
  Ketu: { bg: "#7F4F24", text: "#fff", icon: "☋", badge: "Ke" },
};

export interface AntardashaInterpretation {
  title: string;
  theme: string;
  interpretation: string;
  keywords: string[];
  favorable: string;
  caution: string;
  yoga?: string;
}

// Faithful port of the original antardasha interpretation generator.
export function getAntardashaInterpretation(maha: string, antar: string): AntardashaInterpretation {
  const rel: Rel = maha === antar ? "self" : RELATIONSHIP[maha]?.[antar] || "neutral";
  const l = PLANET_DOMAINS[maha];
  const d = PLANET_DOMAINS[antar];
  const N = YOGAS[`${maha}-${antar}`];
  const title = `${maha}–${antar} Antardasha`;
  let theme = "";
  let interpretation = "";
  let favorable = "";
  let caution = "";
  const keywords: string[] = [];

  if (rel === "self") {
    theme = `Pure ${maha} Energy`;
    interpretation = `${maha} within its own sub-period creates an intensified focus on all ${maha}-related themes. ${d.positive} are amplified to their maximum. This is a defining period within the ${maha} Mahadasha where core themes manifest most strongly. Focus on ${l.domains.slice(0, 3).join(", ")} for best results. ${N?.note || `The qualities of ${maha} are at their peak. Worship ${l.deity} for best results.`}`;
    favorable = `Peak ${maha} results in ${l.domains.join(", ")}`;
    caution = `${d.negative}. Guard against excess.`;
    keywords.push(maha, "Intensified", "Peak", ...l.domains.slice(0, 3));
  } else if (rel === "friend") {
    theme = `Harmonious ${maha} × ${antar}`;
    interpretation = `${maha} and ${antar} are natural friends, making this a harmonious and productive period. ${d.positive} support and enhance the themes of ${maha} Mahadasha. ${N?.note || `The combination brings ${d.positive.toLowerCase()} into the areas of ${l.domains.slice(0, 2).join(" and ")}.`} ${N?.yoga ? `This activates ${N.yoga}.` : ""}`;
    favorable = `${d.positive}. Growth in ${[...l.domains.slice(0, 2), ...d.domains.slice(0, 2)].join(", ")}`;
    caution = `Minor challenges in ${d.negative.toLowerCase()}`;
    keywords.push("Harmony", "Support", ...d.domains.slice(0, 2), ...l.domains.slice(0, 1));
  } else if (rel === "enemy") {
    theme = `Tension: ${maha} vs ${antar}`;
    interpretation = `${maha} and ${antar} are natural enemies, creating friction and challenges during this sub-period. ${N?.note || `The energy of ${antar} conflicts with ${maha}'s agenda, bringing ${d.negative.toLowerCase()} into areas of ${l.domains.slice(0, 2).join(" and ")}.`} Patience, spiritual practice, and careful decision-making are essential. ${N?.yoga ? `This activates the challenging ${N.yoga}.` : ""} Worship ${d.deity} alongside ${l.deity} for balance.`;
    favorable = `Learning through adversity. Growth in ${d.domains[0]} with effort`;
    caution = `${d.negative}. Conflicts in ${l.domains.slice(0, 2).join(" and ")}`;
    keywords.push("Tension", "Challenge", "Growth", ...d.domains.slice(0, 2));
  } else {
    theme = `Mixed: ${maha} with ${antar}`;
    interpretation = `${maha} and ${antar} have a neutral relationship, creating mixed results. ${N?.note || `${antar}'s energy neither strongly supports nor opposes ${maha}'s themes. Your own effort determines outcomes.`} ${d.positive} may manifest moderately in ${d.domains.slice(0, 3).join(", ")}. Balanced approach to both ${maha} and ${antar} themes yields best results.`;
    favorable = `Moderate results in ${d.domains.slice(0, 3).join(", ")}`;
    caution = `${d.negative}. Effort determines outcomes`;
    keywords.push("Mixed", "Effort", ...d.domains.slice(0, 2), ...l.domains.slice(0, 1));
  }

  return { title, theme, interpretation, keywords, favorable, caution, yoga: N?.yoga };
}
