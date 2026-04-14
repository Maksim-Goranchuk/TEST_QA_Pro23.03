"use strict";

const width = 80;
const height = 40;
let A = 0, B = 0; // Углы поворота

function project(x, y, z) {
    // Проекция 3D точек на 2D экран
    const zScale = 1 / (z + 4); 
    const xp = Math.floor(width / 2 + x * 40 * zScale);
    const yp = Math.floor(height / 2 + y * 20 * zScale);
    return { xp, yp };
}

function draw() {
    let screen = Array(height).fill().map(() => Array(width).fill(' '));
    
    // Генерируем точки куба
    for (let x = -1; x <= 1; x += 0.2) {
        for (let y = -1; y <= 1; y += 0.2) {
            for (let z = -1; z <= 1; z += 2) {
                // Вращаем по осям X, Y, Z
                let nx = x, ny = y, nz = z;
                
                // Вращение вокруг X
                let tempY = ny * Math.cos(A) - nz * Math.sin(A);
                nz = ny * Math.sin(A) + nz * Math.cos(A);
                ny = tempY;

                // Вращение вокруг Y
                let tempX = nx * Math.cos(B) + nz * Math.sin(B);
                nz = -nx * Math.sin(B) + nz * Math.cos(B);
                nx = tempX;

                const { xp, yp } = project(nx, ny, nz);
                if (xp >= 0 && xp < width && yp >= 0 && yp < height) {
                    screen[yp][xp] = '#'; // Символ грани
                }
            }
        }
    }

    // Отрисовка в консоль
    console.clear();
    console.log(screen.map(row => row.join('')).join('\n'));
    console.log("\n  Вращение 3D куба в Node.js... (Ctrl+C для выхода)");
    
    A += 0.05;
    B += 0.03;
}

setInterval(draw, 50);
