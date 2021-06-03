function print(){
    console.log("TCS");
}
function stop(){
    clearInterval(t)
}

const t = setInterval(print, 2000);
setTimeout(stop, 10000);