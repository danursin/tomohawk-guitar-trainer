"use client";

import { Divider, Form, Grid, Statistic } from "semantic-ui-react";
import {
    StringSet,
    TriadInversion,
    TriadName,
    TriadQuality,
    stringSetOptions,
    triadInversionOptions,
    triadNameOptions,
    triadQualityOptions
} from "./services/OptionService";
import { useCallback, useRef, useState } from "react";

import { toast } from "react-toastify";

export default function Home() {
    const [delay, setDelay] = useState<number>(1000);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [triadNames, setTriadNames] = useState<Set<TriadName>>(new Set<TriadName>(["A", "B", "C", "D", "E", "F", "G"]));
    const [triadQualities, setTriadQualities] = useState<Set<TriadQuality>>(new Set<TriadQuality>(triadQualityOptions));
    const [triadInversions, setTriadInversions] = useState<Set<TriadInversion>>(new Set<TriadInversion>(["Root position"]));
    const [stringSets, setStringSets] = useState<Set<StringSet>>(new Set<StringSet>(["1-3"]));
    const [currentSelection, setCurrentSelection] = useState<
        | {
              triadName: TriadName;
              triadQuality: TriadQuality;
              triadInversion: TriadInversion;
              stringSet: StringSet;
          }
        | undefined
    >();
    const playingRef = useRef<boolean>(false);

    const formatSoundName = useCallback((triadName: TriadName, triadQuality: TriadQuality, stringSet: StringSet) => {
        const triadNameMap: Record<TriadName, string> = {
            A: "A",
            "A♯/B♭": "A#",
            B: "B",
            C: "C",
            "C♯/D♭": "C#",
            D: "D",
            "D♯/E♭": "D#",
            E: "E",
            F: "F",
            "F♯/G♭": "F#",
            G: "G",
            "G♯/A♭": "G#"
        };

        const triadQualityMap: Record<TriadQuality, string> = {
            Major: "maj",
            Minor: "min"
        };

        return `${triadNameMap[triadName]}${triadQualityMap[triadQuality]}_NoInversion_${stringSet}.mp3`;
    }, []);

    const playNameOfTriad = useCallback(
        async (triadName: TriadName, triadQuality: TriadQuality, triadInversion: TriadInversion, stringSet: StringSet) => {
            let spokenTriadName: string = triadName.replace("♯", ". SHARP ").replace("♭", ". FLAT ");
            if (triadName === "A") {
                spokenTriadName = '"A"';
            }
            if (triadName.includes("/")) {
                // choose a random one of the two names to pronounce
                const names = triadName.split("/");
                spokenTriadName = names[Math.floor(Math.random() * 2)].replace("♯", ". SHARP ").replace("♭", ". FLAT ");
            }

            const parts: string[] = [spokenTriadName, triadQuality];
            if (triadInversion !== "Root position") {
                parts.push(triadInversion);
            }
            if (stringSet !== "1-3") {
                parts.push(`String set ${stringSet}`);
            }
            const speech = new SpeechSynthesisUtterance(parts.join(" "));
            speech.lang = "en-US";
            speechSynthesis.speak(speech);
            await new Promise((resolve) => {
                speech.onend = resolve;
            });
        },
        []
    );

    const playTriad = useCallback(async (filename: string) => {
        const audio = new Audio(`/sounds/${encodeURIComponent(filename)}`);
        audio.play();

        await new Promise((resolve) => {
            audio.onended = resolve;
        });
    }, []);

    const playTriads = useCallback(async () => {
        if (!playingRef.current) {
            return;
        }

        const triadNameArray = Array.from(triadNames);
        const triadQualityArray = Array.from(triadQualities);
        const triadInversionArray = Array.from(triadInversions);
        const stringSetArray = Array.from(stringSets);

        const triadName = triadNameArray[Math.floor(Math.random() * triadNameArray.length)];
        const triadQuality = triadQualityArray[Math.floor(Math.random() * triadQualityArray.length)];
        const triadInversion = triadInversionArray[Math.floor(Math.random() * triadInversionArray.length)];
        const stringSet = stringSetArray[Math.floor(Math.random() * stringSetArray.length)];

        setCurrentSelection({ triadName, triadQuality, triadInversion, stringSet });
        try {
            // play the name of the triad
            await playNameOfTriad(triadName, triadQuality, triadInversion, stringSet);
            // delay
            await new Promise((resolve) => setTimeout(resolve, delay));
            // play the sound of the triad
            await playTriad(formatSoundName(triadName, triadQuality, stringSet));
            // delay
            await new Promise((resolve) => setTimeout(resolve, delay));
        } catch (error) {
            toast.error(`Error playing ${triadName} ${triadQuality} ${triadInversion} ${stringSet}`);
            console.error(error);
        } finally {
            playTriads();
        }
    }, [delay, formatSoundName, playNameOfTriad, playTriad, stringSets, triadInversions, triadNames, triadQualities]);

    return (
        <>
            <Form>
                <Form.Group widths="2">
                    <Form.Input
                        label={`Delay (${delay} ms)`}
                        type="range"
                        value={delay}
                        step="500"
                        min={0}
                        max={10000}
                        onChange={(e, { value }) => setDelay(Number(value))}
                    />
                </Form.Group>

                <Form.Group widths="equal">
                    <Form.Dropdown
                        label="Triad Name"
                        multiple
                        selection
                        options={triadNameOptions.map((triadName) => ({ key: triadName, text: triadName, value: triadName }))}
                        value={Array.from(triadNames)}
                        onChange={(_, { value }) => setTriadNames(new Set(value as TriadName[]))}
                    />
                    <Form.Dropdown
                        label="Triad Quality"
                        multiple
                        selection
                        options={triadQualityOptions.map((triadQuality) => ({
                            key: triadQuality,
                            text: triadQuality,
                            value: triadQuality
                        }))}
                        value={Array.from(triadQualities)}
                        onChange={(_, { value }) => setTriadQualities(new Set(value as TriadQuality[]))}
                    />
                </Form.Group>

                <Form.Group widths="equal">
                    <Form.Dropdown
                        label="Triad Inversion"
                        multiple
                        selection
                        options={triadInversionOptions.map((triadInversion) => ({
                            key: triadInversion,
                            text: triadInversion,
                            value: triadInversion
                        }))}
                        value={Array.from(triadInversions)}
                        onChange={(_, { value }) => setTriadInversions(new Set(value as TriadInversion[]))}
                    />
                    <Form.Dropdown
                        label="String Set"
                        multiple
                        selection
                        options={stringSetOptions.map((stringSet) => ({ key: stringSet, text: stringSet, value: stringSet }))}
                        value={Array.from(stringSets)}
                        onChange={(_, { value }) => setStringSets(new Set(value as StringSet[]))}
                    />
                </Form.Group>

                <Form.Button
                    content={isPlaying ? "Stop" : "Play"}
                    type="button"
                    fluid
                    color={isPlaying ? "red" : "green"}
                    icon={isPlaying ? "stop" : "play"}
                    onClick={async () => {
                        playingRef.current = !playingRef.current;
                        setIsPlaying(playingRef.current);
                        if (playingRef.current) {
                            await playTriads();
                        }
                    }}
                />
            </Form>
            {currentSelection && (
                <Grid textAlign="center">
                    <Grid.Column>
                        <Divider />
                        <Statistic>
                            <Statistic.Label>Current Selection</Statistic.Label>
                            <Statistic.Value>
                                {currentSelection.triadName} {currentSelection.triadQuality} {currentSelection.triadInversion}{" "}
                                {currentSelection.stringSet}
                            </Statistic.Value>
                        </Statistic>
                    </Grid.Column>
                </Grid>
            )}
        </>
    );
}
