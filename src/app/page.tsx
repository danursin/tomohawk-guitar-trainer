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

export default function Home() {
    const [delay, setDelay] = useState(2000);
    const [chordName, setChordName] = useState<ChordName | "">("");
    const [chordQuality, setChordQuality] = useState<ChordQuality | "">("");
    const [chordInversion, setChordInversion] = useState<ChordInversion | "">("");
    const [rootString, setRootString] = useState<RootString | "">("");

    const onSubmit = useCallback(
        (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();

            const audioContext = new AudioContext();
            const oscillator = audioContext.createOscillator();
            oscillator.connect(audioContext.destination);
            oscillator.start();
            oscillator.stop(audioContext.currentTime + delay / 1000);
        },
        [delay]
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
                        <option value="">Random</option>
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
                        <option value="">Random</option>
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
                        <option value="">Random</option>
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
                        <option value="">Random</option>
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
