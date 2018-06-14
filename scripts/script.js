window.addEventListener("hashchange", function (ev) {handleUrl(ev.newURL);});
window.location.href = '/calendar'; 
handleUrl(window.location.href);
