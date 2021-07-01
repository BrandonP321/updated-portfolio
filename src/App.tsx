import './App.css';
import "destyle.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Home } from './pages';
import { useEffect } from 'react';
import { Responsive } from './utils/Responsive';

function App() {
  useEffect(() => {

  }, [])

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
