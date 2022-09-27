import Deck from './deck.js'

const CARD_VALUE_MAP = {
    "2" : 2,
    "3" : 3,
    "4" : 4,
    "5" : 5,
    "6" : 6,
    "7" : 7,
    "8" : 8,
    "9" : 9,
    "10" : 10,
    "J" : 10,
    "Q" : 10,
    "K" : 10,
    "A" : 2,
}

let dealerHandValue = document.querySelector('.dealer-hand-value')
let playerHandValue = document.querySelector('.player-hand-value')
const dealerHand = document.querySelector('.dealer-hand')
const playerHand = document.querySelector('.player-hand')
const count = document.querySelector('.count')

document.getElementById("startBtn").addEventListener('click', () => {
    if (stop) {
        startGame()
        return
    }

    if(inRound) {
        newRound()
    } else {
        fullHand()
    }
})

document.getElementById("hitBtn").addEventListener('click', () => {
    const newPlayerCard = theDeck.pop()
    playerHand.appendChild(newPlayerCard.drawOne())
    playerCardsValue += CARD_VALUE_MAP[newPlayerCard.value]
    console.log(newPlayerCard)
    return playerHandValue
})

let inRound, theDeck, stop, playerCardsValue, playerCards

startGame()
function startGame() {
    theDeck = new Deck()
    theDeck.shuffle()
    inRound = false
    stop = false

    newRound()
}

// function getHandvalue() {
//     playerHand.forEach(card => console.log(getElementByClassName(card)))
    
//     // for (let cards = 0; cards < playerHand.length; cards++){
//     //     playerHandValue += CARD_VALUE_MAP[playerCards.value]
// //playerHand.Length is undefined, need to find new way to loop through the cards in hand

//     }


function newRound(){
    inRound = false
    dealerHand.innerHTML = ''
    playerHand.innerHTML = ''
    count.innerText = ''

}

fullHand()
function fullHand() {
    inRound = true
    const firstPlayerCard = theDeck.pop()
    const firstDealerCard = theDeck.pop()
    const secondPlayerCard = theDeck.pop()
    const secondDealerCard = theDeck.pop()
    playerCards = [firstPlayerCard, secondPlayerCard]
    let dealerCards = [firstDealerCard, secondDealerCard]
    playerCardsValue = CARD_VALUE_MAP[playerCards[0].value] + CARD_VALUE_MAP[playerCards[1].value]
    const dealerCardsValue = CARD_VALUE_MAP[dealerCards[0].value] + CARD_VALUE_MAP[dealerCards[1].value]
    playerHandValue.innerText = playerCardsValue
    dealerHandValue.innerText = dealerCardsValue

    playerHand.appendChild(firstPlayerCard.drawOne())
    playerHand.appendChild(secondPlayerCard.drawOne())
    dealerHand.appendChild(firstDealerCard.drawOne())
    dealerHand.appendChild(secondDealerCard.drawOne())
   
    console.log(playerHand)

    updateDeck()

    if (isRoundWinner(playerCardsValue, dealerCardsValue)) {
        alert("Win")
    } else if (isRoundWinner(dealerCardsValue, playerCardsValue)){
        alert("Lose")
    } else {
        alert("Draw")
    }

    if (isGameOver(theDeck)) {
        alert("Game Over")
        stop = true
    }

}


function updateDeck() {
    theDeck.innerHTML = theDeck.numberOfCards
}

function isRoundWinner(playerCardsValue, dealerCardsValue) {
    return playerCardsValue > dealerCardsValue
}

function isGameOver(deck) {
    return deck.numberOfCards === 0
}
