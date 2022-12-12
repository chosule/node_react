import { useEffect, useState } from "react";

function App() {
  const [todoList, setTodoList] = useState(null);

  useEffect(() => {
    fetch("http://localhost:4000/api/todo")
      .then((response) => response.json())
      .then((data) => setTodoList(data));
  }, []);

  return (
    <div>
      <h1>todo List</h1>
      {todoList.map((todo) => {
        <div key={todo.id}>
          <div>{todo.id}</div>
          <div>{todo.text}</div>
          <div>{todo.done}</div>
        </div>;
      })}
    </div>
  );
}

export default App;
