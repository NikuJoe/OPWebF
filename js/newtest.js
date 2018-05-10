//Thanks for checking out my javascript! I try and update this when I can when bugs and the like crop up.  As I continue to learn more Q&A techniques, fixes and updates will come faster/hopefully I will be able to pre-empt some problems.  Anyways, maybe in this code you can find something useful or helpful.
//  ^(● ω ●)^
//-NikuJoe

//------------------------------------------------------------------------------//
/**
 * Bootstrap Carousel Swipe v1.1
 *
 * jQuery plugin to enable swipe gestures on Bootstrap 3 carousels.
 * Examples and documentation: https://github.com/maaaaark/bcSwipe
 *
 * Licensed under the MIT license.
 */
(function($) {
  $.fn.bcSwipe = function(settings) {
    var config = { threshold: 50 };
    if (settings) {
      $.extend(config, settings);
    }

    this.each(function() {
      var stillMoving = false;
      var start;

      if ('ontouchstart' in document.documentElement) {
        this.addEventListener('touchstart', onTouchStart, false);
      }

      function onTouchStart(e) {
        if (e.touches.length == 1) {
          start = e.touches[0].pageX;
          stillMoving = true;
          this.addEventListener('touchmove', onTouchMove, false);
        }
      }

      function onTouchMove(e) {
        if (stillMoving) {
          var x = e.touches[0].pageX;
          var difference = start - x;
          if (Math.abs(difference) >= config.threshold) {
            cancelTouch();
            if (difference > 0) {
              $(this).carousel('next');
            }
            else {
              $(this).carousel('prev');
            }
          }
        }
      }

      function cancelTouch() {
        this.removeEventListener('touchmove', onTouchMove);
        start = null;
        stillMoving = false;
      }
    });

    return this;
  };
})(jQuery);



//------------------------------------------------------------------------------//



//test var to see what dimensions this returns based on responsive design - will be deleted in the future
var splashTemp = document.getElementById("rotatingSplash").clientHeight;

//custom variables

var windowViewBuffer = 0.6; //percentage of animation container within the window .6=60%= 20% from top and 20% from bottom of view window.
var windowSingleBuffer = (1-windowViewBuffer)/2; //percentage from top of vw to top of buffer window or bottom of vw to bottom of buffer window.



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



//returns the scroll position of the element taking a windowpercentage into account.  I.e. if the buffer is set to .6 or 60%, then the scroll position will start 20% from the bottom of the view window or 80% down on the screen.  The buffer value was written to contain the svg animation which is why these values are set this way (.6 means animation will start and finish in the middle 60% of the screen based on the scroll value of the top of the element).

function scrollPosBuffer(el) {
  return null;
}


//will adjust hidden elements to visible upon scroll, is called in the sroll EvenetListener
/**
function adjusthidden(){
  var hiddenList = document.documentElement.getElementsByClassName("hidden");

  forEach(hiddenList, function makeVisible(e){
    var hiddenScrollTop = getOffset(this).top;
    var aboveHeight = document.documentElement.scrollTop + (1-windowSingleBuffer)*document.documentElement.clientHeight;

    if (aboveHeight < getOffset(this).top){
      this.setAttribute("class", "hidden");
    }
    else{
      this.setAttribute("class", "visible");
    }
  })
}
**/

//will adjust hidden elements to visible upon scroll, is called in the sroll EvenetListener

function adjusthidden(){
  var hiddenList = document.documentElement.getElementsByClassName("initial-hidden");
  var beforeHeight = document.documentElement.scrollTop + (1-windowSingleBuffer)*document.documentElement.clientHeight;

  if (hiddenList.length > 0){ //if there are elements that are invisible
    for (var i=0; i<hiddenList.length; i++){
      if (beforeHeight > getOffset(hiddenList[i]).top){
        hiddenList[i].classList.remove("invisible");
      }
      else{
        hiddenList[i].classList.add("invisible");
      }
    }
  }
  else return false;
}








//EveneListener for scrolling - unhides hidden and controls animation of the SVG element.
window.addEventListener("scroll", function svgScript(e) {

    var trueScrollPos = 0;
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

    adjusthidden();
});


//testing function for element values for Q&A of svg scroll test
var nameValue = document.querySelector('#nameTest')

function updateName() {
  prompt("Show values?");
  nameValue.textContent = "document.documentElement.scrollTop = " + document.documentElement.scrollTop + "     document.body.scrollTop = " + document.body.scrollTop + "     document.documentElement.scrollHeight = " + document.documentElement.scrollHeight + "     document.documentElement.clientHeight = " + document.documentElement.clientHeight +" svgHeight = " + svgHeight + " splash height = " + splashTemp;
}

//nameValue.addEventListener('click', updateName);
