import { useEffect, useState } from "react";
import styled from "styled-components";

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
    <StyledDefaultDiv>
      <StyledDiv>
        <StyledH1>todo List 📝</StyledH1>
        <form onSubmit={onSubmitHandler}>
          <input name="text" />
          <input name="done" type="checkbox" />
          <input type="submit" value="추가" />
        </form>
        {todoList?.map((item) => (
          <StyledItemDiv>
            <div key={item.id}>
              <div>· {item.id} :</div>
              <div>{item.text}</div>
              <StyledSmallFont>
                <div>
                  {item.done
                    ? "체크박스를 클릭하셨습니다 !"
                    : "체크박스를 클릭하지 않으셨습니다 !"}
                </div>
              </StyledSmallFont>
            </div>
          </StyledItemDiv>
        ))}
      </StyledDiv>
    </StyledDefaultDiv>
  );
}

const StyledH1 = styled.h1`
  font-size: 35px;
`;
const StyledDefaultDiv = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const StyledDiv = styled.div`
  display: flex;
  align-items: center;
  border-radius: 16px;
  border: 2px solid #fff;
  flex-direction: column;
  background-color: #1c315e;
  width: 350px;
  height: 500px;
`;
const StyledItemDiv = styled.div`
  display: flex;
  justify-content: space-between;
  width: 69%;
`;

const StyledSmallFont = styled.div`
  font-size: 3px;
`;
export default App;
