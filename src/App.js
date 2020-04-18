import React from 'react'

import './App.css'
import {BrowserRouter, Route, Switch} from 'react-router-dom'

import { Provider } from './context'


import Navbar from './components/layout/Navbar'
import Index from './components/layout/Index'
import Page404 from './components/layout/Page404'
import Lyrics from './components/tracks/Lyrics'

function App() {
  return (
    <Provider>
    <BrowserRouter>
        <Navbar/>
        <div className="app-container">
          <Switch>
            <Route exact path="/" component={Index} />
            <Route exact path="/lyrics/track/:id(\d+)" component={Lyrics} />
            <Route component={Page404} />
          </Switch>
        </div>
    </BrowserRouter>
    </Provider>
  );
}

export default App;
