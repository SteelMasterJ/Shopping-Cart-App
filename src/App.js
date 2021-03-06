import React, { Component } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Navbar from './components/Navbar'
import MainPage from './components/MainPage'
import Cart from './components/Cart'

class App extends Component {

  render() {
    return (
      <BrowserRouter>
          <div className="App">
            <Navbar/>
            <Switch>
              <Route exact path="/" component={MainPage}/>
              <Route path="/cart" component={Cart}/>
            </Switch>
          </div>
      </BrowserRouter>
      
    );
  }
}

export default App;
