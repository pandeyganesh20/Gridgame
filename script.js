var clickHistory = [];
var progress;
var track = [];
var sum=0;//calculate score

var fs1=0;  //counts step to count no of click user winlevel 1 
              
var fs2=0;//counts step to count no of click user win level 2

/*var obj = function () {
      var sum = 0;
      return{
      return this.sum;
    }
}
*/
function setup() { //initialize everything
  fillFunctionButtons();
  fillStatusText();
  fillProgressBar();
  fillMatrix();
  doit();
  Arraydo();
  doit1();
  Arraydo1();
  doit2();
  Arraydo2();
 setStatusText("Loaded succesfully!","text-bold" );
}


function fillFunctionButtons() {
  var headDiv = document.getElementById("head");
  var funcBtnRow = createRow();
  // createButton(buttonText, styleClass, functionName);
  funcBtnRow.appendChild(createButton("All Mid All Random", "btn btn-primary btn-sm m-3", "f1()"));
  funcBtnRow.appendChild(createButton("Drop the beat", "btn btn-warning btn-sm m-3", "f2()"));
  funcBtnRow.appendChild(createButton("Defile", "btn btn-dark btn-sm m-3", "f3()"));
  funcBtnRow.appendChild(createButton("Reset All!", "btn btn-light m-3", "f4()"));
  
  funcBtnRow.appendChild(createButton("Level 2!", "btn btn-dark m-3", "f5()"));
  funcBtnRow.appendChild(createButton("Level 3!", "btn btn-dark m-3", "f6()"));
  headDiv.appendChild(funcBtnRow);
}

function fillStatusText() {
  var headDiv = document.getElementById("head");
  var infoTextRow = createRow("ml-3");
  infoTextRow.id = "infoText"; //set id of this element so we can change it later
  headDiv.appendChild(infoTextRow);
}

function setStatusText(text, style) {
  var textDiv = document.getElementById("infoText");
  var newText = document.createElement("p");
  if (style != null) {
    newText.className = style;
  }
  newText.appendChild(document.createTextNode(text));
  textDiv.innerHTML = "";
  textDiv.appendChild(newText);
}

function fillProgressBar() {
  var headDiv = document.getElementById("head");
  var progessRow = createRow("progress");
  progress = 0;
  //a green colored bar
  var bar = createProgressBar("bar", "bg-success", progress);
  progessRow.appendChild(bar);
  headDiv.appendChild(progessRow);
}

function fillMatrix() {
  var matrix = document.getElementById("grid");
  for (i = 0; i < 4; i++) {
    var newRow = createRow("justify-content-md-center");
    for (j = 0; j < 4; j++) {
      newRow.appendChild(createDefaultButton(i, j));
    }
    matrix.appendChild(newRow);
  }
}

function fillAllRandom() { //sample function 1
  for (i = 0; i < 4; i++) {
    for (j = 0; j < 4; j++) {
      setButtonColor(i, j, getRandomColor());
      setButtonText(i, j, getRandomNumber(1, 10));
    }
  }
}

function drop() { //sample function 2
  for (i = 3; i > 0; i--) {
    for (j = 0; j < 4; j++) {
      setButtonColor(i, j, getButtonColor(i-1, j));
      setButtonText(i, j, getButtonText(i-1, j));
    }
  }
  //for row 0
    for (j = 0; j < 4; j++) {
      setButtonColor(i, j, getRandomColor());
      setButtonText(i, j, getRandomNumber(1, 10));
    }
}

function defile(number) { //sample function 3 (recursion and time)
  if (number < 0) return;
  for (n = 0; n < number; n++) {
    setTimeout(function(){
      var i = getRandomNumber(0, 5);
      var j = getRandomNumber(0, 5);
      setButtonColor(i, j, "black");
      setButtonText(i, j, "");
      setProgressBar("bar", "bg-danger", progress=0);
    }, (number+1)*number - n*n);
  }
}

function purge() { //sample function 4
  for (i = 0; i < 4; i++) {
    for (j = 0; j < 4; j++) {
      setButtonColor(i, j, "white");
      setButtonText(i, j, "");
    
    }
  }

  progress = 0;
  clickHistory = [];
  setProgressBar("bar", "bg-success", progress);
}

function f1() {
  setStatusText("Fill with random colors");
  fillAllRandom();
}

function f2() {
  setStatusText("Drop everything by 1 row");
  drop();
}

function f3() {
  setStatusText("BAM! BAM! BAM!");
  defile(32);
}

function f4() {
  setStatusText("Reset Grid, Back to Level 1");
  purge();
  Arraydo();
  doit();
}

function f5()
{
  setStatusText("Level:2");
  doit1();
  Arraydo1();
  }

function f6()
{
  setStatusText("Level:3");
  doit2();
  Arraydo2();
  }

// helper functions below

function createRow(className) {
  var rowDiv = document.createElement("div");
  if (className == null) {
    rowDiv.className = "row";
  } else {
    rowDiv.className = "row " + className;
  }
  return rowDiv;
}

function createButton(buttonText, styleClass, functionName) {
  var button = document.createElement("button");
  button.className = styleClass;
  button.appendChild(document.createTextNode(buttonText));
  button.setAttribute("onclick", functionName);
  return button;
}

function createProgressBar(bar_id, color, value) {
  var bar = document.createElement("div");
  bar.id = bar_id;
  bar.className = "progress-bar " + color;
  bar.setAttribute("style", "width: " + value + "%");
  return bar;
}

