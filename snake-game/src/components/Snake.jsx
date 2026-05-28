function Snake({ snake, boardSize, direction }) {
    const cellSize = 100 / boardSize;

    const getSegmentClass = (index) => {
        if (index === 0) return "snake-segment snake-head";
        if (index === snake.length - 1) return "snake-segment snake-tail";
        return "snake-segment snake-body";
    };

    const getHeadDirectionClass = () => {
        if (direction.x === 1) return "look-right";
        if (direction.x === -1) return "look-left";
        if (direction.y === -1) return "look-up";
        if (direction.y === 1) return "look-down";
        return "look-right";
    };

    return (
        <>
            {snake.map((segment, index) => {
                const segmentClass =
                    index === 0
                        ? `${getSegmentClass(index)} ${getHeadDirectionClass()}`
                        : getSegmentClass(index);

                return (
                    <div
                        key={`${segment.x}-${segment.y}-${index}`}
                        className={segmentClass}
                        style={{
                            width: `${cellSize}%`,
                            height: `${cellSize}%`,
                            transform: `translate(${segment.x * 100}%, ${segment.y * 100
                                }%)`,
                        }}
                    />
                );
            })}
        </>
    );
}

export default Snake;