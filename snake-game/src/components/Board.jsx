function Board({ children, boardSize }) {
    return (
        <div className="board-wrapper">
            <div
                className="board"
                style={{
                    gridTemplateColumns: `repeat(${boardSize}, 1fr)`,
                    gridTemplateRows: `repeat(${boardSize}, 1fr)`,
                }}
            >
                {Array.from({ length: boardSize * boardSize }).map((_, index) => (
                    <div key={index} className="cell" />
                ))}

                {children}
            </div>
        </div>
    );
}

export default Board;