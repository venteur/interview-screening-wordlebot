import React, { useState } from "react";
import { Card, CardContent, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { fetchWordleResult } from "../api/api";
import Palette from "./Palette";
import BoxDisplay from "./BoxDisplay";
import "./WordleBot.css";

const WordleBot = () => {
    const [currentChance, setCurrentChance] = useState(0);
    const [guessWord, setGuessWord] = useState("SERAI");
    const [clueCode, setClueCode] = useState("");
    const [apiResult, setApiResult] = useState({ guess: "SERAI" });
    const [cardData, setCardData] = useState([]);

    // const clueInputHandler = (event) => {
    //     setClueCode(event.target.value);
    // };

    const cardDataHandler = () => {
        console.log(clueCode, "hi");
        const request = [
            {
                word: guessWord,
                clue: clueCode,
            },
        ];

        fetchWordleResult(request)
            .then((response) => {
                setApiResult(response);
                setCardData((prevData) => [
                    ...prevData,
                    {
                        guess: apiResult.guess.toLocaleUpperCase(),
                        clue: clueCode,
                        chanceNumber: currentChance,
                    },
                ]);
                setClueCode("");
                setCurrentChance((prevData) => prevData + 1);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const handlePaletteSelection = (code) => {
        const convertedValue = code
            .map((box) => (box === 0 ? "g" : box === 1 ? "y" : "x"))
            .join("");
        setClueCode(convertedValue);
    };

    // Sort cardData array based on chanceNumber
    const sortedCardData = cardData.sort((a, b) => a.chanceNumber - b.chanceNumber);

    return (
        <div>
            {/* Render additional cards for API responses */}
            {sortedCardData.map((card, index) => (
                <Card key={index}>
                    <CardContent>
                        <Typography variant="h4" gutterBottom>
                            Guess #{card.chanceNumber + 1}
                        </Typography>
                        <Typography variant="h6" gutterBottom>
                            Word to Guess:
                            <BoxDisplay word={card.guess} />
                        </Typography>
                        <Typography variant="h6" gutterBottom>
                            What response did you get back?
                        </Typography>
                        {/* <input type="text" value={card.clue} readOnly /> */}
                        <BoxDisplay backgroundColor={card.clue} word={card.guess} />
                    </CardContent>
                </Card>
            ))}
            {/* Render initial card with default values */}
            <Card>
                <CardContent>
                    <Typography variant="h4" gutterBottom>
                        Guess #{currentChance + 1}
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        Word to Guess:
                        {/* <input type="text" value={apiResult.guess.toLocaleUpperCase()} readOnly /> */}
                        <BoxDisplay word={apiResult.guess.toLocaleUpperCase()} />
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        What response did you get back?
                    </Typography>
                    {/* <input type="text" value={clueCode} onChange={clueInputHandler} /> */}
                    <BoxDisplay
                        backgroundColor={clueCode}
                        word={apiResult.guess.toLocaleUpperCase()}
                    />
                    <Palette onPaletteSelection={handlePaletteSelection} />
                </CardContent>
            </Card>

            <Button onClick={cardDataHandler}>Submit</Button>
        </div>
    );
};

export default WordleBot;
