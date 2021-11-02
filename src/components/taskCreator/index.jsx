import React, { useContext, useState } from 'react';
import services from '../../services';
import TodoContext from '../../context/TodoContext';

function TaskCreator({ setMenuField, setNewTaskField }) {
  const { headers, todos, setTodos } = useContext(TodoContext);
  const [date, setDate] = useState('');
  const [status, setStatus] = useState('Pendente');
  const [title, setTitle] = useState('Nova tarefa');
  const [description, setDescription] = useState('');

  async function saveTask(event) {
    event.preventDefault();

    const body = { date, status, title, description };
    const response = await services.addTodo(body, headers);
    const { todoId } = response;

    const newTodoList = [...todos, { ...body, todoId }];
    setTodos(newTodoList);

    setNewTaskField(false);
  }

  function taskEditor() {
    return (
      <form className=' d-flex justify-content-center'>
        <input
          type='date'
          value={date}
          onChange={({ target }) => setDate(target.value)}
          className='btn btn-light menu'
        />

        <select
          value={status}
          onChange={({ target }) => setStatus(target.value)}
          className=' dropdown menu'
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
          Titulo:
          <input
            type='text'
            value={title}
            onChange={({ target }) => setTitle(target.value)}
            className='btn btn-light menu'
          />
        </label>

        <label>
          Descrição:
          <input
            type='text'
            value={description}
            onChange={({ target }) => setDescription(target.value)}
            className='btn btn-light menu'
          />
        </label>

        <div>
          <button
            className='btn btn-success menu'
            type='submit'
            onClick={(e) => {
              setMenuField(true);
              saveTask(e);
            }}
          >
            Salvar
          </button>

          <button
            className='btn btn-warning menu'
            type='submit'
            onClick={(e) => {
              setMenuField(true);
            }}
          >
            cancelar
          </button>
        </div>
      </form>
    );
  }

  return <>{taskEditor()}</>;
}

export default TaskCreator;
