

//This allows smooth scrolling to "id" tags on webpage. This is supported by only the latest browsers (As of  2018/04) as it used native functionality.  Smooth transitions are nice, but not really a key aspect of the site which is why this newer method is used.

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
        e.preventDefault();

        document.querySelector(this.getAttribute("href")).scrollIntoView({
            behavior: "smooth"
        });
    });
});
