let work_countdown = 1500
let break_countdown = 300

setInterval(() => {
    if(work_countdown > 0)
        work_countdown -= 1
    else if(break_countdown > 0)
        break_countdown -= 1
    else {
        work_countdown = 1500
        break_countdown = 300
    }
    console.log(work_countdown, break_countdown);
}, 1000);