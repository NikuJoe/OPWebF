//Thanks for checking out my javascript! I try and update this when I can when bugs and the like crop up.  As I continue to learn more Q&A techniques, fixes and updates will come faster/hopefully I will be able to pre-empt some problems.  Anyways, maybe in this code you can find something useful or helpful.
//  ^(● ω ●)^
//-NikuJoe



//test var to see what dimensions this returns based on responsive design - will be deleted in the future
var splashTemp = document.getElementById("rotatingSplash").clientHeight;


//smooth scrolling to anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});


//affix navbar to the top when window is small
window.addEventListener("resize", function fixNavBar(e){
  var screenSize = window.outerWidth;
  var navObj = document.getElementById("navWrapper");
  if (screenSize <= 767){
    navObj.setAttribute("class", "navbar navbar-expand-md navbar-light fixed-top");
  }
  else{
    navObj.setAttribute("class", "navbar navbar-expand-md navbar-light");
  }
});

////////////////////////////////////////////////////////////////////////////////////////////////
//Modifies embeded svg to draw on the scroll.
var path = document.querySelector("#side10star");
var pathLength = path.getTotalLength();

path.style.strokeDasharray = pathLength;
path.style.strokeDashoffset = pathLength;

//get dimensions of the path
function getOffset(el) {
  var tempel = el.getBoundingClientRect();
  return {
    left: tempel.left + window.scrollX,
    top: tempel.top + window.scrollY,
    right: tempel.left + window.scrollX + tempel.width,
    bottom: tempel.top + window.scrollY + tempel.height
  }
}

//custom variables


window.addEventListener("scroll", function svgScript(e) {

    var trueScrollPos = 0;
    var windowViewBuffer = 0.6; //percentage of animation container within the window
    var windowSingleBuffer = (1-windowViewBuffer)/2;
    var aboveHeight = document.documentElement.scrollTop + (1-windowSingleBuffer)*document.documentElement.clientHeight;

    if (aboveHeight< getOffset(path).top){
      trueScrollPos = 0;
    }
    else{
      trueScrollPos = -1*(getOffset(path).top - aboveHeight);
    }

    var scrollPercentage = trueScrollPos / (windowViewBuffer * document.documentElement.clientHeight);

    var drawLength = pathLength * scrollPercentage;

  //TEST CODE BELOW: logs values in the console so troubleshoot and adjust values.

  //  console.log("getOffset(path).top " + getOffset(path).top);
  //  console.log("trueScrollPos " + trueScrollPos);
  //  console.log("windowViewBuffer " + windowViewBuffer);
  //  console.log("windowSingleBuffer " + windowSingleBuffer);
  //  console.log("aboveHeight " + aboveHeight);
  //  console.log("scrollPercentage " + scrollPercentage);

    //Draw on scroll up
    path.style.strokeDashoffset = pathLength - drawLength;

    //Removes dasharray on finish for a polished look
    if (scrollPercentage >= 0.99) {
      path.style.strokeDasharray = "none";
    } else {
      path.style.strokeDasharray = pathLength + " " + pathLength;
    }
//  }
});


//testing function for element values for Q&A of svg scroll test
var nameValue = document.querySelector('#nameTest')

function updateName() {
  prompt("Show values?");
  nameValue.textContent = "document.documentElement.scrollTop = " + document.documentElement.scrollTop + "     document.body.scrollTop = " + document.body.scrollTop + "     document.documentElement.scrollHeight = " + document.documentElement.scrollHeight + "     document.documentElement.clientHeight = " + document.documentElement.clientHeight +" svgHeight = " + svgHeight + " splash height = " + splashTemp;
}

//nameValue.addEventListener('click', updateName);
