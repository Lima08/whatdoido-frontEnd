import React, { useState, useContext } from 'react';
import TodoCards from '../../components/TodoCard';
import services from '../../services';
import TodoContext from '../../context/TodoContext';
import TaskCreator from '../../components/taskCreator';

function TodoBoard() {
  const { headers, setHeaders, todos, setTodos, baseTodos } =
    useContext(TodoContext);
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPAssword] = useState('');
  const [order, setOrder] = useState(true);
  const [colunm, setcolunm] = useState('title');
  // const [statusFilter, setStatusFilter] = useState('Todas');
  const [menuField, setMenuField] = useState(true);
  const [loginField, setLoginField] = useState(true);
  const [newTaskField, setNewTaskField] = useState(false);

  async function newUser(event) {
    event.preventDefault();
    const result = await services.newUser(userName, email, password);
    console.log(result);
    setUserName('');
    setEmail('');
    setPAssword('');
    if (result.error) {
      alert(`${result.error.response.data.message}`);
      return;
    }

    alert(`Parabéns ${userName}. Seu registro foi feito com sucesso!`);
  }

  async function submitLogin(event) {
    event.preventDefault();

    if (!userName || userName.length < 3) {
      alert(`Nome é obrigatorio`);
      return;
    }

    const result = await services.authentication({ email, password });

    if (result.error) {
      alert(`${result.error.response.data.message}`);
      return;
    }

    setHeaders({
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        authorization: result.data.token,
      },
    });
  }

  function formLogin() {
    return (
      <form className='card'>
        <div className=' text-white bg-dark mb-3'>
          <h2>Precisando de uma ajudinha para se organizar? </h2>
          <p>
            Agora você não precisa mais carregar sua agenda. Cadastre-se e cria
            sua lista de tarefas e acesse de onde estiver!
          </p>
        </div>

        <label>
          Nome
          <input
            type='text'
            placeholder='Digite seu nome'
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className='form-control menu'
          />
        </label>

        <label>
          E-mail
          <input
            type='email'
            placeholder='digite seu E-mail'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='form-control menu'
          />
        </label>

        <label>
          Senha:
          <input
            type='password'
            placeholder='Digite sua senha'
            value={password}
            onChange={(e) => setPAssword(e.target.value)}
            className='form-control menu'
          />
        </label>

        <div>
          <button
            className='btn btn-primary menu'
            type='submit'
            onClick={(e) => submitLogin(e)}
          >
            Entrar
          </button>
          <button
            className='btn btn-secondary menu'
            type='submit'
            onClick={(e) => newUser(e)}
          >
            Cadastre-se
          </button>
        </div>
      </form>
    );
  }

  function handleFilter(value) {
    if (value === 'Todas') {
      setTodos(baseTodos);
      return;
    }
    const arrayFiltered = baseTodos.filter((task) => task.status === value);
    if (!arrayFiltered.length) {
      alert(`Não existe tarefas ${value}`);
      setTodos(baseTodos);
      return;
    }

    setTodos(arrayFiltered);
  }

  function handleOrder(field) {
    setOrder(!order);
    setcolunm(field);

    const orderedArray = todos.sort((a, b) => {
      if (order) {
        return a[colunm] < b[colunm] ? -1 : 1;
      }

      return a[colunm] > b[colunm] ? -1 : 1;
    });

    setTodos(orderedArray);
  }

  async function excludeTask(id) {
    const newArray = todos.filter(({ _id }) => _id !== id);
    setTodos(newArray);

    await services.excludeTodoById(id, headers);
    return;
  }

  function menu() {
    return (
      <section className=''>
        <button
          className='btn btn-light menu'
          onClick={(e) => {
            setMenuField(false);
            setNewTaskField(true);
          }}
          type='button'
        >
          Nova
        </button>

        <select
          className=' dropdown'
          onChange={({ target }) => {
            handleFilter(target.value);
          }}
        >
          <option className='btn btn-secondary dropdown-toggle' value='Todas'>
            Todas
          </option>
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

        <button
          className='btn btn-light menu'
          type='button'
          onClick={() => handleOrder('title')}
        >
          Ordem alfabética
        </button>

        <button
          className='btn btn-light menu'
          onClick={() => handleOrder('date')}
          type='button'
        >
          Data
        </button>

        <button className='btn btn-light menu' onClick={() => {}} type='button'>
          IMPLEMENTAR LOGOUT
        </button>
      </section>
    );
  }

  return (
    <div>
      {loginField && (
        <div className='login-form '>
          <h1 className='login-title'>What do I do?</h1>
          {formLogin()}
        </div>
      )}

      {menuField && menu()}
      {newTaskField && (
        <TaskCreator
          setMenuField={setMenuField}
          setNewTaskField={setNewTaskField}
        />
      )}

      <ul className=''>
        <TodoCards todoList={todos} excludeTask={excludeTask} />
      </ul>
    </div>
  );
}

export default TodoBoard;
