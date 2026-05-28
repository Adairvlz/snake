import { useEffect, useRef, useState } from "react";
import Board from "./components/Board.jsx";
import Snake from "./components/Snake.jsx";
import Food from "./components/Food.jsx";
import Score from "./components/Score.jsx";
import StartOverlay from "./components/StartOverlay.jsx";

const BOARD_SIZE = 20;

const INITIAL_SNAKE = [
  { x: 10, y: 10 },
  { x: 9, y: 10 },
  { x: 8, y: 10 },
];

const DIFFICULTIES = {
  easy: {
    label: "Fácil",
    initialSpeed: 155,
    minSpeed: 95,
    speedStep: 1,
  },
  normal: {
    label: "Normal",
    initialSpeed: 130,
    minSpeed: 75,
    speedStep: 1,
  },
  hard: {
    label: "Difícil",
    initialSpeed: 105,
    minSpeed: 60,
    speedStep: 2,
  },
};

const DIRECTIONS = {
  ArrowUp: { x: 0, y: -1 },
  ArrowDown: { x: 0, y: 1 },
  ArrowLeft: { x: -1, y: 0 },
  ArrowRight: { x: 1, y: 0 },
  w: { x: 0, y: -1 },
  s: { x: 0, y: 1 },
  a: { x: -1, y: 0 },
  d: { x: 1, y: 0 },
};

function App() {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [food, setFood] = useState({ x: 14, y: 10 });
  const [direction, setDirection] = useState({ x: 1, y: 0 });
  const [nextDirection, setNextDirection] = useState({ x: 1, y: 0 });
  const [score, setScore] = useState(0);
  const [gameStatus, setGameStatus] = useState("start");
  const [difficulty, setDifficulty] = useState("normal");
  const [speed, setSpeed] = useState(DIFFICULTIES.normal.initialSpeed);

  const gameStatusRef = useRef(gameStatus);
  const nextDirectionRef = useRef(nextDirection);
  const difficultyRef = useRef(difficulty);

  useEffect(() => {
    gameStatusRef.current = gameStatus;
  }, [gameStatus]);

  useEffect(() => {
    nextDirectionRef.current = nextDirection;
  }, [nextDirection]);

  useEffect(() => {
    difficultyRef.current = difficulty;
  }, [difficulty]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      const selectedDirection = DIRECTIONS[event.key];

      if (!selectedDirection) return;

      event.preventDefault();

      if (gameStatusRef.current === "start") {
        startGame();
      }

      if (gameStatusRef.current === "gameOver") return;

      setNextDirection((currentDirection) => {
        const isOppositeDirection =
          currentDirection.x + selectedDirection.x === 0 &&
          currentDirection.y + selectedDirection.y === 0;

        if (isOppositeDirection) {
          return currentDirection;
        }

        return selectedDirection;
      });
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (gameStatus !== "playing") return;

    const interval = setInterval(() => {
      moveSnake();
    }, speed);

    return () => clearInterval(interval);
  }, [gameStatus, speed, food]);

  const moveSnake = () => {
    setSnake((currentSnake) => {
      const currentDirection = nextDirectionRef.current;
      setDirection(currentDirection);

      const head = currentSnake[0];

      const newHead = {
        x: head.x + currentDirection.x,
        y: head.y + currentDirection.y,
      };

      const hitWall =
        newHead.x < 0 ||
        newHead.x >= BOARD_SIZE ||
        newHead.y < 0 ||
        newHead.y >= BOARD_SIZE;

      const ateFood = newHead.x === food.x && newHead.y === food.y;

      const bodyToCheck = ateFood
        ? currentSnake
        : currentSnake.slice(0, currentSnake.length - 1);

      const hitSelf = bodyToCheck.some(
        (segment) => segment.x === newHead.x && segment.y === newHead.y
      );

      if (hitWall || hitSelf) {
        setGameStatus("gameOver");
        return currentSnake;
      }

      let updatedSnake;

      if (ateFood) {
        updatedSnake = [newHead, ...currentSnake];

        setScore((currentScore) => currentScore + 1);

        setFood(generateFood(updatedSnake));

        setSpeed((currentSpeed) => {
          const selectedDifficulty = DIFFICULTIES[difficultyRef.current];

          return Math.max(
            selectedDifficulty.minSpeed,
            currentSpeed - selectedDifficulty.speedStep
          );
        });
      } else {
        updatedSnake = [newHead, ...currentSnake.slice(0, -1)];
      }

      return updatedSnake;
    });
  };

  const generateFood = (currentSnake) => {
    let newFood;

    do {
      newFood = {
        x: Math.floor(Math.random() * BOARD_SIZE),
        y: Math.floor(Math.random() * BOARD_SIZE),
      };
    } while (
      currentSnake.some(
        (segment) => segment.x === newFood.x && segment.y === newFood.y
      )
    );

    return newFood;
  };

  const resetGameValues = () => {
    const selectedDifficulty = DIFFICULTIES[difficulty];

    const newFood = generateFood(INITIAL_SNAKE);

    setSnake(INITIAL_SNAKE);
    setFood(newFood);
    setDirection({ x: 1, y: 0 });
    setNextDirection({ x: 1, y: 0 });
    setScore(0);
    setSpeed(selectedDifficulty.initialSpeed);
  };

  const startGame = () => {
    resetGameValues();
    setGameStatus("playing");
  };

  const restartGame = () => {
    resetGameValues();
    setGameStatus("playing");
  };

  const handleDifficultyChange = (newDifficulty) => {
    if (gameStatus === "playing") return;

    setDifficulty(newDifficulty);
    difficultyRef.current = newDifficulty;
    setSpeed(DIFFICULTIES[newDifficulty].initialSpeed);
  };

  return (
    <main className="app">
      <section className="hero-panel">
        <div className="title-section">
          <p className="eyebrow">React + Vite</p>
          <h1>Snake Coliseum</h1>
          <p className="description">
            Sobrevive dentro del coliseo digital, come energía dorada y aumenta
            tu puntaje sin chocar contra los muros o contra ti mismo.
          </p>
        </div>

        <Score
          score={score}
          speed={speed}
          gameStatus={gameStatus}
          difficulty={DIFFICULTIES[difficulty].label}
        />
      </section>

      <section className="game-layout">
        <Board boardSize={BOARD_SIZE}>
          <Snake snake={snake} boardSize={BOARD_SIZE} direction={direction} />
          <Food food={food} boardSize={BOARD_SIZE} />

          {gameStatus !== "playing" && (
            <StartOverlay
              gameStatus={gameStatus}
              score={score}
              difficulty={difficulty}
              difficulties={DIFFICULTIES}
              onDifficultyChange={handleDifficultyChange}
              onStart={startGame}
              onRestart={restartGame}
            />
          )}
        </Board>

        <aside className="controls-card">
          <h2>Controles</h2>

          <p>
            Usa las flechas del teclado o las teclas <strong>W A S D</strong>.
          </p>

          <div className="keys">
            <span>↑</span>
            <span>←</span>
            <span>↓</span>
            <span>→</span>
          </div>

          <p className="tip">
            La velocidad aumenta poco a poco cada vez que comes energía.
          </p>
        </aside>
      </section>
    </main>
  );
}

export default App;

