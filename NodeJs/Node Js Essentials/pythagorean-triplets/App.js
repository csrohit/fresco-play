function findProd() {
  for (let i = 1; i <= 1000; i++) {
    for (let j = 1; j <= 1000; j++) {
      const k = 1000 - i - j;
      if (i * i + j * j == k * k) {
        return i * j * k;
      }
    }
  }
}

console.log(findProd())