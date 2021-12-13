import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Home from './screens/Home'
import Create from './screens/Create'
import Update from './screens/Update'

const App = () => {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/create" component={Create} exact />
          <Route path="/update/:id" component={Update} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;