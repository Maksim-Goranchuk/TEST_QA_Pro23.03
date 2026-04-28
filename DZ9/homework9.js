
var regex = /\b[^a\s]{6,}\b/i;

// Проверка 
console.log(regex.test("Wonderful")); // true
console.log(regex.test("Joyful"));    // true
console.log(regex.test("Time Task")); // false (пробел не даст сойденить в 6+)
console.log(regex.test("Apple"));    // false
