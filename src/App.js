import {Route, Switch} from 'react-router-dom'

import './App.css'
import Home from './components/Home'
import NotFound from './components/NotFound'
import LoginForm from './components/LoginForm'
//import ProtectedRoute from './components/ProtectedRoute'
//ebank ebank
// Replace your code here
const App = () => (
  <Switch>
    <Route exact path="/login" component={LoginForm} />
    <Route exact path="/" component={Home} />
    <Route component={NotFound} />
  </Switch>
)

export default App
