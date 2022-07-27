import '../css/common.css';

const startColorSwitchButton = document.querySelector('[data-start]');
const stopColorSwitchButton = document.querySelector('[data-stop]');
const body = document.querySelector('body')
let timerId = null;


startColorSwitchButton.addEventListener('click', startSwitchColor)
stopColorSwitchButton.addEventListener('click', stopSwitchColor)


function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
disabledButton();


function startSwitchColor() {
    timerId = setTimeout(startSwitchColor, 1000);
    startColorSwitchButton.disabled = true;
    stopColorSwitchButton.disabled = false;
    return body.style.backgroundColor = getRandomHexColor();

    

}

function stopSwitchColor() {
    clearTimeout(timerId)
    startColorSwitchButton.disabled = false;
    stopColorSwitchButton.disabled = true;
}