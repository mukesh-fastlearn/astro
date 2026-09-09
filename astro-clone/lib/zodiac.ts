export interface ZodiacInfo {
  element: string;
  ruler: string;
  color: string;
  traits: string;
  career: string;
  dates: string;
  symbol: string;
}

export const ZODIAC: Record<string, ZodiacInfo> = {
  Aries: { element: "Fire", ruler: "Mars", color: "Red", traits: "Courageous, determined, confident, enthusiastic.", career: "Entrepreneur, Athlete, Military, Engineering.", dates: "Mar 21 – Apr 19", symbol: "♈" },
  Taurus: { element: "Earth", ruler: "Venus", color: "Green/Pink", traits: "Reliable, patient, practical, devoted.", career: "Finance, Agriculture, Art, Luxury Goods.", dates: "Apr 20 – May 20", symbol: "♉" },
  Gemini: { element: "Air", ruler: "Mercury", color: "Light Green/Yellow", traits: "Gentle, affectionate, curious, adaptable.", career: "Journalism, Writing, Sales, Technology.", dates: "May 21 – Jun 20", symbol: "♊" },
  Cancer: { element: "Water", ruler: "Moon", color: "White/Silver", traits: "Tenacious, highly imaginative, loyal, emotional.", career: "Healthcare, Real Estate, Chef, Psychology.", dates: "Jun 21 – Jul 22", symbol: "♋" },
  Leo: { element: "Fire", ruler: "Sun", color: "Gold/Orange", traits: "Creative, passionate, generous, warm-hearted.", career: "Acting, Management, Politics, Entertainment.", dates: "Jul 23 – Aug 22", symbol: "♌" },
  Virgo: { element: "Earth", ruler: "Mercury", color: "Grey/Beige/Pale-Yellow", traits: "Loyal, analytical, kind, hardworking.", career: "Accounting, Medicine, Research, Editing.", dates: "Aug 23 – Sep 22", symbol: "♍" },
  Libra: { element: "Air", ruler: "Venus", color: "Pink/Green", traits: "Cooperative, diplomatic, gracious, fair-minded.", career: "Law, Design, Human Resources, Diplomacy.", dates: "Sep 23 – Oct 22", symbol: "♎" },
  Scorpio: { element: "Water", ruler: "Pluto/Mars", color: "Scarlet/Red", traits: "Resourceful, brave, passionate, stubborn.", career: "Investigation, Science, Surgery, Psychology.", dates: "Oct 23 – Nov 21", symbol: "♏" },
  Sagittarius: { element: "Fire", ruler: "Jupiter", color: "Blue", traits: "Generous, idealistic, great sense of humor.", career: "Teaching, Travel Industry, Philosophy, Publishing.", dates: "Nov 22 – Dec 21", symbol: "♐" },
  Capricorn: { element: "Earth", ruler: "Saturn", color: "Brown/Black", traits: "Responsible, disciplined, self-control.", career: "Business, Architecture, Administration, Law.", dates: "Dec 22 – Jan 19", symbol: "♑" },
  Aquarius: { element: "Air", ruler: "Uranus/Saturn", color: "Light-Blue/Silver", traits: "Progressive, original, independent, humanitarian.", career: "Technology, Science, Social Work, Aviation.", dates: "Jan 20 – Feb 18", symbol: "♒" },
  Pisces: { element: "Water", ruler: "Neptune/Jupiter", color: "Sea Green", traits: "Compassionate, artistic, intuitive, gentle.", career: "Arts, Healing Professions, Music, Non-profit.", dates: "Feb 19 – Mar 20", symbol: "♓" },
};

// Tamil names for the 12 rasis (Mesham … Meenam).
export const TAMIL_RASI: Record<string, string> = {
  Aries: "மேஷம்", Taurus: "ரிஷபம்", Gemini: "மிதுனம்", Cancer: "கடகம்",
  Leo: "சிம்மம்", Virgo: "கன்னி", Libra: "துலாம்", Scorpio: "விருச்சிகம்",
  Sagittarius: "தனுசு", Capricorn: "மகரம்", Aquarius: "கும்பம்", Pisces: "மீனம்",
};
