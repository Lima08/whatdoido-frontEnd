import React, { useContext } from 'react';
import services from '../../services';
import PropTypes from 'prop-types';
import TodoContext from '../../context/TodoContext';

function TodoCard({ todoList }) {
  const { title, date, status, description, _id: id } = todoList;
  const { headers, todos, setTodos } = useContext(TodoContext);

  async function excludeItem() {
    console.log('teste ', todoList)
    const result = await services.excludeTodoById(id, headers);
    
    if (result.error) {
      alert(`${result.error.response.data.message}`);
      return;
    }
    
    const newList = todos.filter((item) => item._id !== id);
    setTodos(newList);
  }

  return (
    // No clicar nessa div o usuario será direcionado para a tele de nova tarefa.
    <div>
      <p>{date}</p>
      <p>{status}</p>
      <h2>{title}</h2>
      <p>{description}</p>
      <button onClick={() => excludeItem()}>X</button>
    </div>
  );
}

TodoCard.propTypes = {
  todoList: PropTypes.object,
  title: PropTypes.string,
  date: PropTypes.string,
  status: PropTypes.string,
  description: PropTypes.string,
};

export default TodoCard;
