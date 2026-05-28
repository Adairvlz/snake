function Score({ score, speed, gameStatus, difficulty }) {
    return (
        <div className="score-card">
            <div>
                <span>Puntaje</span>
                <strong>{score}</strong>
            </div>

            <div>
                <span>Dificultad</span>
                <strong>{difficulty}</strong>
            </div>

            <div>
                <span>Estado</span>
                <strong>
                    {gameStatus === "start"
                        ? "Inicio"
                        : gameStatus === "playing"
                            ? "Jugando"
                            : "Game Over"}
                </strong>
            </div>
        </div>
    );
}

export default Score;