import React from 'react';
import PropTypes from 'prop-types';

function TodoCard({ todoList }) {
  const { title, date, status, description } = todoList;

  return (
    // No clicar nessa div o usuario será direcionado para a tele de nova tarefa.
    <div>
      <p>{date}</p>
      <p>{status}</p>
      <h2>{title}</h2>
      <p>{description}</p>
      <button>X</button>
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
