function App() {
  fetch("http://localhost:4000/api/todo")
    .then((response) => response.json())
    .then((data) => console.log(data));
  return <div>1234</div>;
}

export default App;
