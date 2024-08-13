'use client'
import { useRef, useState } from 'react'

const initialData = ['','','','','','','','','']

export default function TicTocToe(){
    let [count, setCount] = useState(0);
    let [data, setData] = useState([...initialData])
    let [player1,setPlayer1]=useState(0);
    let [player2,setPlayer2]=useState(0);
    let [ties,setTies]=useState(0);
    let [gameOver,setGameOver]=useState(false)
    let [title,setTitle]=useState('Tic Toc Toe')

    const toggle = (e: any, num: any) => {
        if(gameOver){
            return 0;
        }
        const newData = [...data]
        if(newData[num]!==''){
            return;
        }
        if(count % 2 === 0){
            e.target.innerHTML = 'X'
            newData[num] = 'x'
        } else {
            e.target.innerHTML = 'O'
            newData[num] = 'o'
        }
        setData(newData)
        setCount(count + 1)
        handleWinCheck(newData)
        
    }

    const handleWinCheck = (currentData: string[]) => {
        if (currentData[0] === currentData[1] && currentData[1] === currentData[2] && currentData[2] !== '') {
            won(currentData[0])
        } else if (currentData[3] === currentData[4] && currentData[4] === currentData[5] && currentData[5] !== '') {
            won(currentData[3])
        } else if (currentData[6] === currentData[7] && currentData[7] === currentData[8] && currentData[8] !== '') {
            won(currentData[6])
        } else if (currentData[0] === currentData[3] && currentData[3] === currentData[6] && currentData[6] !== '') {
            won(currentData[0])
        } else if (currentData[1] === currentData[4] && currentData[4] === currentData[7] && currentData[7] !== '') {
            won(currentData[1])
        } else if (currentData[2] === currentData[5] && currentData[5] === currentData[8] && currentData[8] !== '') {
            won(currentData[2])
        } else if (currentData[0] === currentData[4] && currentData[4] === currentData[8] && currentData[8] !== '') {
            won(currentData[0])
        } else if (currentData[2] === currentData[4] && currentData[4] === currentData[6] && currentData[6] !== '') {
            won(currentData[2])
        }
        if(!currentData.includes('')){
            setTies(ties+1)
        }
    }

    const won = (winner: string) => {
        setGameOver(true)
        if(winner ===  'x'){
            setTitle('Congrats! X won');
            setPlayer1(player1+1)
            
        }else if(winner==='o'){
            setTitle('Congrats! O wins ')
            setPlayer2(player2+1)
        }else{
            setTitle('Its a tie')
        }
    }

    const resetGame = () => {
        setCount(0)
        setGameOver(false)
        setData([...initialData])
        setTitle('Tic Toc Toe')
        const boxes = document.querySelectorAll('.box')
        boxes.forEach(box => box.innerHTML = '')
    }

    return (
        <div className="flex flex-col items-center justify-center bg-gray-900">
            <h1 className="text-4xl font-bold text-white mb-8" >{title}</h1>
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
            <div className="grid grid-cols-3 gap-4">
                <div className="w-24 h-24 bg-gray-700 flex items-center justify-center text-2xl text-white cursor-pointer box" onClick={(e) => toggle(e, 0)}></div>
                <div className="w-24 h-24 bg-gray-700 flex items-center justify-center text-2xl text-white cursor-pointer box" onClick={(e) => toggle(e, 1)}></div>
                <div className="w-24 h-24 bg-gray-700 flex items-center justify-center text-2xl text-white cursor-pointer box" onClick={(e) => toggle(e, 2)}></div>
                <div className="w-24 h-24 bg-gray-700 flex items-center justify-center text-2xl text-white cursor-pointer box" onClick={(e) => toggle(e, 3)}></div>
                <div className="w-24 h-24 bg-gray-700 flex items-center justify-center text-2xl text-white cursor-pointer box" onClick={(e) => toggle(e, 4)}></div>
                <div className="w-24 h-24 bg-gray-700 flex items-center justify-center text-2xl text-white cursor-pointer box" onClick={(e) => toggle(e, 5)}></div>
                <div className="w-24 h-24 bg-gray-700 flex items-center justify-center text-2xl text-white cursor-pointer box" onClick={(e) => toggle(e, 6)}></div>
                <div className="w-24 h-24 bg-gray-700 flex items-center justify-center text-2xl text-white cursor-pointer box" onClick={(e) => toggle(e, 7)}></div>
                <div className="w-24 h-24 bg-gray-700 flex items-center justify-center text-2xl text-white cursor-pointer box" onClick={(e) => toggle(e, 8)}></div>
            </div>
            <button className="mt-8 px-4 py-2 bg-teal-600 text-white text-lg rounded" onClick={resetGame}>Reset</button>
        </div>
    )
}
