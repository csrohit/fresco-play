function runList(){
    var x = document.getElementById("list");
    var option = document.createElement("option");
    option.text = document.getElementById('txtbox').value;
    x.add(option);
}


