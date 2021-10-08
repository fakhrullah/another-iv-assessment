import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import OrderCreate from './pages/OrderCreate';
import OrderIndex from './pages/OrderIndex';

function App() {

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/create">
            <OrderCreate />
          </Route>
          <Route path="">
            <OrderIndex />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
