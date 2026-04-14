function pow(x, y) {
    
    if (y === 0) return 1;
    
    let result = x;
    
   
    for (let i = 1; i < y; i++) {
        result = result * x;
    }
    
    return result;
}


console.log(pow(2, 3)); 
console.log(pow(5, 2)); 
