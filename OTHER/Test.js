"use strict";

const readline = require('readline');

// Настройка управления
readline.emitKeypressEvents(process.stdin);
if (process.stdin.isTTY) process.stdin.setRawMode(true);

const width = 30;  // Ширина трассы
const height = 50; // Длина (высота) трассы
let carPos = 4;    // Позиция игрока (колонка)
let obstacles = [];
let score = 0;
let speed = 200;

// Управление влево/вправо
process.stdin.on('keypress', (str, key) => {
  if (key.ctrl && key.name === 'c') process.exit();
  if (key.name === 'left' && carPos > 1) carPos--;
  if (key.name === 'right' && carPos < width - 2) carPos++;
});

function update() {
  // Двигаем препятствия вниз
  obstacles = obstacles.map(obs => ({ x: obs.x, y: obs.y + 1 }))
                       .filter(obs => obs.y < height);

  // Каждые несколько тактов добавляем новое препятствие
  if (Math.random() > 0.8) {
    obstacles.push({ x: Math.floor(Math.random() * (width - 2)) + 1, y: 0 });
  }

  // Проверка столкновения
  if (obstacles.some(obs => obs.y === height - 1 && obs.x === carPos)) {
    console.clear();
    console.log("!!! БА-БАХ !!! ВРЕЗАЛСЯ!");
    console.log(`Твой счет: ${score}`);
    process.exit();
  }

  score++;
  draw();
}

function draw() {
  console.clear();
  console.log(`Гонка! Очки: ${score}  (Стрелки: Влево/Вправо)`);

  for (let y = 0; y < height; y++) {
    let line = '|'; // Левый бортик
    for (let x = 1; x < width - 1; x++) {
      const isObstacle = obstacles.some(obs => obs.x === x && obs.y === y);
      const isPlayer = (y === height - 1 && x === carPos);

      if (isPlayer) line += '[#]';   // Машинка игрока
      else if (isObstacle) line += '(X)'; // Препятствие
      else line += '   ';            // Пустая дорога
    }
    line += '|'; // Правый бортик
    console.log(line);
  }
}

// Запуск игрового цикла
setInterval(update, speed);
