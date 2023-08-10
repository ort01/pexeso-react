import { useEffect, useState } from 'react'
import Card from './interfaces/Card'
import './App.scss'
import SingleCard from './components/SingleCard'

const cardImages: Card[] = [
  { "src": "/img/helmet-1.png", matched: false },
  { "src": "/img/potion-1.png", matched: false },
  { "src": "/img/ring-1.png", matched: false },
  { "src": "/img/scroll-1.png", matched: false },
  { "src": "/img/shield-1.png", matched: false },
  { "src": "/img/sword-1.png", matched: false },
]



function App() {
  //states
  const [cards, setCards] = useState<Card[]>([])
  const [turns, setTurns] = useState<number>(0)

  const [choiceOne, setChoiceOne] = useState<Card | null>(null)
  const [choiceTwo, setChoiceTwo] = useState<Card | null>(null)



  //shuttle cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages] //12 cards
      .sort(() => Math.random() - 0.5) // function for each item or each pair of items in this array. If we return a number < 0, the order of those two items in the array stays the same. If we return a number 0 <, then the order of those two items is mixed up.
      .map((card) => ({ ...card, id: Math.random() * 100 }))

    setCards(shuffledCards)
    setTurns(0)
    setChoiceOne(null)
    setChoiceTwo(null)
  }

  //handle choice
  const handleChoice = (card: Card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  //compare 2 selected cards
  useEffect(() => {
    if (choiceOne && choiceTwo) {

      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) => { //current state of the cards array
          return prevCards.map((card: Card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true } // returning a new card object where we change the matched property
            } else {
              return card //returning the unchanged card object
            }
          })
        })
        setTimeout(() => resetTurn(), 1000)
      } else {


        setTimeout(() => resetTurn(), 1000)
      }
    }
  }, [choiceOne, choiceTwo])

  //reset choices and increase turn 
  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns((prevTurns) => prevTurns + 1)
  }

  // start a new game when the component loads
  useEffect(() => {
    shuffleCards()
  }, [])

  return (
    <div className='App'>
      <h1>Magin Match</h1>
      <button onClick={shuffleCards}>New game</button>

      <div className="card-grid">
        {cards.map((card) => (
          <SingleCard
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            isFlipped={card === choiceOne || card === choiceTwo || card.matched}
            selectedPair={choiceTwo}
          />
        ))}
      </div>
      <p>{turns}</p>
    </div>
  )
}

export default App
