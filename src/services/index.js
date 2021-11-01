import axios from 'axios';

async function authentication(body) {
  const token = await axios
    .post('http://localhost:3000/login', body)
    .then((response) => response)
    .catch((error) => {
      return { error };
    });
  return token;
}

async function getAllTodo(headers) {
  const result = await axios
    .get('http://localhost:3000/todos', headers)
    .then((response) => response)
    .catch((error) => {
      return { error };
    });
  return result;
}

async function excludeTodoById(id, headers) {
  const result = await axios
    .get(`http://localhost:3000/todo/${id}`, headers)
    .then((response) => response)
    .catch((error) => {
      return { error };
    });
  return result;
}

const services = {
  authentication,
  getAllTodo,
  excludeTodoById,
};
export default services;
