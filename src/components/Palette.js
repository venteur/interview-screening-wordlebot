import { useEffect, useState } from "react";

/**
 * Palette component represents a color palette with selectable boxes.
 *
 * Props:
 * - isLoading: Indicates if the palette is in a loading state.
 * - onPaletteSelection: Callback function triggered when a box is selected.
 */

const Palette = ({ isLoading, onPaletteSelection }) => {
    const [selectedBoxes, setSelectedBoxes] = useState(Array(5).fill(null));

    /**
     * Handles the click event on a box.
     * Updates the selected boxes if not in a loading state.
     */

    const clickHandler = (rowIndex, colIndex) => {
        if (!isLoading) {
            const updatedBoxes = [...selectedBoxes];
            updatedBoxes[colIndex] = rowIndex;
            setSelectedBoxes(updatedBoxes);
        }
    };

    // Trigger the onPaletteSelection callback when selectedBoxes changes.
    useEffect(() => {
        onPaletteSelection(selectedBoxes);
    }, [selectedBoxes, onPaletteSelection]);

    // Reset selectedBoxes when isLoading changes.
    useEffect(() => {
        if (!isLoading) {
            setSelectedBoxes(Array(5).fill(null));
        }
    }, [isLoading]);

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginBottom: "10px",
            }}
        >
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
                                margin: "5px",
                                background:
                                    rowIndex === 0 ? "green" : rowIndex === 1 ? "yellow" : rowIndex ===2 ? "white" : null,
                                opacity: selectedBoxes[colIndex] === rowIndex ? 1 : 0.5,
                            }}
                            onClick={() => clickHandler(rowIndex, colIndex)}
                        ></div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default Palette;
