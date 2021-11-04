import React from 'react';
import TodoBoard from '../TodoBoard';
import '../../styles/home.css';

function Home() {
  return (
    <div className='home'>
      <div className='header'>
        <h1>What do I do?</h1>
        <input
          className='header-search'
          type='text'
          placeholder='   Pesquisa...'
        />
      </div>
      <TodoBoard />
    </div>
  );
}

export default Home;

// {/* ter um componente cabeçario */}
// {/* ter um componente painel com nova tarefa, status, forma de ordenar alfabetica e por data  */}
// {/* Ter ium componente TodoBoard que renderiza subcomponentes Todo  */}
