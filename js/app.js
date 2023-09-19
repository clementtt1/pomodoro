//Clément Schneider TD 2

const timeSpan = document.getElementById("time")
const startButton = document.getElementById("start")
const workDisplay = document.getElementById("work")
const breakDisplay = document.getElementById("break")
const worktimeInput = document.getElementById("work_time")
const breaktimeInput = document.getElementById("break_time")
const worktimeSelect = document.getElementById("select_work")
const breaktimeSelect = document.getElementById("select_break")

let ID = 0
let state = "Work"

//Default values of the timer in case of there is nothing in the local storage.
let work_countdown = 1500
let break_countdown = 300

//Checking if there is something in the local storage and replaces the default value.
if(localStorage.getItem("Work time") !== null){
    work_countdown = parseInt(localStorage.getItem("Work time"))
}
if(localStorage.getItem("Break time") != null){
    break_countdown = parseInt(localStorage.getItem("Break time"))
}

//Start event which activates the "isRunning" function
startButton.addEventListener("click", e => isRunning())

//Manages the break and work time personalization event
worktimeInput.addEventListener("change", e => {
    reset()
    localStorage.setItem("Work time", work_countdown)
    worktimeSelect.textContent = translationSecondsIntoMinutes(work_countdown)
    display(work_countdown)
})
breaktimeInput.addEventListener("change", e => {
    reset()
    localStorage.setItem("Break time", break_countdown)
    breaktimeSelect.textContent = translationSecondsIntoMinutes(break_countdown)
})

//Function called when the user press the start button.
function isRunning(){
    display(work_countdown)

    if (startButton.textContent == "Start") {
        startButton.textContent = "Reset"
            ID = setInterval(() => {

            //Check if the user is working.
            if(work_countdown > 0){
                work_countdown -= 1
                display(work_countdown)
                state = "Work"
                workDisplay.classList.add("selected")
                breakDisplay.classList.remove("selected")
            }
            
            //Check if the user is in his break time.
            else if(break_countdown > 0){
                break_countdown -= 1
                display(break_countdown)
                state = "Break"
                breakDisplay.classList.add("selected")
                workDisplay.classList.remove("selected")
            }
            
            //If the user is not working and in break time, reset the timer.
            else {
                work_countdown = worktimeInput.value*60
                display(work_countdown)
                break_countdown = breaktimeInput.value*60
                display(break_countdown)
                state = "Work"
                workDisplay.classList.add("selected")
                breakDisplay.classList.remove("selected")
            }
        }, 1000)
    }
    else{
        reset()
    }
}

//This function translate seconds into minutes.
function translationSecondsIntoMinutes(time) {
    let minutes = 0
    while(time >= 60){
        time -= 60
        minutes += 1
    }
    return minutes
}

//Function of display of the time in hours conventions : hh:mm.
function display(time) {
    let minutes = translationSecondsIntoMinutes(time)

    //Put a '0' in front of all number between 0 and 9.
    if(minutes < 10){
        if((time - minutes*60) < 10)
            timeSpan.textContent = "0" + minutes + ":0" + (time - minutes*60)
        else
            timeSpan.textContent = "0" + minutes + ":" + (time - minutes*60)
    }
    else{
        if((time - minutes*60) < 10)
            timeSpan.textContent = minutes + ":0" + (time - minutes*60)
        else
            timeSpan.textContent = minutes + ":" + (time - minutes*60)
    }
}

//Reset function.
function reset(){
    clearInterval(ID)
    startButton.textContent = "Start"
    work_countdown = worktimeInput.value*60
    break_countdown = breaktimeInput.value*60
    display(work_countdown)
}
