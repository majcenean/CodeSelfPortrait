/*************************************************************************
    Code Self-Portrait
          by Maj Jenkins
          February 11, 2021

    Overview:

 
    ---------------------------------------------------------------------
    Notes: 
    (1)
     
     ---------------------------------------------------------------------
    Code Citations:
    (1) Title: Using mask() on createGraphics() object
       Author: cdaein
       Date: April 2017
       Link: https://forum.processing.org/two/discussion/21981/p5-js-using-mask-on-creategraphics-object
       Purpose: Using the mask function on drawn objects in p5.js, as opposed to masking an image - basically, treating the drawn objects like an image using the createGraphics function.
       Code: 
          var img;
          var imgClone;
          var mk;

          function setup() {
              createCanvas(400, 400);

              img = createGraphics(200, 200);
              img.ellipse(100, 100, 100, 100);

              mk = createGraphics(200, 200);
              mk.rect(0, 0, 100, 100);

              ( imgClone = img.get() ).mask( mk.get() );
          }

          function draw() {
              background(200);
              image(imgClone, 0, 0);
          }
    ---------------------------------------------------------------------
      Font Citations:
      (1) Title: Louis George Café
          Author: Chen Yining
          Link: https://www.dafont.com/louis-george-caf.font
      (1) Title: Inconsolata
          Author: Raph Levien
          Link: https://fonts.google.com/specimen/Inconsolata?preview.text_type=custom&selection.family=Inconsolata#about

**************************************************************************/


/*************************************************************************
// Global variables
**************************************************************************/

// Debug Mode
var gDebugMode = false;

// Framerate
var fr = 30;

// Shapes
var b = 12;
var numColumnsBirds = 10;
var numRowsBirds = 8;
var wobbleNumb = 10;

// createGraphics
var faceBg;
var faceBgClone;
var mask;

var faceDetails;

// Font
var louisGeorgeCafe;
var inconsolata;

// Clouds
var cloudXPos = 5;
var speed = 5;


/*************************************************************************
// Window resize
**************************************************************************/

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

/*************************************************************************
// Function preload
**************************************************************************/
function preload() {
  louisGeorgeCafe = loadFont('Louis-George-Cafe-Bold.otf');
  inconsolata = loadFont('Inconsolata.otf');
  faceImg = loadImage('face_sketch.png');
}

/*************************************************************************
// Function setup
**************************************************************************/

function setup() {
  createCanvas(windowWidth, windowHeight);
  textFont(inconsolata);
  
  
  drawFace();
  ( faceBgClone = faceBg.get() ).mask( mask.get() );
  
  drawFaceDetails();
  
 }

/*************************************************************************
// Function draw
**************************************************************************/

function draw() {
  background('#C6BDAB');
  fill('#fff');
  noStroke();
  
//   Set the frame rate
  frameRate(fr);
  
//   Draw shapes
  // drawGrid();
  
  drawBackground();
  
  makeShapes();
  
//   Fullscreen Message
  fsMessage();
  
//   Debug Mode Toggle
  if( gDebugMode == true ) {
    drawDebugInfo();
  }
  
//   createGraphics Mask: Position
  image(faceBgClone, 2*(width/3), 1*(height/5));
  image(faceDetails, 2*(width/3), 1*(height/5));
  
  drawClouds();
  
  //   Sketch image get the vertices
  // image(faceImg, 0, 0);
  
//   Test the drawing before masking
  // drawFaceTest();
  
}


/*************************************************************************
// Custom functions
**************************************************************************/
// Funky line background and text
function drawBackground() {
//   Lines
  let grassColors = ['#b2aa9a', '#ccc4b3', '#d1cabc'];
  let grassWeight = ['7', '5', '3'];

  push();
//   Left Grass
    for (var i = 0; i < width/5; i += 40) {
      for( let j = 0 + 2; j < height; j += 20) {
        stroke(random(grassColors));
        strokeWeight(random(grassWeight));
        line(i, j, i + 70, j + 20);
      }
    }
//   Right Grass
   for (var l = 9*(width/10); l < width; l += 40) {
      for( let j = 0 + 2; j < height; j += 20) {
        stroke(random(grassColors));
        strokeWeight(random(grassWeight));
        line(l, j, l + 70, j + 20);
      }
    }
  pop();
  
//  Text
  push();
    fill('#4f4c44');
    textFont(louisGeorgeCafe);
    textSize(width/25);
    text('i am still weaving', width/7, 4*(height/5));
    textSize(width/20);
    text('i am still weaving', width/7.5, 4.4*(height/5));
    textSize(width/30);
    text('at the loom of life and i am not done', width/4, height - (height/15));
  pop();
}