function setProgressBar(bar_id, color, value) {
  var bar = document.getElementById(bar_id);
  bar.className = "progress-bar " + color;
  bar.setAttribute("style", "width: " + value + "%");
  bar.innerHTML = value + "%";
}

function createDefaultButton() {
  var button = document.createElement("div");
  button.className = "thumbnail";
  button.setAttribute("onclick", "buttonClicked("+i+","+j+")");

  //the image part
  var img = document.createElement("img");
  img.id = "img_" + i + "_" + j;
  img.setAttribute("src", "images/white.jpg");
  img.setAttribute("alt", "green");
  img.setAttribute("class", "rounded-circle");
  img.setAttribute("stroke","#ff0220");
  img.setAttribute("width", "75");
  img.setAttribute("height", "75");

  //the text part
  var text = document.createElement("label");
  text.setAttribute("class", "caption unselectable");
  text.id = "text_" + i + "_" + j;

  button.appendChild(img);
  button.appendChild(text);
  return button;
}

function setButtonColor(i, j, color) {
  var button = document.getElementById("img_" + i + "_" + j);
  button.setAttribute("src", "images/" + color + ".jpg");
  button.setAttribute("alt", color);
}

function setButtonText(i, j, text) {
  var button = document.getElementById("text_" + i + "_" + j);
  button.innerHTML = text;
}

function getButtonColor(i, j) {
  var img = document.getElementById("img_" + i + "_" + j);
  return img.getAttribute("alt");
}

function getButtonText(i, j) {
  var text = document.getElementById("text_" + i + "_" + j);
  return text.innerHTML;
}

function getRandomColor() {
  //you might want to change this to get more colors
  var random = Math.floor(Math.random() * 4);
  if (random < 1) {
    return "red";
  } else if (random < 2) {
    return "green";
  } else if (random < 3) {
    return "turquoise";
  }
  return "yellow";
}

function getRandomNumber(min, max) {
  return min + Math.floor(Math.random() * (max - min + 1));
}

//console interaction functions
function logAllHistory() {
  if (clickHistory.length == 0) {
    console.log("History is empty");
    return;
  }
  for (i = 0; i < clickHistory.length; i++) {
    console.log(clickHistory[i]);
  }
}

function logLastClicked() {
  if (clickHistory.length == 0) {
    console.log("History is empty");
  } else {
    console.log(clickHistory[clickHistory.length - 1]);
  }
}

//this is what's triggered when any button in the matrix is pressed

function buttonClicked(i, j) { //this is where you should start

 // setStatusText("Button [" + i + " , " + j + "] pressed");
   setStatusText("Already Selected! Select other available no");
  clickHistory.push(i*4 + j);
  //set this button to a random color
  setButtonColor(i, j, getRandomColor());
  var currentText = getButtonText(i, j);
 
 
 // track.push(currentText);
if (currentText==""){
  
  clickHistory.length=clickHistory.length-1;
  // accomplished to count only valid clicks
  return;
          }
 
  if ((currentText%2)==0){
      sum++;
      } 

    
    
    setStatusText("Score:" +sum);
  

 if ((clickHistory.length>=6+(fs1)+(fs2))&&(sum<3)){

setStatusText("Game Over!If you want to play again. Press reset All button!");
  
  sum=0;
  
     }


if ((sum==4)&&(clickHistory.length<=7)){
   fs1=fs1+ clickHistory.length;
  setTimeout(setStatusText("You won Level 1 , press Level 2"),1000);
  sum=0;
  
     }
     
    
if ((sum==5)&&(clickHistory.length<=(fs1)+8))
     {
       fs2=fs2+clickHistory.length;
        setStatusText("You won Level 2 , press Level 3")
        sum=0;
     }

 if ((sum==6)&&(clickHistory.length<=(fs2)+9))
     {
       
        setStatusText("You won Level 3 , Congratulation")
     }


  
  var textValue = "";
  if (currentText != "") {
   // textValue = parseInt(currentText, 10);
    //convert the text to base10 (decimal) 
    //number
    textValue="";
  }
  setButtonText(i, j, "");
  //increase the progress bar a bit
 var progress=0;
 /* if (fs1==0)
  {
    progress=7-clickHistory.length;
  }
  if (fs2==0&&fs!=0)
  {
    progress= 8-clickHistory.length;
  }
  if (fs2!=0&&fs1!=0)
  {
    progress= 9-clickHistory.length;
  }
  */
  setProgressBar("bar", "bg-success", progress);
}

var hero=[];
var hero1=[];
var hero2=[];

function doit(){
    
     hero= ["4", "7","12","2","1","22","18","12","11","3", "2","-2","5","2","1","22"];
                 }


function doit1(){
   
   hero1=["3", "2","-2","5","1","23","15","12","11","2","55","11","4","33","8","6"];
                   }


function doit2(){
   
   hero2=["4", "2","3","2","1","22","17","11","17","15","12","11","2","77","99","0"];
                  }
//}
//var m=0;
//var n=0;
function Arraydo(){
 
  for ( k = 0; k <hero.length; k++)
   {
      m = Math.floor((k/4));
      n= ((k)%4);
      setButtonText(m,n,hero[k]);
         }
           }

          
 function Arraydo1(){

   for ( k = 0; k <hero1.length; k++)
    {
      m = Math.floor((k/4));
      n= ((k)%4);
      setButtonText(m,n,hero1[k]);
         }
           }

function Arraydo2(){

   for ( k = 0; k <hero2.length; k++)
    {
      m = Math.floor((k/4));
      n= ((k)%4);
      setButtonText(m,n,hero2[k]);
         }
           }

