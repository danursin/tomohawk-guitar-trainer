"use client";

import {
    ChordInversion,
    ChordName,
    ChordQuality,
    RootString,
    chordInversionOptions,
    chordNameOptions,
    chordQualityOptions,
    rootStringOptions
} from "./services/OptionService";
import { useCallback, useState } from "react";

const getRandomItem = <T,>(array: ReadonlyArray<T>): T => {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
};

export default function Home() {
    const [delay, setDelay] = useState<number>(1000);
    const [chordName, setChordName] = useState<ChordName>(getRandomItem(chordNameOptions));
    const [chordQuality, setChordQuality] = useState<ChordQuality>(getRandomItem(chordQualityOptions));
    const [chordInversion, setChordInversion] = useState<ChordInversion>("None");
    const [rootString, setRootString] = useState<RootString>("First");

    const playNameOfChord = useCallback(async () => {
        const parts: string[] = [chordName.replace("#", ". SHARP "), chordQuality];
        if (chordInversion !== "None") {
            parts.push(chordInversion);
        }
        const speech = new SpeechSynthesisUtterance(parts.join(" "));
        speech.voice = speechSynthesis.getVoices().find((voice) => voice.lang === "en-US") ?? null;
        speech.lang = "en-US";
        speech.rate = 0.8;
        speech.volume = 1;
        speech.pitch = 2;
        speechSynthesis.speak(speech);
        // await the end of the speech
        await new Promise((resolve) => {
            speech.onend = resolve;
        });
    }, [chordInversion, chordName, chordQuality]);

    const playSound = useCallback(async () => {
        const audio = new Audio("/sounds/example.wav");
        audio.play();

        await new Promise((resolve) => {
            audio.onended = resolve;
        });
    }, []);

    const onSubmit = useCallback(
        async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            await playNameOfChord();
            await new Promise((resolve) => setTimeout(resolve, delay));
            await playSound();
        },
        [delay, playNameOfChord, playSound]
    );

    return (
        <main>
            <h1>Tomohawk Guitar Trainer</h1>

            <form onSubmit={onSubmit}>
                <label>
                    Delay (milliseconds):
                    <input type="number" value={delay} step="500" min={0} max={10000} onChange={(e) => setDelay(Number(e.target.value))} />
                </label>

                <br />

                <label>
                    Chord Name:
                    <select value={chordName} onChange={(e) => setChordName(e.target.value as ChordName)}>
                        {chordNameOptions.map((name) => (
                            <option key={name} value={name}>
                                {name}
                            </option>
                        ))}
                    </select>
                </label>
                <br />
                <label>
                    Chord Quality:
                    <select value={chordQuality} onChange={(e) => setChordQuality(e.target.value as ChordQuality)}>
                        {chordQualityOptions.map((name) => (
                            <option key={name} value={name}>
                                {name}
                            </option>
                        ))}
                    </select>
                </label>
                <br />
                <label>
                    Chord Inversion:
                    <select value={chordInversion} onChange={(e) => setChordInversion(e.target.value as ChordInversion)}>
                        {chordInversionOptions.map((name) => (
                            <option key={name} value={name}>
                                {name}
                            </option>
                        ))}
                    </select>
                </label>
                <br />
                <label>
                    Root String:
                    <select value={rootString} onChange={(e) => setRootString(e.target.value as RootString)}>
                        {rootStringOptions.map((name) => (
                            <option key={name} value={name}>
                                {name}
                            </option>
                        ))}
                    </select>
                </label>
                <br />

                <button type="submit">Start</button>
            </form>
        </main>
    );
}
