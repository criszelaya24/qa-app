import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

class Questions extends Component {
  constructor(props){
    super(props);
    this.state = {
      questions: null,
    };
  }
  async componentDidMount() {
    const questions = (await axios.get('http://localhost:8080/')).data;
    this.setState({
      questions: questions,
    });
  }
  render(){
    console.log(this.state.questions);
    return(
      <div className="container">
        <div className="row">
        <Link to="/new-question">
            <div className="card text-white bg-secondary mb-3">
              <div className="card-header">Need help? Ask here!</div>
              <div className="card-body">
                <h4 className="card-title">+ New Question</h4>
                <p className="card-text">Don't worry. Help is on the way!</p>
              </div>
            </div>
          </Link>
          {this.state.questions === null && <p>Loading questions..</p>}
          {
            this.state.questions && this.state.questions.map( q => (
              <div key={q.id} className="col-sm-12 col-md-4 col-lg-3">
                <Link to={`/question/${q.id}`}>
                  <div className="card text-white bg-success mb-3">
                    <div className="card-header">
                      Answer: {q.answers}
                      <div className="card-body">
                        <h4 className="card-title">{q.title}</h4>
                        <p className="card-text">{q.description}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))
          }
        </div>
      </div>
    )
  }
}
export default Questions;
