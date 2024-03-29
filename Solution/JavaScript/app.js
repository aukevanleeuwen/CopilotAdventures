const {ImageGenerator} = require('./image-generator'); // assuming image-generator.js is in the same directory


const DanceMove = Object.freeze({
    TWIRL: 'Twirl', LEAP: 'Leap', SPIN: 'Spin'
});

class Creature {
    constructor(name) {
        this.name = name;
        this.danceMoves = [DanceMove.TWIRL, DanceMove.LEAP, DanceMove.SPIN];
    }

    getRandomMove() {
        const randomIndex = Math.floor(Math.random() * this.danceMoves.length);
        return this.danceMoves[randomIndex];
    }
}

class Lox extends Creature {
    constructor() {
        super('Lox');
    }
}

class Drako extends Creature {
    constructor() {
        super('Drako');
    }
}

class Forest {
    constructor(creatures) {
        this.state = 'balanced';
        this.creatures = creatures;
    }

    updateState(loxMove, drakoMove) {
        let effect = 'None';
        if (loxMove === DanceMove.TWIRL && drakoMove === DanceMove.TWIRL) {
            effect = 'Fireflies';
        } else if (loxMove === DanceMove.LEAP && drakoMove === DanceMove.SPIN) {
            effect = 'Rain';
        } else if (loxMove === DanceMove.SPIN && drakoMove === DanceMove.LEAP) {
            effect = 'Rainbow';
        }

        switch (effect) {
            case 'Fireflies':
                this.state = 'illuminated';
                break;
            case 'Rain':
                this.state = 'refreshed';
                break;
            case 'Rainbow':
                this.state = 'colorful';
                break;
            default:
                this.state = 'balanced';
        }
    }

    performDance() {
        let result = '';
        for (let i = 0; i < 5; i++) {
            const loxMove = this.creatures[0].getRandomMove();
            const drakoMove = this.creatures[1].getRandomMove();
            this.updateState(loxMove, drakoMove);
            result += `Sequence ${i + 1}: Lox performs ${loxMove}, Drako performs ${drakoMove}, resulting in the forest being ${this.state}. `;
        }
        return result;
    }
}

const lox = new Lox();
const drako = new Drako();
const forest = new Forest([lox, drako]);
const prompt = forest.performDance();

const imageGenerator = new ImageGenerator('https://sbp-gctfs-offsite24-oai.openai.azure.com/openai/deployments/dalle3/images/generations?api-version=2023-12-01-preview', process.env.DALLE_API_KEY);
imageGenerator.generateImage(prompt).then((url) => {
    console.log(url);
}).catch((error) => {
    console.error(error);
});
