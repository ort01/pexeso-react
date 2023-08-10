import "./sass/SingleCard.scss"
import Card from '../interfaces/Card'


export default function SingleCard(
    //props with types
    { card, handleChoice, isFlipped, selectedPair }:
        {
            card: Card,
            handleChoice: (card: Card) => void,
            isFlipped: boolean | undefined,
            selectedPair: Card | null,
        }) {


    //functions
    const handleClick = () => {
        handleChoice(card)

    }





    return (
        <div className='card'>
            <div className={isFlipped ? "isFlipped" : ''}>
                <img className='card--front' src={card.src} alt="card front" />
                <img
                    className='card--back'
                    src='/img/cover.png'
                    alt="card back"
                    onClick={selectedPair ? null : handleClick} />
            </div>
        </div>
    )
}
