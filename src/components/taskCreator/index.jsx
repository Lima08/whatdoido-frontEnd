import React, { useContext, useState } from 'react';
import services from '../../services';
import TodoContext from '../../context/TodoContext';

function TaskCreator() {
  const { headers } = useContext(TodoContext);
  const [date, setDate] = useState('');
  const [status, setStatus] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  async function saveTask(event) {
    event.preventDefault();

    const body = { date, status, title, description };
    await services.addTodo(body, headers);
  }

  function taskEditor() {
    return (
      <form>
        <input
          type='date'
          value={date}
          onChange={({ target }) => setDate(target.value)}
        />

        <label>
          status:
          <select
            value={status}
            onChange={({ target }) => setStatus(target.value)}
          >
            <option value='Pendente'>Pendente</option>
            <option value='Em andamento'>Em andamento</option>
            <option value='Concluído'>Concluido</option>
          </select>
        </label>

        <label>
          Titulo:
          <input
            type='text'
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </label>

        <label>
          Descrição:
          <input
            type='text'
            value={description}
            onChange={({ target }) => setDescription(target.value)}
          />
        </label>

        <div>
          <button type='submit' onClick={(e) => saveTask(e)}>
            Salvar
          </button>
        </div>
      </form>
    );
  }

  return <>{taskEditor()}</>;
}

export default TaskCreator;