// createGraphics, reminder that this function is called in setup function and not the draw function
function drawFace() {
  faceBg = createGraphics(1000, 1000);
  // faceBg = createGraphics(1000, 1000, WEBGL);
  mask = createGraphics(1000, 1000);

  // Blue Background Rectangle
    faceBg.noStroke();
    faceBg.rectMode(CENTER);
    faceBg.fill('#63A5D4');
    faceBg.rect(0, 0, 1000, 2000);
  
  
  // // Blue Background Sphere (Radial Gradient)
  //   faceBg.background('#63A5D4');
  //   faceBg.fill(165, 190, 210);
  //   faceBg.ambientLight(149, 201, 239);
  //   faceBg.noStroke();
  //   let dirX = (mouseX / width - 0.5) * 2;
  //   let dirY = (mouseY / height - 0.5) * 2;
  //   faceBg.directionalLight(99, 165, 212, -dirX, -dirY, -1);
  //   faceBg.sphere(800);
  
  
//   Face Shape Mask
  mask.beginShape();
  mask.vertex(100, 179);
  mask.vertex(74, 213);
  mask.vertex(70, 261);
  mask.vertex(66, 306);
  mask.vertex(76, 333);
  mask.vertex(83, 372);
  mask.vertex(100, 426);
  mask.vertex(118, 478);
  mask.vertex(143, 514);
  mask.vertex(166, 558);
  mask.vertex(194, 591);
  mask.vertex(208, 598);
  mask.vertex(235, 600);
  mask.vertex(258, 596);
  mask.vertex(254, 645);
  mask.vertex(277, 671);
  mask.vertex(301, 681);
  mask.vertex(346, 662);
  mask.vertex(382, 642);
  mask.vertex(430, 558);
  mask.vertex(416, 473);
  mask.vertex(408, 410);
  mask.vertex(410, 370);
  mask.vertex(443, 350);
  mask.vertex(460, 318);
  mask.vertex(446, 251);
  mask.vertex(399, 240);
  mask.vertex(383, 270);
  mask.vertex(306, 239);
  mask.vertex(220, 247);
  mask.vertex(122, 157);
  mask.endShape(CLOSE);
}

function drawFaceDetails() {
  
  faceDetails = createGraphics(1000, 1000);
  
//   Hair
  faceDetails.fill('#b2aa9a');
  faceDetails.noStroke();
  faceDetails.beginShape();
  faceDetails.vertex(87, 374);
    faceDetails.vertex(65, 377);
    faceDetails.vertex(3, 272);
    faceDetails.vertex(86, 74);
    faceDetails.vertex(247, 0);
    faceDetails.vertex(291, 4);
    faceDetails.vertex(337, 18);
    faceDetails.vertex(409, 68);
    faceDetails.vertex(444, 108);
    faceDetails.vertex(464, 163);
    faceDetails.vertex(471, 221);
    faceDetails.vertex(472, 286);
    faceDetails.vertex(460, 324);
    faceDetails.vertex(432, 268);
    faceDetails.vertex(420, 311);
    faceDetails.vertex(374, 317);
    faceDetails.vertex(337, 298);
    faceDetails.vertex(355, 330);
    faceDetails.vertex(387, 352);
    faceDetails.vertex(347, 346);
    faceDetails.vertex(311, 326);
    faceDetails.vertex(281, 306);
    faceDetails.vertex(314, 356);
    faceDetails.vertex(355, 390);
    faceDetails.vertex(321, 400);
    faceDetails.vertex(276, 376);
    faceDetails.vertex(258, 379);
    faceDetails.vertex(239, 359);
    faceDetails.vertex(223, 354);
    faceDetails.vertex(178, 309);
    faceDetails.vertex(134, 248);
    faceDetails.vertex(104, 177);
    faceDetails.vertex(90, 184);
    faceDetails.vertex(72, 224);
    faceDetails.vertex(69, 299);
    faceDetails.vertex(84, 37);
  faceDetails.endShape(CLOSE);
  
  
//   Lips
  faceDetails.fill('#243D4F');
    faceDetails.scale(1.5);
  faceDetails.translate(-370, -250);
  faceDetails.beginShape();
    faceDetails.vertex(474, 580);
    faceDetails.vertex(464, 575);
    faceDetails.vertex(455, 577);
    faceDetails.vertex(474, 606);
    faceDetails.vertex(502, 607);
    faceDetails.vertex(512, 600);
    faceDetails.vertex(532, 586);
    faceDetails.vertex(510, 584);
    faceDetails.vertex(500, 582);
    faceDetails.vertex(492, 574);
    faceDetails.vertex(482, 576);
    faceDetails.vertex(474, 580);
    faceDetails.vertex(467, 574);
    faceDetails.vertex(458, 575);
  faceDetails.endShape(CLOSE);
  
    
  //   Eyebrows
  faceDetails.fill('#243D4F');
   faceDetails.scale(0.85);
  faceDetails.translate(90, 110);
  faceDetails.quad(478, 427, 498, 436, 510, 425, 500, 419);
  faceDetails.quad(420, 441, 423, 426, 404, 422, 404, 434);
  
  
  
//   Chin
  faceDetails.scale(1);
  faceDetails.translate(0, 15);
  faceDetails.stroke('#243D4F');
  faceDetails.strokeWeight(5);
  faceDetails.line(542, 638, 598, 602);
  faceDetails.line(640, 560, 649, 548);
  faceDetails.line(658, 535, 664, 506);
  
//   Nose
  faceDetails.strokeWeight(7);
  faceDetails.translate(-10, -20);
  faceDetails.line(456, 474, 444, 521);
  faceDetails.line(444, 521, 446, 538);
  faceDetails.line(446, 538, 461, 549);
  
  faceDetails.line(488, 546, 506, 546);
  faceDetails.line(506, 546, 507, 535);
  faceDetails.line(507, 535, 506, 524);
  faceDetails.line(506, 524, 496, 517);
  
//   Eye Right
  faceDetails.scale(0.8);
  faceDetails.translate(135, 120);
    faceDetails.beginShape();
      faceDetails.vertex(540, 460);
    faceDetails.vertex(494, 468);
    faceDetails.vertex(512, 475);
    faceDetails.vertex(537, 476);
    faceDetails.vertex(551, 462);
    faceDetails.vertex(543, 457);
    faceDetails.vertex(529, 463);
    faceDetails.vertex(512, 466);
    faceDetails.endShape(CLOSE);

//   Eye Left
  faceDetails.scale(0.95);
  faceDetails.translate(0, 30);
      faceDetails.beginShape();
    faceDetails.vertex(408, 471);
    faceDetails.vertex(425, 476);
    faceDetails.vertex(438, 472);
    faceDetails.vertex(447, 465);
    faceDetails.vertex(432, 469);
    faceDetails.vertex(419, 469);
    faceDetails.vertex(413, 467);
      faceDetails.endShape(CLOSE);

}


