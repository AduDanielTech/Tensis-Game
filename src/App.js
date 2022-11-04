import React from "react"
import Die from "./Die"
import {nanoid} from "nanoid"
import './App.css'
import Confetti from 'react-confetti'

export default function App() {

    const [dice, setDice] = React.useState(allNewDice())
    const [tenzies, settenzies] = React.useState(false)
    const [count, setCount] = React.useState(0)
    const [restarts, setrestarts] = React.useState(0)
    const [game, setGame] = React.useState(false)
    
    function generateNewDie() {
      return {
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid()
    }
    }
    function allNewDice() {
        const newDice = []
        for (let i = 0; i < 10; i++) {
            newDice.push( generateNewDie())
        }
        return newDice
    }
    
    function rollDice() {
     if(!tenzies){
        setGame(true)
        setCount(pre => pre + 1)
        setDice(oldDice => oldDice.map(die => {
            return die.isHeld ? 
               die:
               generateNewDie()
        }))
     }else{
        setCount(0)
        settenzies(false)
        setDice(allNewDice())
        setGame(false)
     }
      
    }
    if (restarts > 5) {
        setCount(0)
        settenzies(false)
        setDice(allNewDice())
        setGame(false)
        setrestarts(0)
    }
   function restart() {
     setCount(0)
     setDice(allNewDice())
     setGame(false)
     setrestarts(pre => pre + 1)
   }
    function holdDice(id) {
        setDice(oldDice => oldDice.map(die => {
            return die.id === id ? 
                {...die, isHeld: !die.isHeld}:
                die
        }))
    }
    
    const diceElements = dice.map(die => (
        <Die 
            key={die.id} 
            value={die.value} 
            isHeld={die.isHeld} 
            holdDice={() => holdDice(die.id)}
        />
    ))
  
    
    
    React.useEffect(()=> {
      settenzies(pre => dice.every(die => die.isHeld) && !pre)
    },[dice])
    return (
        <main>
 {tenzies &&  <Confetti
    />}
<h1 className="title">Tenzies</h1>
            
            <img
            className="example"
            src="./Example.jpg"
            alt="example"
            />
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls as done above</p>
            <div className="die-container">
                {diceElements}
            </div><p>TRIES:{count}</p>
           {tenzies ?  <p>YOU'VE WON</p>: ''}
            <button className="roll-dice" onClick={ rollDice}>{tenzies ?'RESTART' : 'ROLL'}</button>
            <br/>
         {game ? 
         tenzies ? '' : <button className="roll-dice"  onClick={restart} >RESTART</button> : ''}
        
         
          <p>Restarts: {restarts}</p>
        </main>
    )
}