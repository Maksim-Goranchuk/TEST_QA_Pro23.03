function checkProbabilityTheory(count) {
    let evenCount = 0;
    let oddCount = 0;

    for (let i = 0; i < count; i++) {
        // Генерируем числа  от 100 до 1000 
        let randomNumber = Math.floor(Math.random() * (1000 - 100 + 1)) + 100;

        // Проверяем пары 
        if (randomNumber % 2 === 0) {
            evenCount++;
        } else {
            oddCount++;
        }
    }

    // вычесляем проценты
    let evenPercentage = (evenCount / count) * 100;
    let oddPercentage = (oddCount / count) * 100;

    // вывод результатов 
    console.log("Количество сгенерированых чисел : " + count);
    console.log("Парних чисел: " + evenCount);
    console.log("Не парних чисел: " + oddCount);
    console.log(" % парних: " + evenPercentage.toFixed(2) + "%");
    console.log(" % не парних: " + oddPercentage.toFixed(2) + "%");
}

// Запуск функции  
checkProbabilityTheory(1000);
