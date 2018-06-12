//Thanks for checking out my javascript! I try and update this when I can when bugs and the like crop up.  As I continue to learn more Q&A techniques, fixes and updates will come faster/hopefully I will be able to pre-empt some problems.  Anyways, maybe in this code you can find something useful or helpful.
//  ^(● ω ●)^
//-NikuJoe

//------------------------------------------------------------------------------//


//------------------------------------------------------------------------------//
$(document).ready(function(){


  //custom variables

  var windowViewBuffer = 0.6; //percentage of animation container within the window .6=60%= 20% from top and 20% from bottom of view window.
  var windowSingleBuffer = (1-windowViewBuffer)/2; //percentage from top of vw to top of buffer window or bottom of vw to bottom of buffer window.

  //object validation
  function validateMe(el){
    if (el === null || el === "undefined"){
      return false;
    }
    return true;
  }

  //get dimensions of a parameter element
  function getOffset(el) {
    var tempel = el.getBoundingClientRect();
    if (validateMe(tempel)){
      return {
        left: tempel.left + window.scrollX,
        top: tempel.top + window.scrollY,
        right: tempel.left + window.scrollX + tempel.width,
        bottom: tempel.top + window.scrollY + tempel.height
      }
    }
  }

  //------------------------------------------------------------------------------//
  // Smooth scrolling method found on w3schools.com

  $("a").on('click', function(event) {

    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "") {
      // Prevent default anchor click behavior
      event.preventDefault();

      // Store hash
      var hash = this.hash;

      // animate over 800ms
      if($(hash).offset().top === 0){
        $('html, body').animate({
          scrollTop: $(hash).offset().top
        }, 800, function(){
     
          // Add hash (#) to URL when done scrolling (default click behavior)
          window.location.hash = hash;
        });
      }
    }
  });
  

  //------------------------------------------------------------------------------//











  //method disables hover on touch screens and enables it if there is a mouse input.

  function hasTouch() {
      return 'ontouchstart' in document.documentElement
            || navigator.maxTouchPoints > 0
            || navigator.msMaxTouchPoints > 0;
  }

  function watchForHover() {
      var hasHoverClass = false;
      var container = document.body;
      var lastTouchTime = 0;

      function enableHover() {
          // filter emulated events coming from touch events
          if (new Date() - lastTouchTime < 500) return;
          if (hasHoverClass) return;

          container.className += ' hasHover';
          hasHoverClass = true;
      }

      function disableHover() {
          if (!hasHoverClass) return;
          container.className = container.className.replace(" hasHover", "");
          hasHoverClass = false;
      }

      function updateLastTouchTime() {
          lastTouchTime = new Date();
      }

      document.addEventListener('touchstart', updateLastTouchTime, true);
      document.addEventListener('touchstart', disableHover, true);
      document.addEventListener('mousemove', enableHover, true);

      enableHover();
  }

  //calls watchForHover to envoke.
  watchForHover();


  //hides all hideme classes initially on document load, will get overwritten later scroll function so that hideme classes will fade-in, this is to make sure that hideme classes will display when js is disabled.

  //changes the navbar from transparent to opaque based on scroll position, will function on load as well.

  $(window).bind("scroll load", function scrollNavFix(e){
    var carBottom = getOffset(document.getElementById("rotatingSplash")).bottom;

    var navObj = document.getElementById("navWrapper"); //gets navbar object
    if (validateMe(navObj) === true){  //validation of object
      if(getOffset(navObj).top > carBottom){
        navObj.classList.add("navbar-opaque");
      }
      else{
        navObj.classList.remove("navbar-opaque");
      }
    }

    var togObj = document.getElementById("navbar-toggler-icon-id"); //gets id for toggle button
    if (validateMe(togObj) === true){
      if(getOffset(togObj).top > carBottom){
        togObj.classList.add("navbar-toggler-icon-opaque");
      }
      else{
        togObj.classList.remove("navbar-toggler-icon-opaque");
      }
    }

  });

$(".hideme").each(function initialHide(){
  $(this).css("opacity", "0");
});



$(window).bind("scroll", function unhideElems(){
  $('.hideme').each( function(i){
          
    var bottom_of_object = $(this).offset().top + $(this).outerHeight();
    var bottom_of_window = $(window).scrollTop() + $(window).height();


    if( bottom_of_window > bottom_of_object ){
      $(this).animate({opacity : '1'},1000);
    }
    
  }); 
});

//smooth scrolling to anchors credit Tania Rascia
$('a[href*="#"]').on('click', function (e) {
	e.preventDefault();

	$('html, body').animate({
		scrollTop: $($(this).attr('href')).offset().top
	}, 800, 'linear');
});


  ////////////////////////////////////////////////////////////////////////////////////////////////
  //Modifies embeded svg to draw on the scroll.
  var path = document.querySelector("#side10star");
  var pathExists = false;
  if (path!=null){
    pathExists = true;
    var pathLength = path.getTotalLength();
    path.style.strokeDasharray = pathLength;
    path.style.strokeDashoffset = pathLength;
  }
  else{
    pathExists = false;
  }






  //returns the scroll position of the element taking a windowpercentage into account.  I.e. if the buffer is set to .6 or 60%, then the scroll position will start 20% from the bottom of the view window or 80% down on the screen.  The buffer value was written to contain the svg animation which is why these values are set this way (.6 means animation will start and finish in the middle 60% of the screen based on the scroll value of the top of the element).

  function scrollPosBuffer(el) {
    return null;
  }




  //EveneListener for scrolling - unhides hidden and controls animation of the SVG element.
  /*window.addEventListener("scroll", function svgScript(e) {

      if (pathExists == true){
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
      }
      else{
        return false;
      }

      //adjusthidden();
  });*/














});