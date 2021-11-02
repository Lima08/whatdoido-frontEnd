import TodoContext from './TodoContext';
import { useState, useEffect } from 'react';
import services from '../services';

function TodoProvider({ children }) {
  const [baseTodos, setBaseTodos] = useState([]);
  const [todos, setTodos] = useState([]);
  const [headers, setHeaders] = useState({
    headers: { 'Content-Type': 'application/json', authorization: '' },
  });

  useEffect(() => {
    const {
      headers: { authorization },
    } = headers;

    async function getTodos() {
      const result = await services.getAllTodo(headers);

      if (result.error) {
        alert(`${result.error.response.data.message}`);
        return;
      }

      setBaseTodos(result.data);
      setTodos(result.data);
      return;
    }

    if (authorization !== '') {
      getTodos();
    }
  }, [headers]);

  const storage = {
    baseTodos,
    todos,
    setTodos,
    headers,
    setHeaders,
  };

  return (
    <TodoContext.Provider value={storage}>{children}</TodoContext.Provider>
  );
}

export default TodoProvider;
