$(document).ready(function () {
  let list = $('#list')
  let input = $('#task')
  let myAdd = $('#myAdd')

  loadHistory()
  let history = JSON.parse(localStorage.getItem('todo')) || []

  myAdd.on('click', function () {
    if (input.val().trim() == '') {
      alert('Ви нічого не ввели')
      return
    }

    let myTask = { id: Date.now(), text: input.val().trim() }
    history.push(myTask)
    localStorage.setItem('todo', JSON.stringify(history))
    addTask(myTask.text, myTask.id)
    input.val('')
  })

  list.on('click', (event) => {
    let element = event.target.parentElement
    let elementId = Number(event.target.parentElement.id)

    if ($(event.target).hasClass('remove')) {
      const id = Number(event.target.id)
      const saved = history.filter((task) => task.id !== id)
      localStorage.setItem('todo', JSON.stringify(saved))
      history = saved
      $(element).remove()
    } else if ($(event.target).hasClass('btnDetals')) {
      let task = history.find((task) => task.id === elementId)
      $('#modalText').text(task.text)
      $('#taskModal').modal('show')
    } else if (
      !list.find('input').length &&
      $(event.target).hasClass('change')
    ) {
      $(event.target).remove()

      let inputChange = $('<input>', {
        placeholder: 'Змінити завдання',
        value: element.firstChild.textContent,
      })
      let okBtn = $('<button>', {
        class: 'okBtn',
        text: 'OK',
      })
      $(element).append(inputChange)
      $(element).append(okBtn)
    } else if ($(event.target).hasClass('okBtn')) {
      let inputChange = $(element).find('input')
      if (inputChange.val().trim() !== '') {
        history = history.map((task) => {
          if (task.id === elementId) {
            return { ...task, text: inputChange.val().trim() }
          }
          return task
        })
        localStorage.setItem('todo', JSON.stringify(history))
        element.firstChild.textContent = inputChange.val()
      }

      let changeElement = $('<button>', {
        id: elementId,
        class: 'change',
        text: 'Змінити',
      })
      $(element).append(changeElement)

      $(inputChange).remove()
      $(event.target).remove()
    }
  })

  function loadHistory() {
    let saved = JSON.parse(localStorage.getItem('todo')) || []
    list.html('')
    saved.forEach((element) => {
      addTask(element.text, element.id)
    })
  }

  function addTask(text, id) {
    let liElement = $('<li>', {
      id,
      class: 'liElement',
      text: text,
    })

    let detailsButton = $('<button>', {
      class: 'btnDetals',
      text: 'Деталі',
    })

    let removeButton = $('<button>', {
      id,
      class: 'remove',
      text: 'Видалити',
    })

    let changeButton = $('<button>', {
      id,
      class: 'change',
      text: 'Змінити',
    })

    liElement.append(detailsButton)
    liElement.append(removeButton)
    liElement.append(changeButton)
    list.append(liElement)
  }
})
