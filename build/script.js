"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
$(document).ready(function () {
  var list = $('#list');
  var input = $('#task');
  var myAdd = $('#myAdd');
  loadHistory();
  var history = JSON.parse(localStorage.getItem('todo')) || [];
  myAdd.on('click', function () {
    if (input.val().trim() == '') {
      alert('Ви нічого не ввели');
      return;
    }
    var myTask = {
      id: Date.now(),
      text: input.val().trim()
    };
    history.push(myTask);
    localStorage.setItem('todo', JSON.stringify(history));
    addTask(myTask.text, myTask.id);
    input.val('');
  });
  list.on('click', function (event) {
    var element = event.target.parentElement;
    var elementId = Number(event.target.parentElement.id);
    if ($(event.target).hasClass('remove')) {
      var id = Number(event.target.id);
      var saved = history.filter(function (task) {
        return task.id !== id;
      });
      localStorage.setItem('todo', JSON.stringify(saved));
      history = saved;
      $(element).remove();
    } else if ($(event.target).hasClass('btnDetals')) {
      var task = history.find(function (task) {
        return task.id === elementId;
      });
      $('#modalText').text(task.text);
      $('#taskModal').modal('show');
    } else if (!list.find('input').length && $(event.target).hasClass('change')) {
      $(event.target).remove();
      var inputChange = $('<input>', {
        placeholder: 'Змінити завдання',
        value: element.firstChild.textContent
      });
      var okBtn = $('<button>', {
        "class": 'okBtn',
        text: 'OK'
      });
      $(element).append(inputChange);
      $(element).append(okBtn);
    } else if ($(event.target).hasClass('okBtn')) {
      var _inputChange = $(element).find('input');
      if (_inputChange.val().trim() !== '') {
        history = history.map(function (task) {
          if (task.id === elementId) {
            return _objectSpread(_objectSpread({}, task), {}, {
              text: _inputChange.val().trim()
            });
          }
          return task;
        });
        localStorage.setItem('todo', JSON.stringify(history));
        element.firstChild.textContent = _inputChange.val();
      }
      var changeElement = $('<button>', {
        id: elementId,
        "class": 'change',
        text: 'Змінити'
      });
      $(element).append(changeElement);
      $(_inputChange).remove();
      $(event.target).remove();
    }
  });
  function loadHistory() {
    var saved = JSON.parse(localStorage.getItem('todo')) || [];
    list.html('');
    saved.forEach(function (element) {
      addTask(element.text, element.id);
    });
  }
  function addTask(text, id) {
    var liElement = $('<li>', {
      id: id,
      "class": 'liElement',
      text: text
    });
    var detailsButton = $('<button>', {
      "class": 'btnDetals',
      text: 'Деталі'
    });
    var removeButton = $('<button>', {
      id: id,
      "class": 'remove',
      text: 'Видалити'
    });
    var changeButton = $('<button>', {
      id: id,
      "class": 'change',
      text: 'Змінити'
    });
    liElement.append(detailsButton);
    liElement.append(removeButton);
    liElement.append(changeButton);
    list.append(liElement);
  }
});