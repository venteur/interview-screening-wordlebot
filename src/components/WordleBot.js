import React, { useEffect, useState } from "react";
import { Button, Typography, CircularProgress } from "@mui/material";
import { fetchWordleResult } from "../api/api";
import Palette from "./Palette";
import CardDisplay from "./CardDisplay";
import "./WordleBot.css";

/**
 * WordleBot component represents the main component for the Wordle helper game.
 * It handles the game logic, API requests, and rendering of the game elements.
 */

const WordleBot = () => {
    // State Variables
    const [currentChance, setCurrentChance] = useState(0); // Current chance number
    const [clueCode, setClueCode] = useState(""); // Clue code input
    const [apiResult, setApiResult] = useState({ guess: "SERAI" }); // API result for current guess
    const [cardData, setCardData] = useState([]); // Array of objects containing card data for previous guesses
    const [loading, setLoading] = useState(false); // Loading state for API request
    const [error, setError] = useState(null); // Error state for API request
    const [isWinner, setIsWinner] = useState(false); // Winner state when the clue code matches

    // Handler for fetching guess, handling errors and setting winner
    const cardDataHandler = () => {
        setLoading(true);

        if (clueCode === "ggggg") {
            setLoading(false);
            setIsWinner(true);
            updateData();
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
                setError(error.message);
            })
            .finally(() => {
                setLoading(false);
                updateData();
            });
    };

    // Update card data array with the latest guess
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

    //Handle palette color selection
    const handlePaletteSelection = (code) => {
        const convertedValue = code
            .map((box) => (box === 0 ? "g" : box === 1 ? "y" : "x"))
            .join("");
        setClueCode(convertedValue);
    };

    // Reset all states to initial values
    const handleReset = () => {
        setCurrentChance(0);
        setClueCode("");
        setApiResult({ guess: "SERAI" });
        setCardData([]);
        setLoading(false);
        setError(null);
        setIsWinner(false);
    };


    useEffect(() => {
        setClueCode("");
    }, [apiResult]);

    return (
        <div>
            {/* Render cards for previous user interaction data */}
            {cardData?.map((card, index) => (
                <div key={index}>
                    <CardDisplay
                        key={`card-${index}`}
                        chance={card.chanceNumber}
                        guess={card.guess}
                        colorCode={card.clue}
                    />
                    <div className="card-display"></div>
                </div>
            ))}

            {/* Render initial card with default values */}
            {!isWinner && currentChance < 6 && !error && (
                <div>
                    <CardDisplay
                        key="current-card"
                        chance={currentChance}
                        guess={apiResult.guess.toLocaleUpperCase()}
                        colorCode={clueCode}
                    />

                    <Palette isLoading={loading} onPaletteSelection={handlePaletteSelection} />
                    {!error && (
                        <div className="button-container">
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={cardDataHandler}
                                disabled={loading}
                            >
                                {loading ? <CircularProgress size={24} /> : "Submit"}
                            </Button>
                        </div>
                    )}
                </div>
            )}

            {/* Render reset button when there is an error, winner, or reached maximum chances */}
            {(error || isWinner || currentChance === 6) && (
                <div className="button-container">
                    <Button variant="contained" color="secondary" onClick={handleReset}>
                        Reset
                    </Button>
                </div>
            )}

            {/* Render winner message */}
            {isWinner && (
                <Typography variant="h5" gutterBottom>
                    Yay! All Done
                </Typography>
            )}

            {/* Render maximum chances reached message */}
            {currentChance === 6 && (
                <Typography variant="h5" gutterBottom>
                    Sorry! Wanna try again ?
                </Typography>
            )}

            {/* Render error message */}
            {error && <p style={{ color: "red" }}>Error: {error}</p>}
        </div>
    );
};

export default WordleBot;
