import React from "react";

function BoxDisplay({ word, backgroundColor }) {
    const boxStyle = {
        display: "inline-block",
        width: "40px",
        height: "40px",
        border: "1px solid black",
        margin: "5px",
        // marginLeft: "5px",
        // marginRight: "5px",
        // marginBottom: "5px",
        textAlign: "center",
        lineHeight: "40px",
        backgroundColor: "white", // Default background color is white
    };

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
