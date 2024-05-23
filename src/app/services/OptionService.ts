export const triadNameOptions = [
    "A", "A♯/B♭", "B", "C", "C♯/D♭", "D", "D♯/E♭", "E", "F", "F♯/G♭", "G", "G♯/A♭"
] as const;

export const triadQualityOptions = [
    "Major", "Minor"
] as const;

export const triadInversionOptions = [
    "Root position", "1st inversion", "2nd inversion"
] as const;

export const stringSetOptions = [
    "Top 3", "Middle Top"
] as const;

export type TriadName = typeof triadNameOptions[number];
export type TriadQuality = typeof triadQualityOptions[number];
export type TriadInversion = typeof triadInversionOptions[number];
export type StringSet = typeof stringSetOptions[number];