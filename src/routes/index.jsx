import React from 'react';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import TodoProvider from '../context/todoProvider';

function App() {
  return (
    <BrowserRouter>
      <TodoProvider>
        <Routes>
          <Route path='/' element={<Login />}></Route>
          <Route path='home' element={<Home />} />
          {/* <Route path="*" component={ NotFound } /> */}
        </Routes>
      </TodoProvider>
    </BrowserRouter>
  );
}

export default App;
