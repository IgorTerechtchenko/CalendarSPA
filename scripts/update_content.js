var calendarOptions = {local: true, addTasks: true, removeTasks: true, showMonth: true, };
function updateContent(url) {
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
      //making checkboxes checked according to options
      var optionIndex = optionsPropNames[optionsTextArray.indexOf(text)];
      var checked = '';
      if(calendarOptions[optionIndex]) {
        checked = 'checked';
      }
      optionsListElement.innerHTML += ('<li><input type="checkbox"' + checked + '>' + text + '</input></li>');
    });

    contentEl.innerHTML = '';
    contentEl.appendChild(optionsListElement);
    var checkboxes = Array.from(document.getElementsByTagName('input')); 
    //adding checkbox processing
    //iterating through checkboxes would be more complex due to closure
    optionsPropNames.forEach(function(name) {
      checkboxes[optionsPropNames.indexOf(name)].addEventListener('change', function(e) {
        calendarOptions[name] = e.target.checked; 
      });
    });
  }
  if(url === '/about') {
    var aboutEl = document.createElement('div');
    aboutEl.innerHTML = 'calendar page by Igor Terechtchenko, 2018';
    contentEl.appendChild(aboutEl);
  }
}
