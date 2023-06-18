import React, { useState } from "react";
import { Button, Typography, CircularProgress } from "@mui/material";
import { fetchWordleResult } from "../api/api";
import Palette from "./Palette";
import CardDisplay from "./CardDisplay";
import "./WordleBot.css";

const WordleBot = () => {
    const [currentChance, setCurrentChance] = useState(0);
    const [clueCode, setClueCode] = useState("");
    const [apiResult, setApiResult] = useState({ guess: "SERAI" });
    const [cardData, setCardData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isWinner, setIsWinner] = useState(false);

    const cardDataHandler = () => {
        setLoading(true);
        console.log(clueCode, "hi");
        console.log(apiResult.guess, "hello");

        if (clueCode === "ggggg") {
            setLoading(false);
            setIsWinner(true);
            return;
        }
        setError(null);
        const request = [
            {
                word: apiResult.guess,
                clue: clueCode,
            },
        ];

        fetchWordleResult(request)
            .then((response) => {
                setApiResult(response);
                setClueCode("");
                setCurrentChance((prevData) => prevData + 1);
            })
            .catch((error) => {
                console.error(error);
                setError(error.message);
            })
            .finally(() => {
                setLoading(false);
                console.log(cardData, "card Data");
            });
    };

    const updateData = () => {
        setCardData((prevData) => [
            ...prevData,
            {
                guess: apiResult.guess.toLocaleUpperCase(),
                clue: clueCode,
                chanceNumber: currentChance,
            },
        ]);
    };

    const handlePaletteSelection = (code) => {
        const convertedValue = code
            .map((box) => (box === 0 ? "g" : box === 1 ? "y" : "x"))
            .join("");
        setClueCode(convertedValue);
    };

    const handleReset = () => {
        setCurrentChance(0);
        setClueCode("");
        setApiResult({ guess: "SERAI" });
        setCardData([]);
        setLoading(false);
        setError(null);
        setIsWinner(false);
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
            {!isWinner && currentChance < 6 && (
                <div>
                    {!loading && (
                        <CardDisplay
                            key="current-card"
                            chance={currentChance}
                            guess={apiResult.guess.toLocaleUpperCase()}
                            colorCode={clueCode}
                        />
                    )}
                    <Palette onPaletteSelection={handlePaletteSelection} />
                    {!error && (
                        <div className="button-container">
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => {
                                    cardDataHandler();
                                    updateData();
                                }}
                                disabled={loading}
                            >
                                {loading ? <CircularProgress size={24} /> : "Submit"}
                            </Button>
                        </div>
                    )}
                </div>
            )}
            {(error || isWinner || currentChance === 6) && (
                <div className="button-container">
                    <Button variant="contained" color="secondary" onClick={handleReset}>
                        Reset
                    </Button>
                </div>
            )}
            {isWinner && (
                <Typography variant="h5" gutterBottom>
                    Yay! All Done
                </Typography>
            )}
            {currentChance === 6 && (
                <Typography variant="h5" gutterBottom>
                    Sorry! Wanna try again ?
                </Typography>
            )}

            {error && <p style={{ color: "red" }}>Error: {error}</p>}
        </div>
    );
};

export default WordleBot;
