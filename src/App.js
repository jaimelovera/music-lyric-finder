import React from 'react'
import './App.css'
import {BrowserRouter, Route, Switch} from 'react-router-dom'


import Navbar from './components/layout/Navbar'
import Index from './components/layout/Index'

function App() {
  return (
    <BrowserRouter>
      <React.Fragment>
        <Navbar/>
        <div className="app-container">
          <Switch>
            <Route exact path ="/" component={Index} />
          </Switch>
        </div>
      </React.Fragment>
    </BrowserRouter>
  );
}

export default App;
