import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Admin from './routes/Admin';
import User from './routes/User';

function App() {
  return (
    <Router>
      <Routes>
        {User()}
        {Admin()}
      </Routes>
    </Router>
  );
}

export default App;
