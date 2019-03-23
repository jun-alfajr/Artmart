import React, { Component } from 'react';
import NavBar from './components/nav.jsx';
import Slides from './components/slides.jsx';
import Footer from './components/footer.jsx';
import Page from './components/page.jsx';
import {Switch, Route} from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div>
      <NavBar/>
      <Switch>
        <Route exact path="/" component={Slides}/>
        <Route exact path="/:page" component={Page}/>
      </Switch>
      <Footer/>
      </div>
    );
  }
}

export default App;
