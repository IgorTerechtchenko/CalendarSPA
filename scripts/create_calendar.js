function drawCalendar(year, month, htmlEl) {
  //it uses 1-based month count in arguments
  //using linux 'cal' as an example
  var table =
    '<table><tr><th>Mo</th><th>Tu</th><th>We</th><th>Th</th><th>Fr</th><th>Sa</th><th>Su</th></tr>';

  var date = new Date(year, month - 1);

  //adding blank cells for missing weekdays
  if (date.getDay() !== 1 && date.getDay()) {
    table += '<tr>';
    for (var i = 1; i < date.getDay(); i++) {
      table += '<td></td>';
    }
  }
  if (date.getDay() === 0) {
    table += '<tr>';
    for (var i = 6; i > date.getDay(); i--) {
      table += '<td></td>';
    }
  }

  while (date.getMonth() == month - 1) {
    //starting a row before monday
    if (date.getDay() == 1) {
      table += '<tr>';
    }
    table += '<td class="' + year + ';' + (month) + ';' + date.getDate() +'">' + date.getDate() + '</td>';
    //closing a row after sunday
    if (date.getDay() === 0) {
      table += '</tr>'; //
    }
    date.setDate(date.getDate() + 1);
  }

  if (date.getDay() != 0) {
    for(var i = 8 - date.getDay(); i > 0; i--) {
      table += '<td></td>';
    }
    table += '</tr>';
  } else {
    table += '<td></td>';
    table += '</tr>';
  }

  htmlEl.innerHTML = table + '</table>';
  var table = htmlEl.getElementsByTagName('table')
}

function drawInteractiveCalendar(year, month, el, options) {
  //using 1-based month count
  if(!options) {
    var options = {};
  }
  var currentMonth = month;
  var currentDate = new Date(year, month);
  var innerEl = document.createElement('div');
  innerEl.className = 'wrapper';
  var header = document.createElement('h');
  if(options['showMonth']) {
    var d = document.createTextNode(' ' + currentDate.getFullYear() + ', ' + (currentDate.getMonth()) + ' ');
  } else {
    var d = document.createTextNode('      ');
  }
  var storage = window.localStorage;
  var infoArea = document.createElement('div');
  header.appendChild(d);
  infoArea.innerHTML += 'info <br>'

  //creating buttons
  if(options['changeMonth']) {
    var leftButton = document.createElement('button');
    var rightButton = document.createElement('button');
    var r = document.createTextNode('>');
    var l = document.createTextNode('<');
    rightButton.appendChild(r);
    leftButton.appendChild(l);
    rightButton.addEventListener('click', function() {
      redrawCalendar('+');
    });
    leftButton.addEventListener('click', function() {
      redrawCalendar('-');
    });
    el.appendChild(leftButton);
    el.appendChild(header);
    el.appendChild(rightButton);
  }
  //adding month display if buttons are not required
  if(!options['changeMonth']) {
    el.appendChild(header);
  }
  drawCalendar(currentDate.getFullYear(), currentDate.getMonth(), innerEl);
  el.appendChild(innerEl);
  el.appendChild(infoArea);
  addDayClickListeners();
  fillTableCells();
  addRemoveTaskButtons();
  addDateInfoField();

  function changeDate(direction) {
    if (direction === '+') {
      currentMonth++;
      currentDate.setMonth(currentMonth);
      currentMonth = currentDate.getMonth();
    }
    if (direction === '-') {
      currentMonth--;
      currentDate.setMonth(currentMonth);
      currentMonth = currentDate.getMonth();
    }
  }

  function redrawCalendar(direction) {
    changeDate(direction);
    drawCalendar(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      innerEl,
      options
    );
    header.removeChild(header.firstChild);
    //adding 1 to month because now working with js date representation
    if(options['showMonth']) {
      d = document.createTextNode(
          ' ' +
          currentDate.getFullYear() +
          ', ' +
          (currentDate.getMonth() + 1) +
          ' '
      );
    } else {
      d = document.createTextNode('     ');
    }
    header.appendChild(d);
    addDayClickListeners();
    fillTableCells();
    addRemoveTaskButtons();
  }

  function addDayClickListeners() {
    if(!options['addTasks']) {return};
    var daysArray = el.getElementsByTagName('div')[0].getElementsByTagName('td');
    for(var i = 0; i < daysArray.length; i++) {
      if(daysArray[i].innerHTML) {
        daysArray[i].addEventListener('click', addNote); 
      }
    }
  }

  function addNote(e) {
    var info;
    if(options['local']) {
      if(event.target.innerHTML) {
        info = window.prompt('add info:', e.target.innerHTML.split('<br>')[1]); 
        if(info != null) {
          storage.setItem(e.target.className, info);
          e.target.innerHTML = e.target.innerHTML.split('<br>')[0]
          e.target.innerHTML += '<br>' + info; 
        }
      }
    }
    if(options['removeTasks']) {
      addRemoveButton(e.target);
    }
  }
  
  function addDateInfoField() {
    for(var i = 0; i < storage.length; i++) {
      var key = storage.key(i);
      infoArea.innerHTML += key + ' ' + storage.getItem(key) + '<br>'; 
    }
  }

  function fillTableCells() {
    var cells = innerEl.getElementsByTagName('table')[0].getElementsByTagName('td');
    cells = Array.from(cells);
    cells.forEach(function(cell) {
      var info = storage.getItem(cell.classList) ? storage.getItem(cell.classList) : false;
      cell.innerHTML += ('<br>' + (info || ''));
    });
  }

  function addRemoveTaskButtons() {
    if(!options['removeTasks']) {return;}
    var cells = innerEl.getElementsByTagName('table')[0].getElementsByTagName('td');
    var button;
    cells = Array.from(cells);
    cells.forEach(function(cell) {
      addRemoveButton(cell);
    });
  }

  function addRemoveButton(cell) {
    var info = storage.getItem(cell.classList) ? storage.getItem(cell.classList) : false;
    if(info) {
      button = document.createElement('button');
      button.innerHTML = 'x'
      button.className = cell.className + ' button';
      button.addEventListener('click', function(e) {
        cell.innerHTML = cell.innerHTML.split('<br>')[0];
        storage.removeItem(cell.className);
        e.setPropagation(); //no bubbling for nested button
      });
      cell.appendChild(button);
    }
  }
}
