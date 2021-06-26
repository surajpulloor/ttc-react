import '../styles/App.css';

import Board from './Board';

function App() {
  return (
    <div className="container">
      <Board />  
      <h3>
        You can use the following keyboard shortcuts
        
        <ul>
          <li>"s" to start/reset the game</li>
          <li>"0-9" to play the moves</li>
        </ul>
      </h3>
    </div>
  );
}

export default App;
