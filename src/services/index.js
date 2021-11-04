import axios from 'axios';
const URL = 'https://lima-whatdoido.herokuapp.com/';

async function newUser(userName, email, password ) {
  const token = await axios.post(`${URL}users`, {name: userName, email, password}).catch((error) => {
    return { error };
  });
  return token;
}

async function authentication(body) {
  const token = await axios.post(`${URL}login`, body).catch((error) => {
    return { error };
  });
  return token;
}

async function addTodo(body, headers) {
  const token = await axios.post(`${URL}todo`, body, headers).catch((error) => {
    return { error };
  });
  return token;
}

async function getAllTodo(headers) {
  const result = await axios.get(`${URL}todos`, headers).catch((error) => {
    return { error };
  });
  return result;
}

async function excludeTodoById(id, headers) {
  const result = await axios
    .delete(`${URL}todo/${id}`, headers)
    .catch((error) => {
      return { error };
    });
  return result;
}

async function updateTodoById(id, body, headers) {
  try {
    const result = await axios.put(`${URL}todo/${id}`, body, headers);
    return result;
  } catch (error) {
    return { error };
  }
}

const services = {
  newUser,
  authentication,
  addTodo,
  getAllTodo,
  excludeTodoById,
  updateTodoById,
};
export default services;
