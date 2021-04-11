import React, { Component } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Navbar from './components/Navbar'
import MainPage from './components/MainPage'
// import axios from 'axios';

class App extends Component {

  // //Making GET request to populate items
  // componentDidMount() {
  //   // Simple GET request using axios
  //   axios.get('https://api.mocki.io/v1/b8bead03')
  //       .then(response => {
  //           items = response.data;
  //           // console.log(items);
  //       });
  // }

  render() {
    return (
      <BrowserRouter>
          <div className="App">
            <Navbar/>
            <Switch>
              <Route exact path="/" render={ () => <MainPage/>}
              />
            </Switch>
          </div>
      </BrowserRouter>
      
    );
  }
}

export default App;
