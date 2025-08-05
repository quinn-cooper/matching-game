class Card {
    constructor (matchId, name, path) {
        this.matchId = matchId;
        this.name = name;
        this.path = path;
        this.isFlipped = false;
        this.isMatched = false;
        console.log(name)
    }
}

const cards = [];

cards.push(new Card (1, 'Dog-Man', 'images/dog-man.jpg'));
cards.push(new Card (1, 'Dog-Man', 'images/dog-man.jpg'));

cards.push(new Card (2, 'Dr. Kibner', 'images/dr-kibner.jpg'));
cards.push(new Card (2, 'Dr. Kibner', 'images/dr-kibner.jpg'));

cards.push(new Card (3, 'Elizabeth', 'images/elizabeth2.jpg'));
cards.push(new Card (3, 'Elizabeth', 'images/elizabeth2.jpg'));

cards.push(new Card (4, 'Elizabeth 2', 'images/elizabeth3.jpg'));
cards.push(new Card (4, 'Elizabeth 2', 'images/elizabeth3.jpg'));

cards.push(new Card (5, 'Jack', 'images/jack.jpg'));
cards.push(new Card (5, 'Jack', 'images/jack.jpg'));

cards.push(new Card (6, 'Jack 2', 'images/jack2.jpg'));
cards.push(new Card (6, 'Jack 2', 'images/jack2.jpg'));

cards.push(new Card (7, 'Matthew', 'images/matthew.jpg'));
cards.push(new Card (7, 'Matthew', 'images/matthew.jpg'));

cards.push(new Card (8, 'Matthew 2', 'images/matthew2.jpg'));
cards.push(new Card (8, 'Matthew 2', 'images/matthew2.jpg'));

cards.push(new Card (9, 'Nancy', 'images/nancy.jpg'));
cards.push(new Card (9, 'Nancy', 'images/nancy.jpg'));


// function shuffle(cards) {
//     var j, x, i;
//     for (i = cards.length - 1; i > 0; i--) {
//         j = Math.floor(Math.random() * (i + 1));
//         x = cards[i];
//         cards[i] = cards[j];
//         cards[j] = x;
//     }
//     return cards;
// }
