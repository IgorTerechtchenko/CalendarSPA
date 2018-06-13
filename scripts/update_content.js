function updateContent(url) {
  var calendarOptions = {};
  var contentEl = document.getElementById('content');
  contentEl.innerHTML = '';
  if(url === '/calendar') {
    var infoEl = document.createElement('div');
    drawInteractiveCalendar(2018, 6, contentEl, {'showMonth': true, 'buttons': true, 'local':true}); 
    contentEl.appendChild(infoEl);
  }
  if(url === '/settings') {
    contentEl.innerHTML = 'Settings';
    var optionsListElement = document.createElement('ul');
    var optionsTextArray = ['allow change month', 'allow add tasks', 'allow remove tasks', 'display month/year'];
    optionsTextArray.forEach(function(text) {
      optionsListElement.innerHTML += ('<li><input type="checkbox">' + text + '</input></li>');
    });
    contentEl.innerHTML = '';
    contentEl.appendChild(optionsListElement);
    [].forEach.call(document.getElementsByTagName('input'), function(inp) {
      inp.addEventListener('click', function(e) {
        calendarOptions[e.target.innerHTML] = e.target.checked; 
      });
    });
    console.log(calendarOptions);
  }
  if(url === '/about') {
    var aboutEl = document.createElement('div');
    aboutEl.innerHTML = 'calendar page by Igor Terechtchenko, 2018';
    contentEl.appendChild(aboutEl);
  }
}
