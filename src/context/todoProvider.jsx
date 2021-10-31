import TodoContext from './TodoContext';
import { useState, useEffect } from 'react';
import services from '../services';

function TodoProvider({ children }) {
  const [todos, setTodos] = useState([]);
  const [token, setToken] = useState('');

  const config = {
    headers: {
      authorization: token,
    },
  };

  useEffect(() => {
    async function getTodos() {
      const result = await services.getAllTodo(config);

      if (result.error) {
        alert(`${result.error}`);
        return;
      }

      setTodos(result.data);
    }

    getTodos();
    console.log('teste se esta rodando')
  }, [token]);

  const storage = {
    todos,
    setToken,
    setTodos,
  };

  return (
    <TodoContext.Provider value={storage}>{children}</TodoContext.Provider>
  );
}

export default TodoProvider;
