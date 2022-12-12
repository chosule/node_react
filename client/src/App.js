import { useEffect, useState } from "react";

function App({ todo }) {
  const [todoList, setTodoList] = useState(null);

  const fetchData = () => {
    fetch("http://localhost:4000/api/todo")
      .then((response) => response.json())
      .then((data) => setTodoList(data));
  };
  useEffect(() => {
    fetchData();
  }, []);
  const onSubmitHandler = (e) => {
    //prevent로 기본동작 막아주기
    e.preventDefault();
    const text = e.target.text.value;
    const done = e.target.done.checked;
    //body에 넣어줄때는 직렬화를 해서 보내줘야한다
    fetch("http://localhost:4000/api/todo", {
      method: "POST",
      //header에 content-type설정해주니까 잘 전달됨
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text,
        done,
      }),
    }).then(() =>
      //패치 후 바로 보여지기 위해 설정
      fetchData()
    );
    // console.log("text", text);
    // console.log("done", done);
  };
  return (
    <div>
      <h1>todo List</h1>
      <form onSubmit={onSubmitHandler}>
        <input name="text" />
        <input name="done" type="checkbox" />
        <input type="submit" value="추가" />
      </form>
      {todoList?.map((item) => (
        <div key={item.id} style={{ display: "flex" }}>
          <div>{item.id}</div>
          <div>{item.text}</div>
          <div>{item.done ? "Yes" : "No"}</div>
        </div>
      ))}
    </div>
  );
}

export default App;