function drawClouds() {
  //   Draw Clouds
  let y = height/2 + 50
  
  noStroke();
  fill('#f9f8f7');

  beginShape();
  vertex(cloudXPos, y);
  vertex(cloudXPos + 350, y);
  vertex(cloudXPos + 252, y - 25);
  vertex(cloudXPos + 265, y - 36);
  vertex(cloudXPos + 250, y - 58);
  vertex(cloudXPos + 218, y - 60);
  vertex(cloudXPos + 209, y - 70);
  vertex(cloudXPos + 198, y - 78);
  vertex(cloudXPos + 166, y - 85);
  vertex(cloudXPos + 142, y - 78);
  vertex(cloudXPos + 142, y - 58);
  vertex(cloudXPos + 121, y - 60);
  vertex(cloudXPos + 102, y - 54);
  vertex(cloudXPos + 97, y - 33);
  vertex(cloudXPos + 106, y - 25);
  endShape(CLOSE);
  
  
  scale(0.5);
  translate(250, 100);
  beginShape();
  vertex(cloudXPos, y);
  vertex(cloudXPos + 350, y);
  vertex(cloudXPos + 252, y - 25);
  vertex(cloudXPos + 265, y - 36);
  vertex(cloudXPos + 250, y - 58);
  vertex(cloudXPos + 218, y - 60);
  vertex(cloudXPos + 209, y - 70);
  vertex(cloudXPos + 198, y - 78);
  vertex(cloudXPos + 166, y - 85);
  vertex(cloudXPos + 142, y - 78);
  vertex(cloudXPos + 142, y - 58);
  vertex(cloudXPos + 121, y - 60);
  vertex(cloudXPos + 102, y - 54);
  vertex(cloudXPos + 97, y - 33);
  vertex(cloudXPos + 106, y - 25);
  endShape(CLOSE);
  
  scale(0.8);
  translate(-50, 80);
  beginShape();
  vertex(cloudXPos, y);
  vertex(cloudXPos + 350, y);
  vertex(cloudXPos + 252, y - 25);
  vertex(cloudXPos + 265, y - 36);
  vertex(cloudXPos + 250, y - 58);
  vertex(cloudXPos + 218, y - 60);
  vertex(cloudXPos + 209, y - 70);
  vertex(cloudXPos + 198, y - 78);
  vertex(cloudXPos + 166, y - 85);
  vertex(cloudXPos + 142, y - 78);
  vertex(cloudXPos + 142, y - 58);
  vertex(cloudXPos + 121, y - 60);
  vertex(cloudXPos + 102, y - 54);
  vertex(cloudXPos + 97, y - 33);
  vertex(cloudXPos + 106, y - 25);
  endShape(CLOSE);
  
  scale(2);
  translate(300, 100);
  beginShape();
  vertex(cloudXPos, y);
  vertex(cloudXPos + 350, y);
  vertex(cloudXPos + 252, y - 25);
  vertex(cloudXPos + 265, y - 36);
  vertex(cloudXPos + 250, y - 58);
  vertex(cloudXPos + 218, y - 60);
  vertex(cloudXPos + 209, y - 70);
  vertex(cloudXPos + 198, y - 78);
  vertex(cloudXPos + 166, y - 85);
  vertex(cloudXPos + 142, y - 78);
  vertex(cloudXPos + 142, y - 58);
  vertex(cloudXPos + 121, y - 60);
  vertex(cloudXPos + 102, y - 54);
  vertex(cloudXPos + 97, y - 33);
  vertex(cloudXPos + 106, y - 25);
  endShape(CLOSE);
  
//   Cloud Animation
  //forward speed
  if (cloudXPos > 1200) {
    speed = -5;
  }
  //backward speed
  if (cloudXPos < -50) {
    speed = 5;
  }
  cloudXPos = cloudXPos + speed;
  
}




