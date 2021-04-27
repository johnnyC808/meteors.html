var vw = window.innerWidth;
var vh = window.innerHeight;
var score = 0;
//Declare jumper object
var jumper;
//var bonus;
var bonus;
//hit detection
var point = false;
var deatha = false;
var deathb = false;
var deathc = false;
//score
var score = 0;
var highscore = localStorage.getItem("highscore");

//the sun is a deadly lazer
var meteora;
var meteorb;
var meteorc;
    function preload(){
        sound = loadSound('bonus.mp3');
    }

            function setup(){
                createCanvas(windowWidth,windowHeight);
                //set jumper as object
                jumper = new jumper();
                //set point as object
                bonus = new bonus();
                //platform = new platform();
                meteora = new meteora();
                meteorb = new meteorb();
                meteorc = new meteorc();
            }

            function draw(){
                clear();
                jumper.show();
                jumper.update();
                bonus.show();
                bonus.update();
                meteora.show();
                meteora.update();
                meteorb.show();
                meteorb.update();
                meteorc.show();
                meteorc.update();
                if (keyIsDown(38)){
                    jumper.up();
                }
            }

            //function keyPressed() {
                //if (keyCode === UP_ARROW) {
                    //jumper.up();
                
                //} 
                
            //}
            //build jumper object
            function jumper(){
                //starting x and y
                this.x = vw/2;
                this.y = vh;
                //a force without direction
                this.gravity = 0.9;
                //the opposite force
                this.lift = -3.5;
                // speed of gravity
                this.velocity = 0;
                this.show = function(){
                    fill(color(56, 73, 255));
                    stroke('white');
                    ellipse(this.x,this.y,40);
                    rectMode(CENTER);
                }
                this.update = function(){
                    //apply gravity to force
                    this.velocity += this.gravity;
                    //apply direction of gravity
                    this.y += this.velocity;
                    //apply resistance to velocity
                    this.velocity *= 0.9;
                    //stop jumper on the ground
                    if(this.y > vh-25){
                        this.y = vh-25;
                        //this.velocity = 0;
                    }
                    //stop jumper from passing ceiling.
                    if(this.y < 25){
                        this.y = 25;
                    }
                    //add left and right
                    if(keyIsDown(37)){
                        this.x -= 15;
                    }
                    if(keyIsDown(39)){
                        this.x += 15;
                    }
                    //add down
                    if(keyIsDown(40)){
                        this.y += 20;
                    }
                    //stop from going past right
                    if(this.x > vw-25){
                        this.x = vw-25;
                    }
                    //stop from going past left
                    if(this.x < 25){
                        this.x = 25;
                    }
                //make it jump
                this.up = function(){
                    this.velocity += this.lift;
                }
                deatha = collideCircleCircle(jumper.x,jumper.y,40,meteora.x,meteora.y,meteora.r);
                deathb = collideCircleCircle(jumper.x,jumper.y,40,meteorb.x,meteorb.y,meteorb.r);
                deathc = collideCircleCircle(jumper.x,jumper.y,40,meteorc.x,meteorc.y,meteorc.r);

                if ((deatha == true || deathb == true || deathc == true) && (score > highscore)){
                    highscore = score;
                    localStorage.setItem("highscore",highscore);
                    console.log(highscore);
                    //window.alert("You have died");
                    window.location.replace("index.html");
                }
                if ((deatha == true || deathb == true || deathc == true)&& (score <= highscore)){
                    //window.alert("You have died");
                    window.location.replace("index.html");
                }

                    
                }
            }
            function bonus(){
                this.x = random(25,vw-25);
                this.y = random(100,vh-25);
                this.show = function(){
                    noStroke();
                    fill(color('gold'));
                    ellipse(this.x,this.y,15);
                    rectMode(CENTER);
                }
                this.update = function(){
                    //if the number is even, redo the x and y position
                    point = collideCircleCircle(jumper.x,jumper.y,40,bonus.x,bonus.y,15);
                    if (point == true){
                        this.x = random(25,vw-25);
                        this.y = random(100,vh-25);
                        score += 1;
                        sound.play();
                    }
                }
            }
            function meteora(){
                this.x = random(25,vw-25);
                this.y = random(-200,-400);
                this.r = random(100,400);
                this.show = function(){
                    fill(color(255, 99, 99));
                    ellipse(this.x,this.y,this.r);
                    rectMode(CENTER);
                    noStroke();
                }
                this.update = function(){
                    var ms = (millis() / 1000).toFixed(0);
                    if (ms % 1 == 0) {
                        this.y += 10;
                    }
                    if (ms % 3 == 0){
                        meteora.x = random(25,vw-25);
                        meteora.y = random(-200,-400);
                    }
                }
            }
            function meteorb(){
                this.x = random(25,vw-25);
                this.y = random(-200,-400);
                this.r = random(100,400);
                this.show = function(){
                    fill(color(255, 99, 99));
                    ellipse(this.x,this.y,this.r);
                    rectMode(CENTER);
                    noStroke();
                }
                this.update = function(){
                    var ms = (millis() / 1000).toFixed(0);
                    if (ms % 1 == 0) {
                        this.y += 10;
                    }
                    this.t = random(3,5);
                    if (ms % 4 == 0){
                        meteorb.x = random(25,vw-25);
                        meteorb.y = random(-200,-400);
                    }
                }
            }
            function meteorc(){
                this.x = random(25,vw-25);
                this.y = random(-200,-400);
                this.r = random(100,400);
                this.show = function(){
                    fill(color(255, 99, 99));
                    ellipse(this.x,this.y,this.r);
                    rectMode(CENTER);
                    noStroke();
                }
                this.update = function(){
                    var ms = (millis() / 1000).toFixed(0);
                    if (ms % 1 == 0) {
                        this.y += 10;
                    }
                    this.t = random(3,5);
                    if (ms % 5 == 0){
                        meteorc.x = random(25,vw-25);
                        meteorc.y = random(-200,-400);
                    }
                }
            }