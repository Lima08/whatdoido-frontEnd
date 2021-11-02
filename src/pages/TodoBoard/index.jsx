import React, { useState, useContext } from 'react';
import TodoCard from '../../components/TodoCard';
import services from '../../services';
import TodoContext from '../../context/TodoContext';
import TaskCreator from '../../components/taskCreator';

function TodoBoard() {
  const { setHeaders, todos } = useContext(TodoContext);
  const [email, setEmail] = useState('');
  const [password, setPAssword] = useState('');

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

  function menu() {
    return (
      <div>
        <label>
          status
          <select
          // value={taskStatusFilter}
          // onChange={({ target }) => filterByStatus(target.value, todosRender, setTodosRender)}
          >
            <option value=''>Todas</option>
            <option value='Pendente'>Pendente</option>
            <option value='Em andamento'>Em andamento</option>
            <option value='Concluído'>Concluido</option>
          </select>
        </label>
        <button type='button'>Ordem alfabética</button>
        <br />
        <button type='button'>Nova</button>
      </div>
    );
  }

  return (
    <>
      <div>
        {formLogin()}
        {menu()}
        <TaskCreator />
        {todos.map((todo, index) => (
          <TodoCard key={index} todoList={todo} />
        ))}
      </div>
    </>
  );
}

export default TodoBoard;
