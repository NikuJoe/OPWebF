var splashTemp = document.getElementById("rotatingSplash").clientHeight;



//Modifies embeded svg to draw on the scroll.
var path = document.querySelector("#opusdds_logo_path");
var pathLength = path.getTotalLength();
var svgHeightTemp = document.getElementById("opusdds_logo_path");
var svgHeight = svgHeightTemp.scrollHeight;
var svgGroupHeightTemp = document.getElementById("svgGroup");
var svgGroupHeight = svgHeightTemp.scrollHeight;



path.style.strokeDasharray = pathLength+ " " + pathLength;
path.style.strokeDashoffset = pathLength;



window.addEventListener("scroll", function svgScript(e) {
  //var scrollPercentage = (document.documentElement.scrollTop + document.body.scrollTop) / (document.documentElement.scrollHeight - document.documentElement.clientHeight);
  var scrollPercentage = (document.documentElement.scrollTop)
  var drawLength = pathLength * scrollPercentage;

  //Draw on scroll up
  path.style.strokeDashoffset = pathLength - drawLength;

  //Removes dasharray on finish for a polished look
  if (scrollPercentage >= 0.99) {
    path.style.strokeDasharray = "none";
  } else {
    path.style.strokeDasharray = pathLength + " " + pathLength;
  }

});



var nameValue = document.querySelector('#nameTest')

function updateName() {
  prompt("Show values?");
  nameValue.textContent = "document.documentElement.scrollTop = " + document.documentElement.scrollTop + "     document.body.scrollTop = " + document.body.scrollTop + "     document.documentElement.scrollHeight = " + document.documentElement.scrollHeight + "     document.documentElement.clientHeight = " + document.documentElement.clientHeight + "   svgGroupHeight = " + svgGroupHeight + " svgHeight = " + svgHeight + " splash height = " + splashTemp;
}

nameValue.addEventListener('click', updateName);
