import React, { useState, useContext } from 'react';
import services from '../../services';
import TodoContext from '../../context/TodoContext';
import PropTypes from 'prop-types';

function TodoCards({ todoList, excludeTask }) {
  const { headers, setTodos } = useContext(TodoContext);
  const [date, setDate] = useState('');
  const [status, setStatus] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [taskInEditing, setTaskInEditing] = useState({});
  const [editMode, setEditMode] = useState(false);

  async function saveTask(event) {
    event.preventDefault();
    const body = { date, status, title, description };
    await services.updateTodoById(taskInEditing._id, body, headers);
    setEditMode(false);
    setTodos([
      ...todoList.filter((todo) => todo._id !== taskInEditing._id),
      { ...body, _id: taskInEditing._id },
    ]);
  }

  function taskEditor(editing) {
    setTaskInEditing(editing);
    //  Aqui passamos as informações a task que será editada para o scopo global
    //  Setamso os valores iniciais no escopo global para ficarem visiveis para o forms.
    setDate(editing.date);
    setStatus(editing.status);
    setTitle(editing.title);
    setDescription(editing.description);
    setEditMode(editing);
  }

  //  Passar esse forms para um componente
  if (editMode) {
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

  return todoList.map((task, index) => (
    <div key={index} className='card '>
      <div className='card-header d-flex justify-content-between'>
        <span>{task.status}</span>
        <span>{task.date}</span>
      </div>
      <div className='card-body'>
        <h2 className='card-title'>{task.title}</h2>
        <p className='card-text'>{task.description}</p>
      </div>
      <div className='card-header d-flex justify-content-between'>
        <button className='btn btn-warning' onClick={() => taskEditor(task)}>
          Editar
        </button>
        <button
          className='btn btn-danger'
          onClick={(e) => excludeTask(task._id)}
        >
          X
        </button>
      </div>
    </div>
  ));
}

TodoCards.propTypes = {
  todoList: PropTypes.arrayOf(PropTypes.object),
};

export default TodoCards;
