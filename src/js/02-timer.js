import Notiflix, { Notify } from 'notiflix';
import flatpickr from 'flatpickr';
import '../css/common.css';
import "flatpickr/dist/flatpickr.min.css";



const startBtn = document.querySelector('[data-start]');
const daysValue = document.querySelector('[data-days]');
const hoursValue = document.querySelector('[data-hours]');
const minutesValue = document.querySelector('[data-minutes]');
const secondsValue = document.querySelector('[data-seconds]');

let timerId = null;

  startBtn.disabled = true;


function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

const addLeadingZero = value => String(value).padStart(2, 0);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      Notify.failure('Please choose a date in the future');
      startBtn.disabled = true;

      clearInterval(timerId);
      return;
    }
      startBtn.disabled = false;


    const showTimer = () => {
      const now = new Date();
      localStorage.setItem('selectedData', selectedDates[0]);
      const selectedData = new Date(localStorage.getItem('selectedData'));

      if (!selectedData) return;

      const diff = selectedData - now;
      const { days, hours, minutes, seconds } = convertMs(diff);
      daysValue.textContent = addLeadingZero(days);
      hoursValue.textContent = addLeadingZero(hours);
      minutesValue.textContent = addLeadingZero(minutes);
      secondsValue.textContent = addLeadingZero(seconds);

      if (
        daysValue.textContent === '0' &&
        hoursValue.textContent === '00' &&
        minutesValue.textContent === '00' &&
        secondsValue.textContent === '00'
      ) {
        clearInterval(timerId);
      }
    };

    const onClick = () => {
      if (timerId) {
        clearInterval(timerId);
      }
      showTimer();
      timerId = setInterval(showTimer, 1000);
    };

    startBtn.addEventListener('click', onClick);
  },
};

flatpickr('#datetime-picker', { ...options });