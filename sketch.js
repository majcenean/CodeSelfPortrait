/*************************************************************************
    Code Self-Portrait
          by Maj Jenkins
          February 11, 2021

    Overview:
    
    This is the weekly coding assignment for ART385.
    
    For my self portrait, I wanted to try and capture the essence of constantly being in transit. I have difficulty doing self portraits as a concept because I lack a sense of cohesive self; I have difficulty defining myself and understanding who I am from other people's perspectives. In this project, I wanted to capture that feeling of vaguity by depicting my face and body shape, but not my exact skin, hair, or minute facial details. 
    
    I also wanted to represent how I see myself spiritually formed by my environment. I don't believe in the sense of the self alone, I believe that we are all influenced by those around us and the physical place which surrounds us: our homes, our neighborhoods, etc. To accomplish this, I attempted to imitate the sky in my depiction of myself by using shades of blue and clouds. This could also symbolize how I feel that I sometimes "have my head in the clouds," also, I just read the comedy Clouds by Aristophanes for more context for one of my Classics courses and I really thought it was funny, so that may have also influenced this direction. I included birds and the sun, which are my favorite things to see other than a blue sky when I go outside, and I feel define me.
    
    For the message of this project, I wrote a short poetic snippet about how I am still "weaving" my life, that this, myself, as everything else, is a work in progress, and never fully finished or complete. To add to this theme of "weaving", I made the background of this project a grid pattern and bordered by animated "threads".
    
    Functionality in this project includes making the sketch fullscreen by pressing F and moving the mouse to move the clouds. 
 
    ---------------------------------------------------------------------
    Notes: 
    (1) Known issue: The face functions - drawFace, drawFaceDetails, and drawBody are responsive, but drawHands is non-responsive and is limited to static x and y positions. I attempted to treat it the same way I did its predecessors, but the amount of createGraphics functions began to lag my computer and I thought it would be better to have a non-responsive bit than to make a laggy sketch.
    (2) Known issue: In drawFaceDetails, the separate objects are affected by one another's translation and scale functions. I recognized that I should have used push() and pop() too late, and since it works in the testing I have done and does not break apart, I decided my time would be better spent improving the sketch elsewhere; however, I recognize that this is problematic if one were to go in and try to change the location of a specific face detail object.
    (3) Self-evaluation: I tried to push myself to adhere to the coding stylistics well, use for loops, and work more with shapes. I also tried new things, like working with WEBGL space and using drawn shapes as masks. I wanted to include more interactive elements (such as I wanted to have someone click on the sun and a song to play) but I wanted to focus on the basics to make this a cleaner project. I also wanted to allot this "winding down/packing up the project" time to clean up my code, write this Overview & Notes as well as the README file, and make sure my GitHub/Webspace is working, because most of these are new to me and I wanted to make sure I had time to get them in order.
     
     ---------------------------------------------------------------------
    Code Citations:
    (1) Title: Using mask() on createGraphics() object
       Author: cdaein
       Date: April 2017
       Link: https://forum.processing.org/two/discussion/21981/p5-js-using-mask-on-creategraphics-object
       Purpose: Using the mask function on drawn objects in p5.js, as opposed to masking an image - basically, treating the drawn objects like an image using the createGraphics function.
    
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
var bodyBg;

// Font
var louisGeorgeCafe;
var inconsolata;

// Clouds
var cloudXPos = 5;
var speed = 5;


/*************************************************************************
// Window resize to fullscreen sketch
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
}

/*************************************************************************
// Function setup
**************************************************************************/
function setup() {
    //   Create Canvas
    createCanvas(windowWidth, windowHeight);
    //   Set default font
    textFont(inconsolata);
    // Draw the portrait's body and face; set up masking
    drawBody();
    drawFace();
    (faceBgClone = faceBg.get()).mask(mask.get());
    drawFaceDetails();
}

/*************************************************************************
// Function draw
**************************************************************************/
function draw() {
    background('#C6BDAB');
    fill('#f9f8f7');
    noStroke();

    //   Set the frame rate
    frameRate(fr);

    //   Draw the background grid
    drawGrid();

    //   Draw animated line background
    drawBackground();

    //   Draw the sun lines
    drawSun();

    //   Draw the birds
    makeShapes();

    //   Draw the fullscreen message
    fsMessage();

    //   Draw the body (position the createGraphics called in setup)
    image(bodyBg, 2 * (width / 3), 1 * (height / 5));

    //   Draw hands
    drawHands();

    //   Draw and animate the clouds
    drawClouds();

    //   Draw sun ray thread
    drawSunThread();

    //   Draw the face (position the createGraphics called in setup)
    image(faceBgClone, 2 * (width / 3), 1 * (height / 5));
    image(faceDetails, 2 * (width / 3), 1 * (height / 5));

    //   Draw the central text
    drawPoem();

    //   Debug Mode Toggle
    if (gDebugMode == true) {
        // drawDebugInfo();         // Toggled off
    }
}


