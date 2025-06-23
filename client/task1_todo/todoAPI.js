const baseURL = 'http://localhost:5000'

async function createTodo(todo) {
  const response = await axios.post(`${baseURL}/create`, todo)
  return response.data
}

async function getAllTodo() {
  const response = await axios.get(`${baseURL}/getAll`)
  return response.data
}

async function putTodo(id, todo) {
  const response = await axios.put(`${baseURL}/update/${id}`, todo)
  return response.data
}

async function deleteTodo(id) {
  const response = await axios.delete(`${baseURL}/delete/${id}`)
  return response.data
}
