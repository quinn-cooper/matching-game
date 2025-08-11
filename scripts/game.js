class Game {
    constructor(cards) {
        // DOM elements
        this.mainMenu = document.getElementById('main-menu');
        this.instructions = document.getElementById('instructions');
        this.gameboard = document.getElementById('gameboard');
        this.gameOver = document.getElementById('game-over');
        this.winGame = document.getElementById('win-game');

        // Buttons
        this.newGameBtn = document.querySelectorAll('.new-game');
        this.infoBtn = document.getElementById('info-btn');
        this.exitGame = document.getElementById('exit-game');

        // Counters
        this.matchCounter = document.getElementById('match-counter');
        this.mismatchCounter = document.getElementById('mismatch-counter');

        // Setup
        this.cards = cards;
        this.flippedCard = [];
        this.isProcessing = false;
        this.matches = 0;
        this.mismatches = 0;
        this.maxMatches = 9;
        this.maxMismatches = 13;

        // When game first loads
        this.gameLoad();

        // Set up buttons
        this.initBtns();

        // Audio
        this.audio = new Audio();
    }

    gameLoad() {
        this.instructions.style.display = 'none';
        this.gameboard.style.display = 'none';
        this.gameOver.style.display = 'none';
        this.winGame.style.display = 'none';
        this.mainMenu.style.display = 'block';
    }

    initBtns() {
        // Instructions
        this.infoBtn.addEventListener('click', () => {
            this.mainMenu.style.display = 'none';
            this.gameboard.style.display = 'none';
            this.gameOver.style.display = 'none';
            this.winGame.style.display = 'none';
            this.instructions.style.display = 'block';
            this.audio.playInfo();
        })

        // New game
        this.newGameBtn.forEach(btn => {
            btn.addEventListener('click', () => this.newGame());
        });

        // Exit game
        this.exitGame.addEventListener('click', () => {
            this.gameboard.style.display = 'none';
            this.gameOver.style.display = 'none';
            this.winGame.style.display = 'none';
            this.instructions.style.display = 'none';
            this.mainMenu.style.display = 'block';
        })
    }

    newGame() {
        // Display the gameboard
        this.mainMenu.style.display = 'none';
        this.instructions.style.display = 'none';
        this.gameOver.style.display = 'none';
        this.winGame.style.display = 'none';
        this.gameboard.style.display = 'block';

        // Reset the following
        this.flippedCard = [];
        this.isProcessing = false;
        this.matches = 0;
        this.mismatches = 0;
        this.statsCounter();

        this.shuffle(this.cards);
        console.log(this.shuffle(this.cards))

        this.setupCards();

        // Reset audio (stop win/lose audio) - source: https://stackoverflow.com/questions/14834520/html5-audio-stop-function
        this.audio.infoAudio.pause();
        this.audio.gameOverAudio.pause();
        this.audio.gameOverAudio.currentTime = 0;
        this.audio.winAudio.pause();
        this.audio.winAudio.currentTime = 0;
    }

    // Card shuffle - source: https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
    shuffle(cards) {
        for (let i = cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [cards[i], cards[j]] = [cards[j], cards[i]];
        }
        return cards;
    }

    setupCards() {
        // Get all the cards in the DOM, loop through cards and index
        const htmlCards = this.gameboard.querySelectorAll('.card');
        htmlCards.forEach((cardEl, i) => {
            const card = this.cards[i];
            card.el = cardEl;

            // data attribute to identify cards by their matchId
            cardEl.dataset.id = card.matchId;

            cardEl.classList.remove('flipped', 'matched');
            const img = cardEl.querySelector('.card-image img');
            img.src = card.path;
            img.alt = card.name;

            cardEl.onclick = () => this.clickCard(card);

            // Keyboard navigation - ENTER key flips card - source: https://www.w3schools.com/howto/howto_js_trigger_button_enter.asp
            cardEl.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    this.clickCard(card);
                }
            })
        })
    }

    clickCard(card) {
        // Block further clicking temporarily
        if (this.isProcessing === true) {
            return;
        }

        // Don't allow user to click on card that's already been flipped
        if (this.flippedCard.includes(card) || card.el.classList.contains('flipped')) {
            return;
        }

        // Enable card flipping (by toggling .flipped class), play a flip audio when a card if flipped, and keep track of flipped cards
        card.el.classList.add('flipped');
        this.audio.playFlip();
        this.flippedCard.push(card);

        // Card flip resource - Youtube video: https://youtu.be/c_SMmEea8pw?si=MIW4-YePl5E2SAgR

        // Prevent user from flipping more than 2 cards at once - source: https://stackoverflow.com/questions/56283681/js-memory-card-game-how-to-prevent-user-flipping-more-then-2-cards-at-the-same
        if (this.flippedCard.length === 2) {
            this.isProcessing = true;

            // If there's a match, add a matched class so the cards remain, and increase match counter. 
            // If there's no match, then add flipped class to flip them back over, and increase mismatch counter.
            setTimeout(() => {
                const card1 = this.flippedCard[0];
                const card2 = this.flippedCard[1];

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
            }, 1800)
        }
    }

    statsCounter() {
        this.matchCounter.innerHTML = this.matches;
        this.mismatchCounter.innerHTML = this.mismatches;

        // If user matches all cards, run surviveGame()
        if (this.matches === this.maxMatches) {
            this.surviveGame();
        }

        // If user reaches max mismatches, run loseGame()
        if (this.mismatches === this.maxMismatches) {
            this.loseGame();
        }
    }

    surviveGame() {
        // Display winGame and play playWin audio
        this.mainMenu.style.display = 'none';
        this.instructions.style.display = 'none';
        this.gameboard.style.display = 'none';
        this.gameOver.style.display = 'none';
        this.winGame.style.display = 'block';
        this.audio.playWin();
    }

    loseGame() {
        // Display gameOver and play playLose audio
        this.mainMenu.style.display = 'none';
        this.instructions.style.display = 'none';
        this.gameboard.style.display = 'none';
        this.winGame.style.display = 'none';
        this.gameOver.style.display = 'block';
        this.audio.playLose();
    }
}

class Audio {
    constructor() {
        // Audio files
        this.flipAudio = document.querySelector('#flip-card');
        this.infoAudio = document.querySelector('#info-audio');
        this.winAudio = document.querySelector('#game-win');
        this.gameOverAudio = document.querySelector('#game-over-screech')
        // Audio is muted by default
        this.mute = true;
    }

    // If audio isn't muted, play the audio
    playInfo() {
        if (!this.mute) {
            this.infoAudio.volume = 0.4;
            this.infoAudio.play();
        }
    }

    playFlip() {
        if (!this.mute) {
            this.flipAudio.play();
            this.flipAudio.volume = 0.3;
        }
    }

    playWin() {
        if (!this.mute) {
            this.winAudio.volume = 0.2;
            this.winAudio.play();
        }
    }

    playLose() {
        if (!this.mute) {
            this.gameOverAudio.volume = 0.3;
            this.gameOverAudio.play();
        }
    }
}

const game = new Game(cards)

// Toggle audio (muted by default)
const toggle = document.getElementById('toggle');
toggle.addEventListener('change', function () {
    // When the toggle is switched, the audio is enabled
    if (this.checked) {
        game.audio.mute = false;
    } else {
        game.audio.mute = true;
    }
})