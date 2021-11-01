import React, { useContext, useState } from 'react';
import services from '../../services';
import PropTypes from 'prop-types';
import TodoContext from '../../context/TodoContext';

function TodoCard({ todoList }) {
  const { headers, setHeaders, todos, setTodos } = useContext(TodoContext);
  const { _id: id } = todoList;

  const [editMode, setEditMode] = useState(false);
  const [date, setDate] = useState(todoList.date);
  const [status, setStatus] = useState(todoList.status);
  const [title, setTitle] = useState(todoList.title);
  const [description, setDescription] = useState(todoList.description);

  async function excludeTask() {
    const result = await services.excludeTodoById(id, headers);

    if (result.error) {
      alert(`${result.error.response.data.message}`);
      return;
    }

    const newList = todos.filter((task) => task._id !== id);
    setTodos(newList);
  }

  function toDoMaker() {
    return (
      <div>
        <div>
          <p>{date}</p>
          <p>{status}</p>
        </div>

        <div>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>

        <div>
          <button onClick={() => setEditMode(true)}>Editar</button>
          <button onClick={() => excludeTask()}>X</button>
        </div>
      </div>
    );
  }

  async function saveTask() {
    await setHeaders({
      ...headers,
      method: 'PUT',
      body: JSON.stringify({ date, status, title, description }),
    });

    console.log('headers teste', headers)
    await services.updateTodoById(id, headers);
    setEditMode(false);
  }

  function taskEditor() {
    return (
      <forms>
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
            <option value='Concluido'>Concluido</option>
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
          <button onClick={() => saveTask(true)}>Save</button>
        </div>
      </forms>
    );
  }

  if (editMode) return <>{taskEditor()}</>;

  return <>{toDoMaker()}</>;
}

TodoCard.propTypes = {
  todoList: PropTypes.object,
  title: PropTypes.string,
  date: PropTypes.string,
  status: PropTypes.string,
  description: PropTypes.string,
};

export default TodoCard;
