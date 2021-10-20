let playing = false;
let serial;
let latestData = "waiting for data"; 
let delimiter0 = 0, delimiter1 = 0, delimiter2 = 0;
let song;
let step1, step2, step3;

function setup() {

    createCanvas(windowWidth, windowHeight);
    song = loadSound('assets/falls.mp3');
    serial = new p5.SerialPort();
    serial.list();
    console.log("serial.list()   ", serial.list());
    serial.open("COM3");
    serial.on('connected', serverConnected);
    serial.on('list', gotList);
    serial.on('data', gotData);
    serial.on('error', gotError);
    serial.on('open', gotOpen);
}
function serverConnected() {
    console.log("Connected to Server");
}

function gotList(thelist) {
    console.log("List of Serial Ports:");
    // theList is an array of their names
    for (var i = 0; i < thelist.length; i++) {
        // Display in the console
        console.log(i + " " + thelist[i]);
    }
}
function gotOpen() {
    console.log("Serial Port is Open");
}
function gotError(theerror) {
    console.log(theerror);
}
function gotData() {
    var currentString = serial.readLine(); // read the incoming string
    trim(currentString); // remove any trailing whitespace
    if (!currentString) return; // if the string is empty, do no more
    console.log("currentString  ", currentString); // println the string
    latestData = currentString; // save it for the draw method
    console.log("latestData" + latestData); //check to see if data is coming in
    splitter = split(latestData, ','); // split each number using the comma as a delimiter
    //console.log("splitter[0]" + splitter[0]); 
    delimiter0 = splitter[0]; //put the first sensor's data into a variable
    delimiter1 = splitter[1];
    delimiter2 = splitter[2];
}
function gotRawData(thedata) {
    println("gotRawData" + thedata);
}
function draw() {
    
    text("Starting with the button to begin.", windowWidth/2, windowHeight/2);
    playSound();
    playLight();
}
function playSound() {
    if (delimiter0 == 1) {
        song.loop();
        drawMusicalPoint();
    }
    if (delimiter0 == 0) {
        song.stop();
    }
};

function drawMusicalPoint() {
    for (let i = 0; i < 10; i++) {
        step1 = Math.floor(Math.random() * windowWidth + 10);
        step2 = Math.floor(Math.random() * (400-22) +10);
        step3 = Math.floor(Math.random() * 100) + 1;
        noStroke();
        fill(200, 100, 70,20);
        ellipse(90, step2, 90);
    }
};
   

function playLight() {
    if(delimiter2 > 10){
        ellipse(20,20,20,20);
    if(delimiter2 < 10){
        ellipse(1,1,1,1);
    }
    }
    };

  




