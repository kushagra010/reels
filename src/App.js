import './App.css';
import Signup from './Components/Signup';
import AuthProvider from './Context/AuthProvider';
import Login from './Components/Login';
// import Ioa from './Components/Ioa(POC)';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import PrivateRoute from './Components/PrivateRoute';
import Feed from './Components/Feed'
import Profile from './Components/Profile';

function App() {
  return (
    <>
      <AuthProvider>
        <Router>
          <Switch>
            <PrivateRoute exact path='/' component={Feed}/>
            <PrivateRoute path='/profile' component={Profile}/>
            <Route path="/signup" component={Signup}></Route>
            <Route path="/login" component={Login}></Route>
          </Switch>
        </Router>
      </AuthProvider>
      {/* <Ioa></Ioa> */}
    </>
  );
}

export default App;
