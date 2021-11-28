import logo from '../logo.svg';
import '../css/App.css';
import React from 'react'


const App : React.VFC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        
      </header>
    </div>
  );
}

export default App;
