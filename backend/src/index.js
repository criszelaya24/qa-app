//import dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
// libraries to connect with auth0 request
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');

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
    answers: q.answers
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

const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://dev-uf1fkybj.auth0.com/.well-known/jwks.json`
  }),
  audience: '87DwawCr74SxzSjsBFTjue2Mj8zbh1qW',
  issuer: `https://dev-uf1fkybj.auth0.com/`,
  algorithms: ['RS256']
});

// inserting into the array
app.post("/", checkJwt, (req, res) => {
  const title = req.body.title
  const description = req.body.description;
  const newQuestion = {
    id: questions.length + 1,
    title: title,
    description: description,
    answers: [],
    author: req.user.name,
  };
  questions.push(newQuestion);
  res.status(200).send();
})

// insert new answer to the question

app.post("/answer/:id", checkJwt, (req, res) => {
  const answer = req.body.answer;
  const id = parseInt(req.params.id)
  const question = questions.filter( q => (q.id === id));
  if (question.length > 1) return res.status(500).send();
  if (question.length === 0) return res.status(404).send()
  question[0].answers.push({
    answer,
    author: req.user.name
  });
  res.status(200).send();
});

// start tge server

app.listen(8080, () => {
  console.log("server running on port 8080");
});
