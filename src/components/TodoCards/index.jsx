import React, { useState } from 'react';
import PropTypes from 'prop-types';

function TodoCards({todoList, excludeTask}) {
  const [editMode, setEditMode] = useState(false);
  // const [date, setDate] = useState(task.date);
  // const [status, setStatus] = useState(task.status);
  // const [title, setTitle] = useState(task.title);
  // const [description, setDescription] = useState(task.description);



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
    // event.preventDefault();

    // const body = { date, status, title, description };

    // await services.updateTodoById(id, body, headers);
    // setEditMode(false);
  }

  function taskEditor() {
    // return (
    //   <form>
    //     <input
    //       type='date'
    //       value={date}
    //       onChange={({ target }) => setDate(target.value)}
    //     />

    //     <label>
    //       status:
    //       <select
    //         value={status}
    //         onChange={({ target }) => setStatus(target.value)}
    //       >
    //         <option value='Pendente'>Pendente</option>
    //         <option value='Em andamento'>Em andamento</option>
    //         <option value='Concluído'>Concluido</option>
    //       </select>
    //     </label>

    //     <label>
    //       Titulo:
    //       <input
    //         type='text'
    //         value={title}
    //         onChange={({ target }) => setTitle(target.value)}
    //       />
    //     </label>

    //     <label>
    //       Descrição:
    //       <input
    //         type='text'
    //         value={description}
    //         onChange={({ target }) => setDescription(target.value)}
    //       />
    //     </label>

    //     <div>
    //       <button type='submit' onClick={(e) => saveTask(e)}>
    //         Salvar
    //       </button>
    //     </div>
    //   </form>
    // );
  }

  if (editMode) return <>{taskEditor()}</>;

  return (

    todoList.map((task, index) => (
      <div key={index}>
        <div>
          <p>{task.date}</p>
          <p>{task.status}</p>
        </div>

        <div>
          <h2 >{task.title}</h2>
          <p>{task.description}</p>
        </div>

        <div>
          <button onClick={(e) => excludeTask(task._id)}>X</button>
        </div>
      </div>

    ))
  );
}

TodoCards.propTypes = {
  todoList: PropTypes.object,
};

export default TodoCards;
