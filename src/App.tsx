import React from 'react';
import './App.css';
import Home from './components/HomePage';
import MyNavbar from './components/MyNavbar';

const App: React.FunctionComponent = () => {
  return (
    <div className="App">
      <div id='wrapper'>
        <MyNavbar />
        <Home />
      </div>
    </div>
  );
}

export default App;
