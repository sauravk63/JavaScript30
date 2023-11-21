
let countdown;
const timeDisplay = document.querySelector('.display__time-left')
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');

function timer(seconds){
    clearInterval(countdown);
    const now = Date.now();
    const then = now + seconds * 1000;
    displayTimeLeft(seconds);
    displayEndTime(then);

    countdown = setInterval(()=>{
        const secondsLeft = Math.round((then -Date.now())/1000);
        if(secondsLeft < 0){
            clearInterval(countdown)
            return;
        }else
            displayTimeLeft(secondsLeft)
    }, 1000)
}

function displayTimeLeft(seconds){
    const mins = Math.floor(seconds/60)
    const remSeconds = seconds % 60;
    const display = `${mins}:${remSeconds<10 ?'0' : ''}${remSeconds}`;
    timeDisplay.textContent = display;
    document.title = display;
}

function displayEndTime(timestamp){
    const end = new Date(timestamp);
    const hours = end.getHours();
    const mins = end.getMinutes();
    endTime.textContent = `Be back at ${hours>12 ? hours - 12 : hours}:${mins<10?'0':''}${mins}`
}

function setTimer(){
    const seconds = parseInt(this.dataset.time);
    console.log(seconds)
    timer(seconds);
}

buttons.forEach(button=>button.addEventListener('click',setTimer));

document.customForm.addEventListener('submit',function(e){
    e.preventDefault();
    const mins = this.minutes.value;
    console.log(mins);
    timer(mins * 60);
    this.reset();
})