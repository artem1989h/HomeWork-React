import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Characters from './Characters/characters';



const App = (props) => {
  return (
    <Router>
      <Route path = '/' component = {Characters} />
    </Router>
)};


export default App;
