function Food({ food, boardSize }) {
    const cellSize = 100 / boardSize;

    return (
        <div
            className="food"
            style={{
                width: `${cellSize}%`,
                height: `${cellSize}%`,
                transform: `translate(${food.x * 100}%, ${food.y * 100}%)`,
            }}
        >
            <span />
        </div>
    );
}

export default Food;