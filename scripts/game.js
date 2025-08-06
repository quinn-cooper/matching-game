// const mainMenu = document.getElementById('main-menu');
// const instructions = document.getElementById('instructions');
// const gameboard = document.getElementById('gameboard');
// const gameOver = document.getElementById('game-over');
// const winGame = document.getElementById('win-game');
// const cardDesign = document.querySelectorAll('.card-design')
// const cardImage = document.querySelectorAll('.card-image')

// // Button variables
// const newGameBtn = document.querySelectorAll('.new-game');
// const infoBtn = document.getElementById('info-btn');
// const exitGame = document.getElementById('exit-game');

// When game loads
// instructions.style.display = 'none';
// gameboard.style.display = 'none';
// gameOver.style.display = 'none';
// winGame.style.display = 'none';

// Audio toggle


// Instructions
// infoBtn.addEventListener('click', function () {
//     mainMenu.style.display = 'none';
//     instructions.style.display = 'block';
// })

// -------- Start a new game
// newGameBtn.forEach(function (startBtn) {
//     startBtn.addEventListener('click', function () {
//         mainMenu.style.display = 'none';
//         instructions.style.display = 'none';
//         gameboard.style.display = 'block';
//         cardImage.forEach(image => {
//             image.style.display = 'none';

//         });

//     })
// })

// Exit game
// exitGame.addEventListener('click', function () {
//     instructions.style.display = 'none';
//     gameboard.style.display = 'none';
//     mainMenu.style.display = 'block';
// })

class Game {
    constructor(cards) {
        // DOM elements
        this.mainMenu = document.getElementById('main-menu');
        this.instructions = document.getElementById('instructions');
        this.gameboard = document.getElementById('gameboard');
        this.gameOver = document.getElementById('game-over');
        this.winGame = document.getElementById('win-game');
        this.cardDesign = document.querySelectorAll('.card-design');
        this.cardImage = document.querySelectorAll('.card-image');

        // Counters
        this.matchCounter = document.getElementById('match-counter');
        this.mismatchCounter = document.getElementById('mismatch-counter');

        // Buttons
        this.newGameBtn = document.querySelectorAll('.new-game');
        this.infoBtn = document.getElementById('info-btn');
        this.exitGame = document.getElementById('exit-game');

        // Setup
        this.cards = cards;
        this.flippedCard = [];
        this.preventOpen = false;
        this.isProcessing = false;
        this.canClick = true;
        this.turns = 0;
        this.cardsPerTurn = 0;
        this.matches = 0;
        this.mismatches = 0;
        this.maxMatches = 9;
        this.maxMismatches = 5;

        // When game first loads
        this.gameLoad();

        // Set up buttons
        this.initBtns();
    }

    gameLoad() {
        this.instructions.style.display = 'none';
        this.gameboard.style.display = 'none';
        this.gameOver.style.display = 'none';
        this.winGame.style.display = 'none';
        this.mainMenu.style.display = 'block';
    }

    initBtns() {
        // Instructions button
        this.infoBtn.addEventListener('click', () => {
            this.mainMenu.style.display = 'none';
            this.gameboard.style.display = 'none';
            this.gameOver.style.display = 'none';
            this.winGame.style.display = 'none';
            this.instructions.style.display = 'block';
        })

        // New game button
        this.newGameBtn.forEach(btn => {
            btn.addEventListener('click', () => this.newGame());
        });

        // Exit button
        this.exitGame.addEventListener('click', () => {
            this.gameboard.style.display = 'none';
            this.gameOver.style.display = 'none';
            this.winGame.style.display = 'none';
            this.instructions.style.display = 'none';
            this.mainMenu.style.display = 'block';
        })
    }

    newGame() {
        this.mainMenu.style.display = 'none';
        this.instructions.style.display = 'none';
        this.gameOver.style.display = 'none';
        this.winGame.style.display = 'none';
        this.gameboard.style.display = 'block';

        // Reset the following
        this.flippedCard = [];
        this.isProcessing = false;
        this.turns = 0;
        this.matches = 0;
        this.mismatches = 0;

        this.cards = this.shuffle(this.cards);

        this.setupCards();
    }

    shuffle(cards) {
        for (let i = cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [cards[i], cards[j]] = [cards[j], cards[i]];
            console.log(cards)
        }
        return cards;
    }
    // Card shuffle source - https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array

    setupCards() {
        const htmlCards = this.gameboard.querySelectorAll('.card');
        htmlCards.forEach((cardEl, i) => {
            const card = this.cards[i];

            card.el = cardEl;

            cardEl.dataset.id = card.matchId;
            cardEl.classList.remove('flipped', 'matched');
            const frontImg = cardEl.querySelector('.card-image img');
            frontImg.src = card.path;
            frontImg.alt = card.name;

            cardEl.onclick = () => this.clickCard(card)

            // cardEl.addEventListener('click', () => {
            //     this.clickCard(card);
            //     // card.el.classList.toggle('flipped');
            //     // card.isFlipped = !card.isFlipped;
            // })
        })

        const shuffledCards = this.cards;
    }

    clickCard(card) {
        // Block further clicking temporarily
        if (this.isProcessing === true) {
            return;
        }

        if (this.flippedCard.includes(card) || card.el.classList.contains('flipped')) {
            return;
        }

        // Enable card flipping and keep track of flipped cards
        card.el.classList.toggle('flipped');
        this.flippedCard.push(card);

        if (this.flippedCard.length === 2) {
            this.isProcessing = true;

            setTimeout(() => {
                const card1 = this.flippedCard[0];
                const card2 = this.flippedCard[1];

                // Check for a match; if there's a match, cards remain; if no match, then flip them back over - source: https://stackoverflow.com/questions/56283681/js-memory-card-game-how-to-prevent-user-flipping-more-then-2-cards-at-the-same

                if (card1.matchId === card2.matchId) {
                    card1.el.classList.add('matched');
                    card2.el.classList.add('matched');
                    this.matches++;
                    
                } else {
                    card1.el.classList.remove('flipped');
                    card2.el.classList.remove('flipped');
                    this.mismatches++;
                }

                this.statsCounter();

                // Reset processing state after a match/mismatch is checked for
                this.isProcessing = false;
                this.flippedCard = [];
            }, 2000)
        }
    }

    statsCounter() {
        this.matchCounter.innerHTML = this.matches;
        this.mismatchCounter.innerHTML = this.mismatches;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const game = new Game(cards);
})

// Card flip resource - Youtube video: https://youtu.be/c_SMmEea8pw?si=MIW4-YePl5E2SAgR