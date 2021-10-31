import React from 'react';
// import TodoCard from '../../components/TodoCard';
// import mockData from '../../mockData';
import { useState, useContext } from 'react';
import services from '../../services';
import TodoContext from '../../context/TodoContext';

//  Quando logar apagar informações dos imputs e passar para o header
//

function TodoBoard() {
  const { setToken } = useContext(TodoContext);
  const [email, setEmail] = useState('');
  const [password, setPAssword] = useState('');

  async function submitLogin() {
    const result = await services.authentication({ email, password });
    if (!result.data) alert('Erro de conexão! Tente novamente');
    setToken(result.data.token);
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

        <button type='button' onClick={() => submitLogin()}>
          Logar
        </button>
      </form>

      {/* <div>
        {mockData.map((todo, index) => (
          <TodoCard key={index} todoList={todo} />
        ))}
      </div> */}
    </>
  );
}

export default TodoBoard;