/*************************************************************************
// Custom functions
**************************************************************************/
// Draw the animated line background (a loop)
function drawBackground() {
    //   Line background
    let grassColors = ['#b2aa9a', '#ccc4b3', '#d1cabc'];
    let grassWeight = ['7', '5', '3'];

    push();
    //   Left side
    for (var i = 0; i < width / 5; i += 40) {
        for (let j = 0 + 2; j < height; j += 20) {
            stroke(random(grassColors));
            strokeWeight(random(grassWeight));
            line(i, j, i + 70, j + 20);
        }
    }
    //   Right side
    for (var l = 9 * (width / 10); l < width; l += 40) {
        for (let j = 0 + 2; j < height; j += 20) {
            stroke(random(grassColors));
            strokeWeight(random(grassWeight));
            line(l, j, l + 70, j + 20);
        }
    }
    pop();
}

// Draw the "weaving" short poem
function drawPoem() {
    push();
    fill('#4f4c44');
    textFont(louisGeorgeCafe);
    textSize(width / 25);
    text('i am weaving', width / 8, 4 * (height / 5));
    textSize(width / 20);
    text('i am still weaving', width / 8.5, 4.4 * (height / 5));
    textSize(width / 30);
    text('at the loom of life and i am not done', width / 5, height - (height / 15));
    pop();
}

// Draw the body including hands
// Reminder that this function is called in setup function and not the draw function
function drawBody() {
    bodyBg = createGraphics(1000, 1000);
    //   Shirt
    bodyBg.fill('#b2aa9a');
    bodyBg.noStroke();
    bodyBg.beginShape();
    bodyBg.beginShape();
    bodyBg.vertex(140, 650);
    bodyBg.vertex(100, 745);
    bodyBg.vertex(190, height + 200);
    bodyBg.vertex(570, height + 200);
    bodyBg.vertex(670, 730);
    bodyBg.vertex(600, 610);
    bodyBg.vertex(400, 550);
    bodyBg.endShape(CLOSE);

    //   Collar
    bodyBg.fill('#a0998b');
    bodyBg.beginShape();
    bodyBg.vertex(400, 550);
    bodyBg.vertex(200, 628);
    bodyBg.vertex(217, 688);
    bodyBg.vertex(306, 744);
    bodyBg.vertex(362, 730);
    bodyBg.vertex(459, 678);
    bodyBg.vertex(495, 578);
    bodyBg.endShape(CLOSE);
}

function drawHands() {
    //   Left Arm
    push();
    scale(0.89);
    translate(250, 100);
    fill('#71B6F3');
    beginShape();
    vertex(1450, 1150);
    vertex(1400, 950);
    vertex(1130, 1151);
    vertex(951, 920);
    vertex(999, 901);
    vertex(1056, 878);
    vertex(1083, 816);
    vertex(1048, 804);
    vertex(1030, 838);
    vertex(985, 862);
    vertex(952, 859);
    vertex(923, 835);
    vertex(950, 758);
    vertex(1018, 748);
    vertex(1047, 782);
    vertex(1074, 784);
    vertex(1048, 711);
    vertex(939, 713);
    vertex(896, 766);
    vertex(897, 708);
    vertex(969, 670);
    vertex(1048, 672);
    vertex(1060, 656);
    vertex(980, 637);
    vertex(900, 660);
    vertex(861, 707);
    vertex(862, 647);
    vertex(960, 603);
    vertex(954, 584);
    vertex(854, 613);
    vertex(813, 706);
    vertex(796, 661);
    vertex(838, 603);
    vertex(810, 595);
    vertex(755, 664);
    vertex(790, 775);
    vertex(820, 906);
    vertex(862, 966);
    vertex(1100, 1400);
    vertex(1209, 1373);
    endShape(CLOSE);
    pop();

    // Right Arm
    push();
    scale(1.25);
    translate(-400, -250);
    fill('#63A5D4');
    beginShape();
    vertex(1871, 1014);
    vertex(1966, 1022);
    vertex(1966, 1193);
    vertex(1730, 1400);
    vertex(1451, 1014);
    vertex(1361, 974);
    vertex(1304, 964);
    vertex(1268, 942);
    vertex(1273, 929);
    vertex(1300, 939);
    vertex(1352, 940);
    vertex(1282, 906);
    vertex(1283, 844);
    vertex(1300, 854);
    vertex(1302, 886);
    vertex(1352, 909);
    vertex(1328, 876);
    vertex(1336, 810);
    vertex(1356, 809);
    vertex(1356, 854);
    vertex(1399, 900);
    vertex(1378, 858);
    vertex(1404, 808);
    vertex(1420, 817);
    vertex(1413, 856);
    vertex(1448, 907);
    vertex(1468, 905);
    vertex(1475, 889);
    vertex(1468, 870);
    vertex(1440, 847);
    vertex(1458, 834);
    vertex(1512, 886);
    vertex(1512, 962);
    vertex(1716, 1206);
    vertex(1872, 1016);
    endShape(CLOSE);
    pop();
}

