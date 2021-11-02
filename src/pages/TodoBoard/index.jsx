import React, { useState, useContext } from 'react';
import TodoCards from '../../components/TodoCard';
import services from '../../services';
import TodoContext from '../../context/TodoContext';
import TaskCreator from '../../components/taskCreator';
import '../../styles/todoBoard.css';

function TodoBoard() {
  const { headers, setHeaders, todos, setTodos, baseTodos } = useContext(
    TodoContext
  );
  const [email, setEmail] = useState('');
  const [password, setPAssword] = useState('');
  const [newTaskField, setNewTaskField] = useState(false);
  const [order, setOrder] = useState(1);
  const [colunm, setcolunm] = useState('title');

  async function submitLogin(event) {
    event.preventDefault();
    const result = await services.authentication({ email, password });

    if (result.error) {
      alert(`${result.error.response.data.message}`);
      return;
    }
    setHeaders({
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        authorization: result.data.token,
      },
    });
  }

  function formLogin() {
    return (
      <form action=''>
        <input
          type='email'
          placeholder='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type='password'
          placeholder='senha'
          value={password}
          onChange={(e) => setPAssword(e.target.value)}
        />

        <button type='submit' onClick={(e) => submitLogin(e)}>
          Logar
        </button>
      </form>
    );
  }

  function handleFilter(statusFilter) {
    const arrayFiltered = baseTodos.filter(
      (task) => task.status === statusFilter
    );
    if (!arrayFiltered.length) {
      setTodos(baseTodos);
      return;
    }

    setTodos(arrayFiltered);
  }

  function handleOrder(field) {
    setOrder(-order);
    setcolunm(field);
    setTodos(
      todos.sort((a, b) => {
        return a[colunm] < b[colunm] ? -order : order;
      })
    );
  }

  async function excludeTask(id) {
    const newArray = todos.filter(({ _id }) => _id !== id);
    setTodos(newArray);

    await services.excludeTodoById(id, headers);
    return;
  }

  function menu() {
    return (
      <div className='cardd'>
        <label>
          Status:
          <select
            className='dropdown'
            onChange={({ target }) => handleFilter(target.value)}
          >
            <option className='btn btn-secondary dropdown-toggle' value=''>
              Todas
            </option>
            <option
              className='btn btn-secondary dropdown-toggle'
              value='Pendente'
            >
              Pendente
            </option>
            <option
              className='btn btn-secondary dropdown-toggle'
              value='Em andamento'
            >
              Em andamento
            </option>
            <option
              className='btn btn-secondary dropdown-toggle'
              value='Concluído'
            >
              Concluido
            </option>
          </select>
        </label>

        <button type='button' onClick={(e) => handleOrder('title')}>
          Ordem alfabética
        </button>
        <button onClick={(e) => handleOrder('date')} type='button'>
          status
        </button>
        <button onClick={(e) => handleOrder('date')} type='button'>
          Data
        </button>
        <br />
        <button onClick={(e) => setNewTaskField(!newTaskField)} type='button'>
          Nova
        </button>
      </div>
    );
  }

  return (
    <div>
      {formLogin()}
      {menu()}
      {newTaskField && <TaskCreator setNewTaskField={setNewTaskField} />}

      <div className='d-flex flex-wrap justify-content-around'>
        <TodoCards todoList={todos} excludeTask={excludeTask} />
      </div>
    </div>
  );
}

export default TodoBoard;
