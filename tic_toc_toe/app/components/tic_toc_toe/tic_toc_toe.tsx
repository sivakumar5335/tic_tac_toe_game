'use client'
import { useState } from 'react'

export default function TicTocToe() {
    const [size, setSize] = useState(3); // Set the default board size (n x n)
    const initialData = Array(size * size).fill('');
    const [count, setCount] = useState(0);
    const [click, setClick] = useState('');
    const [data, setData] = useState([...initialData]);
    const [player1, setPlayer1] = useState(0);
    const [player2, setPlayer2] = useState(0);
    const [ties, setTies] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [title, setTitle] = useState('Tic Tac Toe');
    const [startingPlayer, setStartingPlayer] = useState(0);

    const toggle = (e: any, num: any) => {
        if (gameOver) {
            return;
        }
        const newData = [...data];
        if (newData[num] !== '') {
            return;
        }
        if (count % 2 === startingPlayer) {
            setClick('X');
            newData[num] = 'x';
        } else {
            setClick('O');
            newData[num] = 'o';
        }
        setData(newData);
        setCount(count + 1);
        handleWinCheck(newData);
    };

    const handleWinCheck = (currentData: string[]) => {
        // Check rows and columns
        for (let i = 0; i < size; i++) {
            if (
                currentData.slice(i * size, (i + 1) * size).every((cell) => cell === 'x') ||
                currentData.slice(i * size, (i + 1) * size).every((cell) => cell === 'o')
            ) {
                won(currentData[i * size]);
                return;
            }
            if (
                currentData.filter((_, index) => index % size === i).every((cell) => cell === 'x') ||
                currentData.filter((_, index) => index % size === i).every((cell) => cell === 'o')
            ) {
                won(currentData[i]);
                return;
            }
        }

        // Check diagonals
        if (
            currentData.filter((_, index) => index % (size + 1) === 0).every((cell) => cell === 'x') ||
            currentData.filter((_, index) => index % (size + 1) === 0).every((cell) => cell === 'o')
        ) {
            won(currentData[0]);
            return;
        }
        if (
            currentData.filter((_, index) => index > 0 && index < size * size - 1 && index % (size - 1) === 0)
                .every((cell) => cell === 'x') ||
            currentData.filter((_, index) => index > 0 && index < size * size - 1 && index % (size - 1) === 0)
                .every((cell) => cell === 'o')
        ) {
            won(currentData[size - 1]);
            return;
        }

      
        if (!currentData.includes('')) {
            setTies(ties + 1);
            setTitle("It's a tie");
            setGameOver(true);
        }
    };

    const won = (winner: string) => {
        setGameOver(true);
        if (winner === 'x') {
            setTitle('Congrats! X won');
            setPlayer1(player1 + 1);
        } else if (winner === 'o') {
            setTitle('Congrats! O wins');
            setPlayer2(player2 + 1);
        }
    };

    const resetGame = () => {
        setCount(0);
        setGameOver(false);
        setData([...initialData]);
        setTitle('Tic Tac Toe');
        setClick('');
        setStartingPlayer((startingPlayer + 1) % 2);
    };

    return (
        <>
            <div className="flex flex-col items-center justify-center bg-gray-900">
                <h1 className="text-4xl font-bold text-white mb-8">{title}</h1>
                <div className="flex justify-around mt-8 w-full max-w-sm text-white mb-8 gap-2">
                    <div className="text-center">
                        <h2 className="text-2xl">Player 1 (X)</h2>
                        <p className="text-xl">{player1}</p>
                    </div>
                    <div className="text-center">
                        <h2 className="text-2xl">Ties</h2>
                        <p className="text-xl">{ties}</p>
                    </div>
                    <div className="text-center">
                        <h2 className="text-2xl">Player 2 (O)</h2>
                        <p className="text-xl">{player2}</p>
                    </div>
                </div>
                <div
                    className="grid gap-2"
                    style={{
                        gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))`
                    }}
                >
                    {data.map((value, index) => (
                        <div
                            key={index}
                            className="w-24 h-24 bg-gray-700 flex items-center justify-center text-2xl text-white cursor-pointer"
                            onClick={(e) => toggle(e, index)}
                        >
                            {value}
                        </div>
                    ))}
                </div>

                <button className="mt-8 px-4 py-2 bg-teal-700 text-white text-lg rounded" onClick={resetGame}>
                    Reset
                </button>
            </div>
        </>
    );
}
