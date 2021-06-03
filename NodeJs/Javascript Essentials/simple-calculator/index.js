function update(value) {
    //Type the code here.
    document.getElementById('screen').value += value;
}

function result() {
    //Type the code here.
    document.getElementById('screen').value = eval(document.getElementById('screen').value);
}

function form_reset() {
    //Type the code here.
    document.getElementById('screen').value = '';
}
