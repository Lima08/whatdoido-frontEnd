import addNewUser from "../services";
import TodoContext from "./TodoContext";

function TodoProvider({ children }) {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const api
    setTodos()
  }, []);

  const storage = {
    todos,
  }

  return ( 
    <TodoContext.Provider value={storage}>
      {children}
    </TodoContext.Provider>
   );
}

export default TodoProvider;