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
      <li className=' d-flex justify-content-between'>
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
            className='btn btn-success'
            type='submit'
            onClick={(e) => saveTask(e)}
          >
            Salvar
          </button>
        </div>
      </li>
    );
  }

  return todoList.map((task, index) => (
    <li
      className=' d-flex justify-content-center'
      nClick={() => taskEditor(task)}
    >
      <span>{task.status}</span>
      <span>{task.date}</span>

      <h2 className=''>{task.title}</h2>

   

      <button className='' onClick={(e) => excludeTask(task._id)}>
        X
      </button>
    </li>
  ));
}

TodoCards.propTypes = {
  todoList: PropTypes.arrayOf(PropTypes.object),
};

export default TodoCards;
