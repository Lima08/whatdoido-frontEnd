import React, { useContext } from 'react';
import TodoBoard from '../TodoBoard';
import '../../styles/home.css';
import TodoContext from '../../context/TodoContext';

function Home() {
  const { setTodos, baseTodos } = useContext(TodoContext);

  function filterByInput(text) {
    const filteredArray = baseTodos.filter((task) => task.title.includes(text));
    setTodos(filteredArray);
    return;
  }

  return (
    <div className='home'>
      <div className='header'>
        <h1>What do I do?</h1>
        <input
          className='header-search'
          type='text'
          placeholder='   Pesquisa...'
          onChange={({ target }) => filterByInput(target.value)}
        />
      </div>
      <TodoBoard />
    </div>
  );
}

export default Home;

