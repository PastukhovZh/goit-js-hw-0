import Notiflix, { Notify } from 'notiflix';


const form = document.querySelector('.form');
let delayValue;
let stepValue;
let amountValue;






function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  if (shouldResolve) {
    // Fulfill
  } else {
    // Reject
  }
}