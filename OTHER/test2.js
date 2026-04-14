"use strict";

const frames = [
  `

       |          I'm flying, Jack!
      / \\         
     [   ]        
    --| |---      
      / \\         
  ___________     
  \\         /     
~~~~~~~~~~~~~~~~~~`,
  `

       |          
      / \\         
     [   ]        
    --| |---      
      / \\         
  ___________     
  \\         /     
 ~~~~~~~~~~~~~~~~~`,
];

let frameIndex = 0;
let shipX = 0;

function animate() {
    console.clear();
    const clouds = " ".repeat(shipX % 20) + "☁️";
    console.log(clouds);
    
    // Рисуем сцену
    console.log("\n".repeat(3));
    const shipPadding = " ".repeat(10);
    
    // Нос корабля и фигурки (упрощенный ASCII)
    console.log(shipPadding + "      o   o  <- Джек и Роза");
    console.log(shipPadding + "     /\\__/\\ ");
    console.log(shipPadding + "    /  ||  \\");
    console.log(shipPadding + "   /___||___\\");
    console.log(shipPadding + "   \\        / ");
    console.log(shipPadding + "~~~~\\______/~~~~~~~~~~~~~~~~~~");
    
    // Эффект движения волн под кораблем
    const wave = (frameIndex % 2 === 0) ? "  ~ ~ ~ ~ ~ ~" : "~ ~ ~ ~ ~ ~ ";
    console.log(shipPadding + wave);
    
    console.log("\n\n [ Нажми Ctrl+C для выхода ]");
    
    frameIndex++;
    shipX++;
}

// Запуск анимации (каждые 400 мс)
setInterval(animate, 400);
