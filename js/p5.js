let x = 0;
let y = 0;
let size = 42;
let stroke_weight = 1;
let stroke_color = "50";
let fill_color = 0;



function setup() {
    createCanvas(windowWidth, windowHeight);
}
function draw() {
    fill_color = map(mouseX, 0, width, 0, 255);
    fill_color2 = map(mouseY, 0, height, 0, 255);

    background(220, 39, 94);
    stroke(stroke_color);
    strokeWeight(stroke_weight);
    fill(fill_color);
    ellipse(mouseX, mouseY, size, size);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
