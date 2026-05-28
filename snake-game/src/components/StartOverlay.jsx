function StartOverlay({
    gameStatus,
    score,
    difficulty,
    difficulties,
    onDifficultyChange,
    onStart,
    onRestart,
}) {
    const isGameOver = gameStatus === "gameOver";

    return (
        <div className="overlay">
            <div className="overlay-card">
                <p className="badge">{isGameOver ? "Fin del juego" : "Bienvenido"}</p>

                <h2>{isGameOver ? "La serpiente cayó" : "Entra al Coliseo"}</h2>

                <p>
                    {isGameOver
                        ? `Tu puntaje final fue ${score}. Intenta superar tu marca.`
                        : "Controla la serpiente, come la energía dorada y evita chocar."}
                </p>

                <div className="difficulty-selector">
                    {Object.entries(difficulties).map(([key, value]) => (
                        <button
                            key={key}
                            className={difficulty === key ? "difficulty active" : "difficulty"}
                            onClick={() => onDifficultyChange(key)}
                            type="button"
                        >
                            {value.label}
                        </button>
                    ))}
                </div>

                <button className="main-button" onClick={isGameOver ? onRestart : onStart}>
                    {isGameOver ? "Reiniciar partida" : "Iniciar juego"}
                </button>
            </div>
        </div>
    );
}

export default StartOverlay;