function* generationFunc() {
  for (let i = 0; i < 5; i++) {
    yield i;
  }
}

const iter = generationFunc();
console.log(iter.next());
