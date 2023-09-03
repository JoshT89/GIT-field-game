const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
  constructor(field) {
    this.field = field;
    this.height = field.length;
    this.width = field[0].length;
    this.row = 0;
    this.col = 0;
    this.isGameOver = false;
  }

  print() {
    for (let row of this.field) {
      console.log(row.join(''));
    }
  }

  static generateField(height, width, percentage) {
    const field = [];

    for (let i = 0; i < height; i++) {
      const row = [];
      for (let j = 0; j < width; j++) {
        const random = Math.random();
        if (random < percentage) {
          row.push('O');
        } else {
          row.push('░');
        }
      }
      field.push(row);
    }

    // Place the hat (^) and the player (*)
    const hatRow = Math.floor(Math.random() * height);
    const hatCol = Math.floor(Math.random() * width);
    field[hatRow][hatCol] = '^';

    return field;
  }
}

const myField = new Field([
  ['*', '░', 'O'],
  ['░', 'O', '░'],
  ['░', '^', '░'],
]);

myField.print();

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function playGame(field) {
  field.print();

  rl.question('Which direction would you like to move? (U/D/L/R)', (direction) => {
    const row = field.row;
    const col = field.col;

    switch (direction.toUpperCase()) {
      case 'U':
        field.row--;
        break;
      case 'D':
        field.row++;
        break;
      case 'L':
        field.col--;
        break;
      case 'R':
        field.col++;
        break;
      default:
        console.log('Invalid direction!');
        playGame(field);
        return;
    }

    if (field.row < 0 || field.row >= field.height || field.col < 0 || field.col >= field.width) {
      console.log('You fell off the field! Game over.');
      field.isGameOver = true;
    } else if (field.field[field.row][field.col] === 'O') {
      console.log('You fell into a hole! Game over.');
      field.isGameOver = true;
    } else if (field.field[field.row][field.col] === '^') {
      console.log('Congratulations! You found your hat!');
      field.isGameOver = true;
    } else {
      field.field[row][col] = '*';
      playGame(field);
    }

    if (field.isGameOver) {
      rl.close();
    }
  });
}

// Generate a random field with dimensions 10x10 and 20% holes
const height = 10;
const width = 10;
const percentage = 0.2;
const randomField = Field.generateField(height, width, percentage);
const field = new Field(randomField);

playGame(field);
