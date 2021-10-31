import React from 'react';
// import TodoCard from '../../components/TodoCard';
// import mockData from '../../mockData';
import { useState } from 'react';
import addNewUser from '../../services';

//  Quando logar apagar informações dos imputs e passar para o header
// 

function TodoBoard() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPAssword] = useState('');

  async function submitLogin() {
    const user = await addNewUser({name, email, password});
    console.log('Aqui é o resultado do addNewUser', user);
  }

  return (
    <>
      <form action=''>
        <input
          type='text'
          placeholder='Nome'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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

        <button onClick={submitLogin} >Logar</button>
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
