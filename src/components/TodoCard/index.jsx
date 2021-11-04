import React, { useState, useContext } from 'react';
import services from '../../services';
import TodoContext from '../../context/TodoContext';
import PropTypes from 'prop-types';

function TodoCards({ todoList, excludeTask }) {
  const { headers, setTodos } = useContext(TodoContext);
  const [date, setDate] = useState('');
  const [status, setStatus] = useState('');
  const [title, setTitle] = useState('');
  const [taskInEditing, setTaskInEditing] = useState({});
  const [editMode, setEditMode] = useState(false);

  async function saveTask(event) {
    event.preventDefault();
    const body = { date, status, title };
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
    //  Setamos os valores iniciais no escopo global para ficarem visiveis para o forms.
    setDate(editing.date);
    setStatus(editing.status);
    setTitle(editing.title);
    setEditMode(true);
  }

  //  Passar esse forms para um componente
  if (editMode) {
    return (
      <li className='d-flex justify-content-center task'>
        <input
          type='date'
          value={date}
          onChange={({ target }) => setDate(target.value)}
          className='btn btn-light option-task'
        />

        <select
          value={status}
          onChange={({ target }) => setStatus(target.value)}
          className=' dropdown option-task'
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
            className='btn btn-light option-task'
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

          <button
            className='btn btn-warning option-task'
            type='button'
            onClick={() => setEditMode(false)}
          >
            cancelar
          </button>
        </div>
      </li>
    );
  }

  return todoList.map((task, index) => (
    <li key={index} className='d-flex justify-content-center task'>
      <span className='option-task'>{task.date}</span>
      <span className='option-task '>{task.status}</span>
      <h2 className='option-task'>{task.title}</h2>

      <button
        className='btn btn-warning option-task option-task'
        onClick={() => taskEditor(task)}
      >
        Editar
      </button>

      <button
        className='btn btn-danger option-task '
        onClick={(e) => excludeTask(task._id)}
      >
        X
      </button>
    </li>
  ));
}

TodoCards.propTypes = {
  todoList: PropTypes.arrayOf(PropTypes.object),
};

export default TodoCards;
