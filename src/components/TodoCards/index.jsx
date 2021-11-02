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
  const [task, setTask] = useState({});
  const [editMode, setEditMode] = useState(false);

  // function toDoMaker() {
  //   return (
  //     {todoList.map((date, status, title, description) => (
  //       <div>
  //         <div>
  //           <p>{date}</p>
  //           <p>{status}</p>
  //         </div>

  //         <div>
  //           <h2>{title}</h2>
  //           <p>{description}</p>
  //         </div>

  //         <div>
  //           <button onClick={() => setEditMode(true)}>Editar</button>
  //           <button onClick={() => excludeTask()}>X</button>
  //         </div>
  //       </div>

  //     ))}
  //   );
  // }

  async function saveTask(event) {
    event.preventDefault();
    const body = { date, status, title, description };
    await services.updateTodoById(task._id, body, headers);
    setEditMode(false);
    setTodos([...todoList.filter((todo) => todo._id !== task._id), { ...body, _id: task._id }]);
  }

  function taskEditor(toEdit) {
    setEditMode(true);
    //  Aqui passamos as informações a task que será editada para o scopo global
    setTask(toEdit);
    //  Setamso os valores iniciais no escopo global para ficarem visiveis para o forms.
    setDate(task.date);
    setStatus(task.status);
    setTitle(task.title);
    setDescription(task.description);
  }

  //  PAssar esse forms para um componente
  if (editMode)
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

  return todoList.map((task, index) => (
    <div key={index}>
      <div>
        <p>{task.date}</p>
        <p>{task.status}</p>
      </div>

      <div>
        <h2>{task.title}</h2>
        <p>{task.description}</p>
      </div>

      <div>
        <button onClick={(e) => excludeTask(task._id)}>X</button>
        <button onClick={() => taskEditor(task)}>Editar</button>
      </div>
    </div>
  ));
}

TodoCards.propTypes = {
  todoList: PropTypes.arrayOf(PropTypes.object),
};

export default TodoCards;
