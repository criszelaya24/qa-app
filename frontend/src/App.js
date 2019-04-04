import React, {Component} from 'react';
import NavBar from './NavBar/NavBar';
import Questions from './Questions/Questions';
import Question from './Questions/Question';
import {Route} from 'react-router-dom';
import Callback from './Callback';
import NewQuestion from './NewQuestion/NewQuestion';
import SecuredRoute from './SecuredRoute/SecuredRoute';

class App extends Component  {
  render(){
    return (
      <div>
        <NavBar/>
        <Route exact path='/' component={Questions}/>
        <Route exact path='/question/:questionId' component={Question}/>
        <Route exac path='/callback' component = {Callback}/>
        <SecuredRoute path='/new-question' component={NewQuestion} />
      </div>
    )
  }
}

export default App;
