

import * as React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import DashboardPage from './pages/dashboard/DashboardPage';
import IndexPage from './pages/index/IndexPage';
import LoginPage from './pages/login/LoginPage';

function App() {
  return (
    <Router>
      <Route path="/" exact component={IndexPage} />
      <Route path="/login" component={LoginPage}/>
      <Route path="/dashboard" component={DashboardPage}/>
    </Router>
  );
}

export default App;
