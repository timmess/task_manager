import Signup from "./components/Signup";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import TaskManager from "./components/TaskManager";
import {AuthProvider} from "./contexts/AuthContext";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import UpdateProfile from "./components/UpdateProfile";

function App() {
  return (
      <Router>
          <AuthProvider>
              <Switch>
                  <PrivateRoute path="/" exact={true} component={Dashboard}></PrivateRoute>
                  <PrivateRoute path="/update-profile" exact={true} component={UpdateProfile}></PrivateRoute>
                  <PrivateRoute path="/task-manager" exact={true} component={TaskManager}></PrivateRoute>
                  <Route path="/signup" component={Signup}></Route>
                  <Route path="/login" component={Login}></Route>
              </Switch>
          </AuthProvider>
      </Router>
  );
}

export default App;
