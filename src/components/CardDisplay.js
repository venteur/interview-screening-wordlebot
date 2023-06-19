import React from "react";
import BoxDisplay from "./BoxDisplay";
import { Card, CardContent, Typography} from "@mui/material";

const CardDisplay = ({ chance, guess, colorCode}) => {
    return (
        <Card style={{borderbox: "none", boxShadow:"none"}}>
            <CardContent>
                <Typography variant="h4" gutterBottom>
                    Guess #{chance+1}
                </Typography>

                <div style={{ display:"flex", alignItems:"center"}}>
                    <Typography variant="h6" gutterBottom>
                        Word to Guess:
                    </Typography>
                    <BoxDisplay word={guess} />
                </div>

                <Typography variant="h6" gutterBottom>
                    What response did you get back?
                </Typography>
                <div style={{ display: "flex", justifyContent: "center", }}>
                <BoxDisplay backgroundColor={colorCode} word={guess} />
                </div>
                
            </CardContent>
        </Card>
    );
};
export default CardDisplay;
