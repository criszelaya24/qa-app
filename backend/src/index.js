//import dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

// defining express app

const app = express()

// DataBase

const questions = []

// securing app
app.use(helmet());
app.use(bodyParser.json());
app.use(cors());
app.use(morgan("combined"));
// lines to use JSON on post request
app.use(express.json());
app.use(express.urlencoded({extended: true}));
// routes:

// all question
app.get("/", (req, res) => {
  const qs = questions.map(q => ({
    id: q.id,
    title: q.title,
    description: q.description,
    answer: q.answer
  }));
  res.status(200).send(qs)
});


// filter by id with lambda questions
app.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const question = questions.filter(q => (q.id === id))
  if (question.length > 1) return res.status(500).send();
  if (question.length === 0) return res.status(404).send()
  res.send(question[0]);
})

// inserting into the array
app.post("/", (req, res) => {
  console.log(req.body);
  const title = req.body.title
  const description = req.body.description;
  const newQuestion = {
    id: questions.length + 1,
    title: title,
    description: description,
    answer: [],
  };
  questions.push(newQuestion);
  res.status(200).send();
})

// insert new answer to the question

app.post("/answer/:id", (req, res) => {
  const answer = req.body.answer;
  const id = parseInt(req.params.id)
  const question = questions.filter( q => (q.id === id));
  if (question.length > 1) return res.status(500).send();
  if (question.length === 0) return res.status(404).send()
  question[0].answer.push(answer);
  res.status(200).send();
});

// start tge server

app.listen(8080, () => {
  console.log("server running on port 8080");
});
