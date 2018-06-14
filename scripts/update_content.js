function updateContent(url) {
  var calendarOptions = {};
  var contentEl = document.getElementById('content');
  contentEl.innerHTML = '';
  if(url === '/calendar') {
    var infoEl = document.createElement('div');
    drawInteractiveCalendar(2018, 6, contentEl, calendarOptions); 
    contentEl.appendChild(infoEl);
  }
  if(url === '/settings') {
    contentEl.innerHTML = 'Settings';
    var optionsListElement = document.createElement('ul');
    var optionsTextArray = ['allow change month', 'allow add tasks', 'allow remove tasks', 'display month/year'];
    var optionsPropNames = ['changeMonth', 'addTasks', 'removeTasks', 'showMonth'];
    optionsTextArray.forEach(function(text) {
      optionsListElement.innerHTML += ('<li><input type="checkbox">' + text + '</input></li>');
    });
    contentEl.innerHTML = '';
    contentEl.appendChild(optionsListElement);
    var checkboxes = Array.from(document.getElementsByTagName('input')); 
    for(var i = 0; i < optionsPropNames.length - 1; i++) {
      checkboxes[i].addEventListener('change', function(e) {
        calendarOptions[optionsPropNames[i]] = e.target.checked; 
        console.log(checkboxes[i], optionsPropNames[i]);
        console.log(calendarOptions);
      });
    };
    console.log(calendarOptions);
  }
  if(url === '/about') {
    var aboutEl = document.createElement('div');
    aboutEl.innerHTML = 'calendar page by Igor Terechtchenko, 2018';
    contentEl.appendChild(aboutEl);
  }
}
