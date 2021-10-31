import TodoContext from "./TodoContext";
import { useState } from "react";

function TodoProvider({ children }) {
  const [todos, setTodos] = useState([]);
  const [token, setToken] = useState('')

  // useEffect(() => {
  //   // const api
  //   setTodos()
  // }, [token]);

  const storage = {
    todos,
    setToken,
    token,
    setTodos,
  }

  return ( 
    <TodoContext.Provider value={storage}>
      {children}
    </TodoContext.Provider>
   );
}

export default TodoProvider;