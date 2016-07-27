var links = document.getElementById('nav-links').getElementsByTagName('a');
for(var i = 0, link; link = links[i]; i++) {
    link.onclick = showContent;
    // Hide content divs by default
    getContentDiv(link).style.display = 'none';
}
// Show the first content div
if(links.length > 0) showContent.apply(links[0]);

var current;

function showContent() {
    // hide old content
    if(current) current.style.display = 'none';
    current = getContentDiv(this);
    if(!current) return true;
    //current.innerHTML = "This is where the xml variable content should go";
    current.style.display = 'block';

    return true;
}

function getContentDiv(link) {
    var linkTo = link.getAttribute('href');
    // Make sure the link is meant to go to a div
    if(linkTo.substring(0, 2) != '#!') return;
    linkTo = linkTo.substring(2);

    return document.getElementById(linkTo);
}

