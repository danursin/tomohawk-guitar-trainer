export const chordNameOptions = [
    "A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"
] as const;

export const chordQualityOptions = [
    "Major", "Minor", "Diminished", "Augmented", "Suspended 2nd", "Suspended 4th", "Major 7th", "Minor 7th", "Dominant 7th", "Diminished 7th", "Half Diminished 7th", "Augmented 7th", "Augmented Major 7th", "Minor Major 7th"
] as const;

export const chordInversionOptions = [
    "None", "First", "Second", "Third"
] as const;

export const rootStringOptions = [
    "First", "Second", "Third", "Fourth", "Fifth", "Sixth"
] as const;

export type ChordName = typeof chordNameOptions[number];
export type ChordQuality = typeof chordQualityOptions[number];
export type ChordInversion = typeof chordInversionOptions[number];
export type RootString = typeof rootStringOptions[number];