// Draw the blue face (a mask of a sphere)
// Reminder that this function is called in setup function and not the draw function
function drawFace() {
    // faceBg = createGraphics(1000, 1000);     // use this in case the sphere does not work
    faceBg = createGraphics(1000, 1000, WEBGL);
    mask = createGraphics(1000, 1000);

    // // Blue Background Rectangle     // use this in case the sphere does not work
    // faceBg.noStroke();
    // faceBg.rectMode(CENTER);
    // faceBg.fill('#63A5D4');
    // faceBg.rect(0, 0, 1000, 2000);

    // Blue Background Sphere (Radial Gradient)
    faceBg.background('#63A5D4');
    faceBg.fill(165, 190, 210);
    faceBg.ambientLight(149, 201, 239);
    faceBg.noStroke();
    let dirX = (mouseX / width - 0.5) * 2;
    let dirY = (mouseY / height - 0.5) * 2;
    faceBg.directionalLight(99, 165, 212, -dirX, -dirY, -1);
    faceBg.sphere(800);

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

// Draw the details of the face, such as the hair, lips, and eyes.
// Reminder that this function is called in setup function and not the draw function
function drawFaceDetails() {
    faceDetails = createGraphics(1000, 1000);

    //   Hair
    faceDetails.fill('#b2aa9a');
    faceDetails.noStroke();
    faceDetails.beginShape();
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

    //   Nose Left
    faceDetails.strokeWeight(7);
    faceDetails.translate(-10, -20);
    faceDetails.line(456, 474, 444, 521);
    faceDetails.line(444, 521, 446, 538);
    faceDetails.line(446, 538, 461, 549);

    //   Nose Right
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

function drawSun() {
    //   Sun rays
    push();
    stroke('#F9CC00')
    strokeWeight(8);
    for (var i = width / 6; i < width / 4; i += width / 60) {
        line(i, height / 6, i + i / 1.5, 2 * (height / 3));
    }
    pop();

    //   Sun circle
    let sunSize = ((width / 6) - (width / 4) - 125);
    let x = (width / 6 - 50);
    let y = (height / 6 + sunSize + 120);

    push();
    noStroke();
    fill('#F9CC00');
    ellipseMode(CORNER);
    ellipse(x, y, sunSize, sunSize);
    pop();
}

function drawSunThread() {
    //   Sun rays thread
    push();
    noFill();
    stroke('#F9CC00')
    strokeWeight(8);
    bezier(424, 402, 689, 633, 941, 450, 1050, 725);
    bezier(1237, 627, 1264, 706, 1326, 788, 1398, 770);
    pop();
}

// Draw and animate the clouds (not a loop)
function drawClouds() {
    //   Draw Clouds
    let y = height / 2 + 50

    cloudXPos = mouseX;
    noStroke();
    fill('#f9f8f7');

    //    First (Original) Cloud
    push();
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
    pop();

    //    Second Cloud
    push();
    scale(0.5);
    translate(250, 100);
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
    pop();

    //    Third Cloud
    push();
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
    pop();

    //    Fourth Cloud
    push();
    scale(0.8);
    translate(0, 0);
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
    pop();

    // //   Cloud Animation         // use this if you want them to animate, not follow the mouseX position
    // //forward speed
    // if (cloudXPos > 1200) {
    //     speed = -5;
    // }
    // //backward speed
    // if (cloudXPos < -50) {
    //     speed = 5;
    // }
    // cloudXPos = cloudXPos + speed;
}

// Draw the birds (loop)
function makeShapes() {
    let xDist = (width / 3) / (numColumnsBirds + 1); // distance between each object
    let yDist = (height / 1.5) / (numRowsBirds + 1);

    // draw columns first 
    for (let i = 0; i < numColumnsBirds; i++) {
        //     in that i is equal to 0, and i is less than the number of columns, then add 1 to i
        // then draw the rows
        for (let j = 0; j < numRowsBirds; j++) {

            let x = xDist * (i + 1) + wobbleNumb;
            let y = yDist * (j + 1) + wobbleNumb;

            drawBirds(x, y);

            xDist = xDist + sin(20);
            yDist = yDist + sin(4);
        }
    }
}

// Draw one bird shape (called in makeShapes function)
function drawBirds(x, y) {
    fill('#4f4c44');
    beginShape();
    vertex(x - b * 6 - y / 4, y - b);
    vertex(x - b * 2 - y / 4, y - b * 2);
    vertex(x - y / 4, y);
    vertex(x + b * 2 - y / 4, y - b * 2);
    vertex(x + b * 6 - y / 4, y - b);
    vertex(x + b * 6 - y / 4, y - b);
    vertex(x + b * 2 - y / 4, y - b * 1.5);
    vertex(x - y / 4, y + b);
    vertex(x - b * 2 - y / 4, y - b * 1.5);
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
    fill('#4f4c44');
    noStroke();
    textSize(width / 60);
    textAlign(LEFT);
    text("Press [F] for fullscreen", 0 + width / 100, height - height / 100)
    pop();
    // }
}

// Get coordinates from click (disable background)
//function mouseClicked() {
//    print(mouseX, mouseY);
//    fill(205);
//    ellipseMode(CENTER);
//    ellipse(mouseX, mouseY, 5, 5);
//}

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