function drawFaceTest() {
  //   blue face
  beginShape();
    vertex(100, 179);
    vertex(74, 213);
    vertex(70, 261);
    vertex(66, 306);
    vertex(76, 333);
    vertex(83, 372);
    vertex(100, 426);
    vertex(118, 478);
    vertex(143, 514);
    vertex(166, 558);
    vertex(194, 591);
    vertex(208, 598);
    vertex(235, 600);
    vertex(258, 596);
    vertex(254, 645);
    vertex(277, 671);
    vertex(301, 681);
    vertex(346, 662);
    vertex(382, 642);
    vertex(430, 558);
    vertex(416, 473);
    vertex(408, 410);
    vertex(410, 370);
    vertex(443, 350);
    vertex(460, 318);
    vertex(446, 251);
    vertex(399, 240);
    vertex(383, 270);
    vertex(306, 239);
    vertex(220, 247);
    vertex(122, 157);
  endShape(CLOSE);
}



// Draw the birds in a loop layout
function makeShapes() {
  let xDist = (width/3)/(numColumnsBirds+1);    // distance between each object
  let yDist = (height/1.5)/(numRowsBirds+1);
  
  // draw columns first 
  for( let i = 0; i < numColumnsBirds; i++ ) {
      //     in that i is equal to 0, and i is less than the number of columns, then add 1 to i
  // then draw the rows
    for( let j = 0; j < numRowsBirds; j++) {
      
      let x = xDist * (i+1)+ wobbleNumb;
      let y = yDist * (j+1)+ wobbleNumb; 
      
      drawBirds(x, y);
      
      xDist = xDist + sin(20);
      yDist = yDist + sin(4);
    }
  }
}


// Draw one bird shape
function drawBirds(x,y) {
    fill(255);
  
  beginShape();
    vertex(x - b*6 -y/4, y - b);
    vertex(x - b*2 -y/4, y - b*2);
    vertex(x -y/4, y);
    vertex(x + b*2 -y/4, y - b*2);
    vertex(x + b*6 -y/4, y - b);
    vertex(x + b*6 -y/4, y - b);
    vertex(x + b*2 -y/4, y - b*1.5);
    vertex(x -y/4, y + b);
    vertex(x - b*2 -y/4, y - b*1.5);
  endShape(CLOSE);
  
}


// Draw a grid (each square is however many px stated in the variable "square")
function drawGrid() {
  let square = 50;
  push();
  stroke(240);
  strokeWeight(1);
    for (var i = 0; i < width; i += square) {
        line(i, 0, i, height);
        }
    for (var j = 0; j < height; j += square) {
        line(0, j, width, j);
        }
  pop();
}



/*************************************************************************
// Fullscreen functions
**************************************************************************/
// Fullscreen message
function fsMessage() {
  // if (fs === true) {
      push();
      fill(255);
      noStroke();
      textSize(width/60);
      textAlign(LEFT);
      text("Press [F] for fullscreen", 0 + width/100 , height - height/100)
      pop();
    // }
}

// Get coordinates from click (dsable background)
function mouseClicked() {
    print(mouseX, mouseY);
    fill(205);
    ellipseMode(CENTER);
    ellipse(mouseX, mouseY, 5, 5);
}

// Debug mode
function drawDebugInfo() {
  push();
    fill(255);
    noStroke();
    textSize(20);
    text("X: " + mouseX + "   Y: " + mouseY, 20, 20);
  pop();
}

// keyTyped for debugMode and fullscreen
function keyTyped() {
  if (key === 'd') {
    gDebugMode = !gDebugMode;
  }
  if (key === 'f') {
    let fs = fullscreen();
    fullscreen(!fs);
  }
 }