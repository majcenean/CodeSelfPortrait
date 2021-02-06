// Code Self-Portrait
// Maj Jenkins
// February 11, 2021

// Global variables
var debugMode = true;


// Window resize
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

// Create canvas
function setup() {
  createCanvas(windowWidth, windowHeight);
 }

// Draw function
function draw() {
  background('#B7CCD5');

// Toggle debug Mode
  if( debugMode == true ) {
  	drawDebugInfo();
  }

  

}


// Custom functions
// Debug mode
function drawDebugInfo() {
	fill(255);
  	text("X: " + mouseX + "   Y: " + mouseY, 20, height - 20);
}

// keyTyped for debugMode and fullscreen
function keyTyped() {
  if (key === 'd') {
    debugMode = !debugMode;
  }
  if (key === 'f') {
    let fs = fullscreen();
    fullscreen(!fs);
  }
 }