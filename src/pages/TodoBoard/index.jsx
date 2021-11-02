import React, { useState, useContext } from 'react';
import TodoCards from '../../components/TodoCard';
import services from '../../services';
import TodoContext from '../../context/TodoContext';
import TaskCreator from '../../components/taskCreator';

function TodoBoard() {
  const { headers, setHeaders, todos, setTodos, baseTodos } = useContext(
    TodoContext
  );
  const [email, setEmail] = useState('');
  const [password, setPAssword] = useState('');
  const [newTaskField, setNewTaskField] = useState(false);
  const [order, setOrder] = useState(1);
  const [colunm, setcolunm] = useState('title');
  const [statusFilter, setStatusFilter] = useState('Todas');
  const [menuField, setMenuField] = useState(false);
  const [loginField, setLoginField] = useState(true);

  async function submitLogin(event) {
    event.preventDefault();
    const result = await services.authentication({ email, password });
    console.log(result);

    if (result.error) {
      alert(`${result.error.response.data.message}`);
      return;
    }

    setLoginField(false);
    setMenuField(true);
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
        <label>
          E-mail
          <input
            type='email'
            placeholder='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='form-control menu'
          />
        </label>

        <label>
          Senha:
          <input
            type='password'
            placeholder='senha'
            value={password}
            onChange={(e) => setPAssword(e.target.value)}
            className='form-control menu'
          />
        </label>

        <button
          className='btn btn-success menu'
          type='submit'
          onClick={(e) => submitLogin(e)}
        >
          Logar
        </button>
      </form>
    );
  }

  function handleFilter(value) {
    setStatusFilter(value);
    const arrayFiltered = baseTodos.filter(
      (task) => task.status === statusFilter
    );
    if (!arrayFiltered.length) {
      alert(`Não existe tarefas ${value}`);
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
      <div className=' d-flex justify-content-center'>
        <select
          className=' dropdown'
          onChange={({ target }) => {
            setOrder(target.value);
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
          className='btn btn-light menu'
          type='button'
          onClick={(e) => handleOrder('title')}
        >
          Ordem alfabética
        </button>

        <button
          className='btn btn-light menu'
          onClick={(e) => handleOrder('date')}
          type='button'
        >
          Data
        </button>

        <button
          className='btn btn-light menu'
          onClick={(e) => {
            setMenuField(!menuField);
            setNewTaskField(!newTaskField);
          }}
          type='button'
        >
          Nova
        </button>
      </div>
    );
  }

  return (
    <div>
      {loginField && formLogin()}
      {menuField && menu()}
      {newTaskField && (
        <TaskCreator
          setMenuField={setMenuField}
          setNewTaskField={setNewTaskField}
        />
      )}

      <div className='d-flex flex-wrap justify-content-around'>
        <TodoCards todoList={todos} excludeTask={excludeTask} />
      </div>
    </div>
  );
}

export default TodoBoard;
