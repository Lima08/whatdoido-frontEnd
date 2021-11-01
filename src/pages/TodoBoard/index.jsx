import React, { useState, useContext } from 'react';
import TodoCard from '../../components/TodoCard';
import services from '../../services';
import TodoContext from '../../context/TodoContext';

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

  return (
    <>
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

      <div>
        {todos.map((todo, index) => (
          <TodoCard key={index} todoList={todo} />
        ))}
      </div>
    </>
  );
}

export default TodoBoard;
