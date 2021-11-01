import React, { useContext, useState } from 'react';
import services from '../../services';
import PropTypes from 'prop-types';
import TodoContext from '../../context/TodoContext';

function TodoCard({ todoList }) {
  const { headers, todos, setTodos } = useContext(TodoContext);
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

  async function saveTask(event) {
    event.preventDefault();

    const body = { date, status, title, description };

    await services.updateTodoById(id, body, headers);
    setEditMode(false);
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
          <button type='submit' onClick={(e) => saveTask(e)}>Salvar</button>
        </div>
      </form>
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
