

//This allows smooth scrolling to "id" tags on webpage. This is supported by only the latest browsers (As of  2018/04) as it used native functionality.  Smooth transitions are nice, but not really a key aspect of the site which is why this newer method is used.

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
        e.preventDefault();

        document.querySelector(this.getAttribute("href")).scrollIntoView({
            behavior: "smooth"
        });
    });
});





window.addEventListener("scroll", function svgScript(e) {
//  if((document.documentElement.scrollTop +document.documentElement.clientHeight) > (1.5*path.getOffset().top)){

    var trueScrollPos = 0;
    var windowViewBuffer = 0.8; //percentage of animation container within the window
    var windowSingleBuffer = (1-windowViewBuffer)/2;
    var aboveHeight = document.documentElement.scrollTop + (1-windowSingleBuffer)*document.documentElement.clientHeight;

    if (aboveHeight< path.getOffset(path).top){
      trueScrollPos = 0;
    }
    else{
      trueScrollPos = -1*(path.getOffset(path).top - aboveHeight);
    }


//    var scrollPercentage = (document.documentElement.scrollTop + document.body.scrollTop) / (document.documentElement.scrollHeight - document.documentElement.clientHeight);
    var scrollPercentage = trueScrollPos / (windowViewBuffer * document.documentElement.clientHeight);

    var drawLength = pathLength * scrollPercentage;

    //Draw on scroll up
    path.style.strokeDashoffset = pathLength - drawLength;

    scrollPercentage = .8;

    //Removes dasharray on finish for a polished look
    if (scrollPercentage >= 0.99) {
      path.style.strokeDasharray = "none";
    } else {
      path.style.strokeDasharray = pathLength + " " + pathLength;
    }
//  }
});
