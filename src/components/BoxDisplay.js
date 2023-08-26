import React from "react";

/**
 * BoxDisplay component represents the display of individual boxes in the WordleBot game.
 * It displays a word by rendering each letter as a box with a specified background color.
 * It receives the word and backgroundColor as props.
 */

function BoxDisplay({ word, backgroundColor }) {
    const boxStyle = {
        display: "inline-block",
        width: "40px",
        height: "40px",
        border: "1px solid black",
        margin: "5px",
        textAlign: "center",
        lineHeight: "40px",
        backgroundColor: "white", // Default background color is white
    };

    /**
     * Gets the background color for the box at the specified index based on the backgroundColor prop.
     * If the backgroundColor prop is a valid string of length 5, it maps the characters to colors.
     * Returns "white" if the backgroundColor prop is invalid or the index is out of bounds.
     */


    const getBackgroundColor = (index) => {
        if (backgroundColor && backgroundColor.length === 5) {
            const colorChar = backgroundColor.charAt(index).toLowerCase();
            if (colorChar === "g") return "green";
            if (colorChar === "y") return "yellow";
        }
        return "white";
    };

    return (
        <div className="word-box">
            {word.split("").map((letter, index) => (
                <div
                    key={index}
                    style={{ ...boxStyle, backgroundColor: getBackgroundColor(index) }}
                >
                    {letter}
                </div>
            ))}
        </div>
    );
}

export default BoxDisplay;
