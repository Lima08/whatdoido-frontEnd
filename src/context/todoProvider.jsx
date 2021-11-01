import TodoContext from './TodoContext';
import { useState, useEffect } from 'react';
import services from '../services';

function TodoProvider({ children }) {
  const [todos, setTodos] = useState([]);
  const [headers, setHeaders] = useState({ headers: { 'Content-Type': 'application/json',authorization: '' } });

  useEffect(() => {
    async function getTodos() {
      const result = await services.getAllTodo(headers);

      if (result.error) {
      alert(`${result.error.response.data.message}`);
        return;
      }

      setTodos(result.data);
    }

    getTodos();
  }, [headers]);

  const storage = {
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
