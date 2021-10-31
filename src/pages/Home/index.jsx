import React from 'react';
import TodoProvider from '../../context/todoProvider';
import TodoBoard from '../TodoBoard/index';

function Home() {
  return (
    <TodoProvider>
      <TodoBoard />
    </TodoProvider>
  );
}

export default Home;

// {/* ter um componente cabeçario */}
// {/* ter um componente painel com nova tarefa, status, forma de ordenar alfabetica e por data  */}
// {/* Ter ium componente TodoBoard que renderiza subcomponentes Todo  */}
