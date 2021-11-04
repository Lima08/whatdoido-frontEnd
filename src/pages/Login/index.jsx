import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import services from '../../services';
import TodoContext from '../../context/TodoContext';

function Login() {
  const navigate = useNavigate();
  const { setHeaders } = useContext(TodoContext);
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPAssword] = useState('');

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

    navigate('home');
  }

  async function newUser(event) {
    event.preventDefault();

    const result = await services.newUser(userName, email, password);
    if (result.error) {
      alert(`${result.error.response.data.message}`);
      return;
    }

    setUserName('');
    setEmail('');
    setPAssword('');

    alert(`Parabéns ${userName}. Seu registro foi feito com sucesso!`);
    return;
  }

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
          className='form-control'
        />
      </label>

      <label>
        E-mail
        <input
          type='email'
          placeholder='digite seu E-mail'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className='form-control'
        />
      </label>

      <label>
        Senha:
        <input
          type='password'
          placeholder='Digite sua senha'
          value={password}
          onChange={(e) => setPAssword(e.target.value)}
          className='form-control'
        />
      </label>

      <div>
        <button
          className='btn btn-primary'
          type='submit'
          onClick={(e) => submitLogin(e)}
        >
          Entrar
        </button>
        <button
          className='btn btn-secondary'
          type='submit'
          onClick={(e) => newUser(e)}
        >
          Cadastre-se
        </button>
      </div>
    </form>
  );
}

export default Login;
