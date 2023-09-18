let work_countdown = document.getElementById("work_time")
let break_countdown = 300
let ID = 0

const timeSpan = document.getElementById("time")
const startButton = document.getElementById("start")
const workDisplay = document.getElementById("work")
const breakDisplay = document.getElementById("break")

start.addEventListener("click", e => isRunning())

function isRunning(){
    work_countdown -= 1
    display(work_countdown)
    if (startButton.textContent == "Start") {
        startButton.textContent = "Reset"
            ID = setInterval(() => {

            //countdown of work time or for break time
            if(work_countdown >= 0){
                work_countdown -= 1
                display(work_countdown)

            }
                
            else if(break_countdown >= 0){
                break_countdown -= 1
                display(break_countdown)
            }
                
            else {
                work_countdown = 1500
                display(work_countdown)
                break_countdown = 300
                display(break_countdown)
            }

            console.log(work_countdown, break_countdown)
        }, 1000)
    }
    else{
        clearInterval(ID)
        startButton.textContent = "Start"
        work_countdown = 1500
        break_countdown = 300
        display(work_countdown)
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
    minuts < 10? timeSpan.textContent = "0" + minuts + ":" + ((time - minuts*60) < 10? "0" + (time - minuts*60): (time - minuts*60)): timeSpan.textContent = minuts + ":" + ((time - minuts*60) < 10? "0" + (time - minuts*60): (time - minuts*60))
}