import TodoContext from './TodoContext';
import { useState, useEffect } from 'react';
import services from '../services';

function TodoProvider({ children }) {
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

      setTodos(result.data);
      return;
    }

    if (authorization !== '') {
      getTodos();
    }
  }, [headers]);

  function alphabeticalSort() {
    console.log('antes do sorter', todos)
    const orderedArray = todos.sort(function (y, x) {
      let a = x.title.toUpperCase();
      let b = y.title.toUpperCase();

      return x === y ? 0 : a > b ? 1 : -1;
    });
    console.log('pos do sorter', todos)

    setTodos(orderedArray);
  }

  const storage = {
    todos,
    setTodos,
    headers,
    setHeaders,
    alphabeticalSort,
  };

  return (
    <TodoContext.Provider value={storage}>{children}</TodoContext.Provider>
  );
}

export default TodoProvider;
