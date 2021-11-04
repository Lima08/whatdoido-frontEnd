import React, { useContext, useState } from 'react';
import services from '../../services';
import TodoContext from '../../context/TodoContext';

function TaskCreator({ setNewTaskField }) {
  const { headers, todos, setTodos } = useContext(TodoContext);
  const [date, setDate] = useState('');
  const [status, setStatus] = useState('Pendente');
  const [title, setTitle] = useState('');

  async function saveTask(event) {
    event.preventDefault();

    const body = { date, status, title };
    const response = await services.addTodo(body, headers);
    const { todoId } = response;

    const newTodoList = [...todos, { ...body, todoId }];
    setTodos(newTodoList);

    setNewTaskField(false);
  }

  function taskEditor() {
    return (
      <li className='d-flex justify-content-around'>
        <h3 className=''> Nova tarefa: </h3>

        <input
          type='date'
          value={date}
          onChange={({ target }) => setDate(target.value)}
          className='btn btn-light'
        />

        <select
          value={status}
          onChange={({ target }) => setStatus(target.value)}
          className=' dropdown '
        >
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

        <label>
          <input
            type='text'
            value={title}
            onChange={({ target }) => setTitle(target.value)}
            className='btn btn-light '
          />
        </label>

        <div>
          <button
            className='btn btn-success '
            type='button'
            onClick={(e) => {
              saveTask(e);
            }}
          >
            Salvar
          </button>

          <button
            className='btn btn-warning '
            type='button'
            onClick={(e) => {
              setNewTaskField(false);
            }}
          >
            Cancelar
          </button>
        </div>
      </li>
    );
  }

  return <>{taskEditor()}</>;
}

export default TaskCreator;
