/*
element.addEventListener("eventName", function() {

*/

let red = 0, green = 0, blue = 0;

document.addEventListener("click", changeColor);    


function changeColor() {
    red = Math.random() * 255;
    green = Math.random() * 255;
    blue = Math.random() * 255;
    const rgb = "rgb(" + red + "," + green + "," + blue + ")";
    document.body.style.backgroundColor = rgb;
}
