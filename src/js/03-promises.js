import Notiflix, { Notify } from 'notiflix';


const form = document.querySelector('.form');

form.addEventListener('submit', onSubmit);




function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
    
  if (shouldResolve) {
    resolve({position, delay})
  } else {
    reject({position, delay})
  } 
    }, delay)
    
  })
  
}



function onSubmit(e) {
  e.preventDefault();


  
  const { elements: { delay, step, amount } } = e.currentTarget;
  let delayValue = Number(delay.value);
  let stepValue = Number(step.value);
  let amountValue = Number(amount.value);
if ((delayValue || stepValue || amountValue) <= 0) {
  e.currentTarget.reset();
  
  return Notify.warning('Не слоивли на минусовых значениях :p')
    }
    for (let i = 1; i <= amountValue; i++) {

    
createPromise(i, delayValue)
  .then(({ position, delay }) => {
    Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
    Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
  });    
    delayValue += stepValue

    
    }
    e.currentTarget.reset();
}
