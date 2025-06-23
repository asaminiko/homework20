$(document).ready(function () {
  let list = $('#list')
  let input = $('#task')
  let myAdd = $('#myAdd')
  loadHistory()
  myAdd.on('click', async function () {
    if (input.val().trim() == '') {
      alert('Ви нічого не ввели')
      return
    }
    let myTask = { id: Date.now(), text: input.val().trim() }
    await createTodo(myTask)
    addTask(myTask.text, myTask.id)

    input.val('')
  })

  list.on('click', (event) => {
    let element = event.target.parentElement
    let elementId = Number(event.target.parentElement.id)

    if ($(event.target).hasClass('remove')) {
      const id = Number(event.target.id)
      deleteTodo(id)
      $(element).remove()
    } else if ($(event.target).hasClass('btnDetals')) {
      detalsShow(elementId)
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
        putTodo(elementId, { text: inputChange.val() })
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

  async function loadHistory() {
    const saved = await getAllTodo()
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
async function detalsShow(id) {
  const list = await getAllTodo()
  const task = list.find((task) => task.id === id)
  if (task) {
    $('#modalText').text(task.text)
    $('#taskModal').modal('show')
  } else {
    alert('Завдання не знайдено')
  }
}
