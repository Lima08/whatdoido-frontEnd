import React, { useState, useContext } from 'react';
import TodoCards from '../../components/TodoCard';
import services from '../../services';
import TodoContext from '../../context/TodoContext';
import TaskCreator from '../../components/taskCreator';
import { useNavigate } from 'react-router-dom';
import '../../styles/todoBoard.css';

function TodoBoard() {
  const navigate = useNavigate();
  const { headers, setHeaders, todos, setTodos, baseTodos, userName } =
    useContext(TodoContext);
  const [order, setOrder] = useState(true);
  const [colunm, setcolunm] = useState('title');
  const [newTaskField, setNewTaskField] = useState(false);

  function handleFilter(value) {
    if (value === 'Todas') {
      setTodos(baseTodos);
      return;
    }
    const arrayFiltered = baseTodos.filter((task) => task.status === value);
    if (!arrayFiltered.length) {
      alert(`Não existe tarefas ${value}`);
      setTodos(baseTodos);
      return;
    }

    setTodos(arrayFiltered);
  }

  function handleOrder(field) {
    setOrder(!order);
    setcolunm(field);

    const orderedArray = todos.sort((a, b) => {
      if (order) {
        return a[colunm] < b[colunm] ? -1 : 1;
      }

      return a[colunm] > b[colunm] ? -1 : 1;
    });

    setTodos(orderedArray);
  }

  async function excludeTask(id) {
    const newArray = todos.filter(({ _id }) => _id !== id);
    setTodos(newArray);

    await services.excludeTodoById(id, headers);
    return;
  }

  function menu() {
    return (
      <section className='menu'>
        <div className='card'>
          <h3>{`Olá, ${userName}!`}</h3>
          <h4>{`Você tem ${todos.length} tarefas.`}</h4>
        </div>

        <button
          className='btn btn-light menu-btn'
          onClick={(e) => {
            setNewTaskField(true);
          }}
          type='button'
        >
          Nova
        </button>

        <button
          className='btn btn-light menu-btn'
          type='button'
          onClick={() => handleOrder('title')}
        >
          Ordem alfabética
        </button>

        <button
          className='btn btn-light menu-btn'
          onClick={() => handleOrder('date')}
          type='button'
        >
          Data
        </button>

        <select
          className='dropdown menu-btn'
          onChange={({ target }) => {
            handleFilter(target.value);
          }}
        >
          <option className='btn btn-secondary dropdown-toggle' value='Todas'>
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

        <button
          className='btn btn-light menu-btn'
          onClick={() => {
            setHeaders('');
            navigate('/', { replace: true });
          }}
          type='button'
        >
          Sair
        </button>
      </section>
    );
  }

  return (
    <div className='board'>
      {menu()}
      <section className='task-area'>
        {newTaskField && <TaskCreator setNewTaskField={setNewTaskField} />}

        <ul className=''>
          <TodoCards todoList={todos} excludeTask={excludeTask} />
        </ul>
      </section>
    </div>
  );
}

export default TodoBoard;
