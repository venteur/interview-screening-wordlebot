import React, { useState } from "react";
import { Card, CardContent, Typography, CircularProgress } from "@mui/material";
import { fetchWordleResult } from "../api/api";
import Button from "@mui/material/Button";
import Palette from "./Palette";
import BoxDisplay from "./BoxDisplay";
import CardDisplay from "./CardDisplay";
import "./WordleBot.css";

const WordleBot = () => {
    const [currentChance, setCurrentChance] = useState(0);
    const [guessWord, setGuessWord] = useState("SERAI");
    const [clueCode, setClueCode] = useState("");
    const [apiResult, setApiResult] = useState({ guess: "SERAI" });
    const [cardData, setCardData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // const clueInputHandler = (event) => {
    //     setClueCode(event.target.value);
    // };

    const cardDataHandler = () => {
        setLoading(true);
        console.log(clueCode, "hi");
        setError(null);
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
                setError(error.message);
            })
            .finally(() => {
                setLoading(false);
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
                <CardDisplay
                    key={`card-${index}`}
                    chance={card.chanceNumber}
                    guess={card.guess}
                    colorCode={card.clue}
                />
            ))}

            {/* Render initial card with default values */}
            <CardDisplay
                key="current-card"
                chance={currentChance}
                guess={apiResult.guess.toLocaleUpperCase()}
                colorCode={clueCode}
            />
            <Palette onPaletteSelection={handlePaletteSelection} />
            <div
                style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    margin: "10px",
                }}
            >
                <Button
                    variant="contained"
                    color="primary"
                    onClick={cardDataHandler}
                    disabled={loading}
                >
                    {loading ? <CircularProgress size={24} /> : "Submit"}
                </Button>
            </div>

            {error && <p style={{ color: "red" }}>Error: {error}</p>}
        </div>
    );
};

export default WordleBot;
