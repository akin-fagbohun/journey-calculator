import './App.css';

function App() {
  const handleClick = () => {
    fetch('https://7302htasp6.execute-api.eu-west-1.amazonaws.com/v1/airport').then((res) => {
      res.json().then((data) => console.log(data));
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <button type="button" onClick={handleClick}>
          App
        </button>
      </header>
    </div>
  );
}

export default App;
