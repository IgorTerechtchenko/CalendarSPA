//var el = document.getElementById('cal');
//var infoEl = document.getElementById('calendarInfo');
//drawInteractiveCalendar(2012, 1, el, {'showMonth': true, 'buttons': true}); 
window.addEventListener("hashchange", function (ev) {handleUrl(ev.newURL);});
handleUrl(window.location.href);
