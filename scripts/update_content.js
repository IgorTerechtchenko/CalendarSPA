function updateContent(url) {
  var contentEl = document.getElementById('content');
  contentEl.innerHTML = '';
  if(url === '/calendar') {
    var infoEl = document.createElement('div');
    drawInteractiveCalendar(2018, 6, contentEl, {'showMonth': true, 'buttons': true, 'local':true}); 
    contentEl.appendChild(infoEl);
  }
  if(url === '/settings') {
    contentEl.innerHTML = 'Settings';
  }
  if(url === '/about') {
    var aboutEl = document.createElement('div');
    aboutEl.innerHTML = 'calendar page by Igor Terechtchenko, 2018';
    contentEl.appendChild(aboutEl);
  }
}
