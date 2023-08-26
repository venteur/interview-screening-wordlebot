( {true && (<div>
        <CardDisplay
            key="current-card"
            chance={currentChance}
            guess={apiResult.guess.toLocaleUpperCase()}
            colorCode={clueCode}
        />
        <Palette onPaletteSelection={handlePaletteSelection} />)}
        {!error && (<div className="button-container">
            <Button
                variant="contained"
                color="primary"
                onClick={() => {cardDataHandler(); updateData()}}
                disabled={loading}
            >
                {loading ? <CircularProgress size={24} /> : "Submit"}
            </Button>
        </div>)}
    </div>
)