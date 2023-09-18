let work_countdown = 1500
let break_countdown = 300

if(localStorage.getItem("Work time") !== null){
    work_countdown = parseInt(localStorage.getItem("Work time"))
}
console.log(work_countdown)

if(localStorage.getItem("Break time") != null){
    break_countdown = parseInt(localStorage.getItem("Break time"))
}

let ID = 0
let state = "Work"

const timeSpan = document.getElementById("time")
const startButton = document.getElementById("start")
const workDisplay = document.getElementById("work")
const breakDisplay = document.getElementById("break")
const worktimeInput = document.getElementById("work_time")
const breaktimeInput = document.getElementById("break_time")
const worktimeSelect = document.getElementById("select_work")
const breaktimeSelect = document.getElementById("select_break")
const numberInputs = document.querySelectorAll("input[type='number']")

for (const input of numberInputs) {
    input.addEventListener("keydown", e => {
        if (e.key != "Backspace" && isNaN(parseInt(e.key)))
            e.preventDefault()
    })
}

worktimeInput.addEventListener("change", e => {
    reset()
    localStorage.setItem("Work time", work_countdown)
    worktimeSelect.textContent = translationSecondsIntoMinuts(work_countdown)
    display(work_countdown)
})

breaktimeInput.addEventListener("change", e => {
    reset()
    localStorage.setItem("Break time", break_countdown)
    breaktimeSelect.textContent = translationSecondsIntoMinuts(break_countdown)
})

startButton.addEventListener("click", e => isRunning())

function isRunning(){
    work_countdown -= 1
    console.log(work_countdown)
    display(work_countdown)
    if (startButton.textContent == "Start") {
        startButton.textContent = "Reset"
            ID = setInterval(() => {

            //countdown of work time or for break time
            if(work_countdown > 0){
                work_countdown -= 1
                display(work_countdown)
                state = "Work"
                workDisplay.classList.add("selected")
                breakDisplay.classList.remove("selected")
            }
                
            else if(break_countdown > 0){
                break_countdown -= 1
                display(break_countdown)
                state = "Break"
                breakDisplay.classList.add("selected")
                workDisplay.classList.remove("selected")
            }
                
            else {
                work_countdown = worktimeInput.value*60
                display(work_countdown)
                break_countdown = breaktimeInput.value*60
                display(break_countdown)
                state = "Work"
                workDisplay.classList.add("selected")
                breakDisplay.classList.remove("selected")
            }

            // console.log(work_countdown, break_countdown, state)
        }, 100)
    }
    else{
        reset()
    }
}

function translationSecondsIntoMinuts(time) {
    let minuts = 0
    while(time >= 60){
        time -= 60
        minuts += 1
    }
    return minuts
}

function display(time) {
    let minuts = translationSecondsIntoMinuts(time)
    if(minuts < 10){
        if((time - minuts*60) < 10)
            timeSpan.textContent = "0" + minuts + ":0" + (time - minuts*60)
        else
            timeSpan.textContent = "0" + minuts + ":" + (time - minuts*60)
    }
    else{
        if((time - minuts*60) < 10)
            timeSpan.textContent = minuts + ":0" + (time - minuts*60)
        else
            timeSpan.textContent = minuts + ":" + (time - minuts*60)
    }
}

function reset(){
    clearInterval(ID)
    startButton.textContent = "Start"
    work_countdown = worktimeInput.value*60
    break_countdown = breaktimeInput.value*60
    display(work_countdown)
}
