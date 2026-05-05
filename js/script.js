let bwImg;
let maskLayer;
let brushSize = 60;
const SVG_W = 800; // Set these to your actual SVG dimensions
const SVG_H = 600;

function preload() {
    bwImg = loadImage('../img/bwbg.svg');
}

function setup() {
    // Use hardcoded SVG dimensions as fallback — SVGs report 0x0 in p5
    let svgW = bwImg.width > 0 ? bwImg.width : SVG_W;
    let svgH = bwImg.height > 0 ? bwImg.height : SVG_H;

    let canvasW = min(windowWidth * 0.9, svgW);
    let canvasH = (svgH / svgW) * canvasW;

    // WEBGL is not needed — but we need P2D with a transparent background
    let cnv = createCanvas(canvasW, canvasH);
    cnv.parent('canvas-container');

    // The mask layer holds the B&W image
    // We'll "punch holes" in it using erase()
    maskLayer = createGraphics(canvasW, canvasH);
    maskLayer.image(bwImg, 0, 0, canvasW, canvasH);

    let container = document.getElementById('canvas-container');
    container.style.width = canvasW + 'px';
    container.style.height = canvasH + 'px';
}

function draw() {
    // Keep the p5 canvas itself transparent so colorbg.svg shows through
    clear();

    // Only erase when mouse is pressed AND inside the canvas
    if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
        maskLayer.push();
        maskLayer.erase();
        maskLayer.noStroke();
        // Softer brush: draw a few circles at decreasing opacity
        for (let r = brushSize; r > 0; r -= brushSize / 5) {
            maskLayer.ellipse(mouseX, mouseY, r, r);
        }
        maskLayer.noErase();
        maskLayer.pop();
    }

    // Draw the B&W layer on top — holes in it reveal colorbg.svg below
    image(maskLayer, 0, 0);
}

function windowResized() {
    let svgW = bwImg.width > 0 ? bwImg.width : SVG_W;
    let svgH = bwImg.height > 0 ? bwImg.height : SVG_H;

    let canvasW = min(windowWidth * 0.9, svgW);
    let canvasH = (svgH / svgW) * canvasW;

    resizeCanvas(canvasW, canvasH);
    maskLayer = createGraphics(canvasW, canvasH);
    maskLayer.image(bwImg, 0, 0, canvasW, canvasH);

    let container = document.getElementById('canvas-container');
    container.style.width = canvasW + 'px';
    container.style.height = canvasH + 'px';
}