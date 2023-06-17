import { useState } from "react";

const Palette = ({onPaletteSelection}) => {
    const [selectedBoxes, setSelectedBoxes] = useState(Array(5).fill(null));

    const clickHandler = (rowIndex, colIndex) => {
        const updatedBoxes = [...selectedBoxes];
        updatedBoxes[colIndex] = rowIndex;
        setSelectedBoxes(updatedBoxes);

        const code = selectedBoxes.map((box) => (box === 0 ? "g" : box === 1 ? "y" : "x")).join("");
        onPaletteSelection(code);
    };

    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
            {[0, 1, 2].map((rowIndex) => (
                <div key={rowIndex} style={{ display: "flex" }}>
                    {[0, 1, 2, 3, 4].map((colIndex) => (
                        <div
                            key={`${rowIndex}-${colIndex}`}
                            style={{
                                width: "40px",
                                height: "40px",
                                border: "1px solid #000",
                                textAlign: "center",
                                fontSize: "18px",
                                lineHeight: "40px",
                                marginRight: "5px",
                                background:
                                    rowIndex === 0 ? "green" : rowIndex === 1 ? "yellow" : "white",
                                opacity: selectedBoxes[colIndex] === rowIndex ? 1 : 0.5,
                            }}
                            onClick={() => clickHandler(rowIndex, colIndex)}
                        ></div>
                    ))}
                </div>
            ))}
            <p>
                Selected code:{" "}
                {selectedBoxes.map((box) => (box === 0 ? "g" : box === 1 ? "y" : "x")).join("")}
            </p>
        </div>
    );
};

export default Palette;
