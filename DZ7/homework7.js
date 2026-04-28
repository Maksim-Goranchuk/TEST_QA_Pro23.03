var services = {
    "стрижка": "60 грн",
    "побрить": "80 грн",
    "помыть голову ": "100 грн",

    // Для получения масива чисел из рядов  (60 грн -> 60)
    getPrices() {
        return Object.values(this)
            .filter(value => typeof value === 'string' && value.includes('грн'))
            .map(value => parseInt(value));
    },

    // стоймость 
    price() {
        return this.getPrices().reduce((sum, current) => sum + current, 0) + " грн";
    },

    // Мин цена 
    minPrice() {
        return Math.min(...this.getPrices()) + " грн";
    },

    // макс цена 
    maxPrice() {
        return Math.max(...this.getPrices()) + " грн";
    }
};

// Добавим новую услугу 
services['Розбити скло'] = "200 грн";

// Результаты 
console.log("Загальна вартість:", services.price());
console.log("Мінімальна ціна:", services.minPrice());
console.log("Максимальна ціна:", services.maxPrice());
