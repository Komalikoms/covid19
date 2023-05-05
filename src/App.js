import {Route, Switch} from 'react-router-dom'

import Home from './components/Home'
import StateSpecificRoute from './components/StateSpecificRoute'
import About from './components/About'
import './App.css'
import NotFound from './components/NotFound'

const App = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route
      exact
      path="/covid19-state-wise-data/state/:stateCode"
      component={StateSpecificRoute}
    />
    <Route exact path="/about" component={About} />

    <Route component={NotFound} />
  </Switch>
)

export default App

/*

*/
