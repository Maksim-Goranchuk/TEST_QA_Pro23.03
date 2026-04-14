"use strict";

const frames = [
    // 1. Росток
    ["", "", "", "", "", "   ."],
    ["", "", "", "", "   .", "   |"],
    // 2. Бутон
    ["", "", "", "   o", "   |", "  /|\\"],
    ["", "", "   ( )", "    |", "   /|\\", "  / | \\"],
    // 3. Начало раскрытия
    ["", "", "  ( v )", "    |", "   /|\\", "  / | \\"],
    // 4. Цветок раскрыт
    ["", "   \\ | /", "  -- O --", "   / | \\", "    |", "   /|\\"],
    // 5. Полный расцвет
    ["    \\ | /", "   -- * --", "    / | \\", "      |", "     /|\\", "    / | \\"]
];

let currentFrame = 0;

function animate() {
    console.clear();
    console.log("🌸 Анимация роста цветка 🌸\n");
    
    // Рисуем текущий кадр
    const frame = frames[currentFrame];
    frame.forEach(line => console.log(line));

    // Цикличность: доходим до конца и начинаем заново
    currentFrame++;
    if (currentFrame >= frames.length) {
        currentFrame = 0;
        // Небольшая пауза перед новым циклом
        setTimeout(() => {}, 1000); 
    }
}

// Запуск анимации каждые 500 мс
setInterval(animate, 500);

console.log("Нажми Ctrl+C, чтобы остановить...");
