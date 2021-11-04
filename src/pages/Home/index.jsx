import React from 'react';
import TodoProvider from '../../context/todoProvider';
import TodoBoard from '../TodoBoard/index';
import '../../styles/home.css';

function Home() {
  return (
    <TodoProvider>
      <div className='home'>
        <div className='header'>
          <h1>What do I do?</h1>
          <input className='header-search' type='text' placeholder='   Pesquisa...' />
        </div>

        <TodoBoard />
      </div>
    </TodoProvider>
  );
}

export default Home;

// {/* ter um componente cabeçario */}
// {/* ter um componente painel com nova tarefa, status, forma de ordenar alfabetica e por data  */}
// {/* Ter ium componente TodoBoard que renderiza subcomponentes Todo  */}
