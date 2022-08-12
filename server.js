require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect(process.env.CONNECTIONSTRING)
  .then(() => {
    console.log('Connected to Mongo DB...');
    app.emit('OK');
  })
  .catch(e => console.log('Error connecting to Mongo ' + e.message));

const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const port = 3000;
const routes = require('./routes')
const path = require('path');
const helmet = require('helmet');
const csrf = require('csurf');
const { middlewareGlobal, checkCsrfError, csrfMiddleware } = require('./src/middleware/middleware');

app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, 'public')));

const sessionOption = session({
  secret: 'aisdiqwoelqploaiuduasjdokkqpwpeqdmiamsdmaio',
  store: MongoStore.create({ mongoUrl: process.env.CONNECTIONSTRING }),
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true,
  }
});

app.use(sessionOption);
app.use(flash());

app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

app.use(csrf());
//Middleware pessoais.
app.use(middlewareGlobal);
app.use(checkCsrfError);
app.use(csrfMiddleware);
app.use(routes);

app.on('OK', () => {
  app.listen(3000, () => {
    console.log(`Run in http://localhost:${port}`);
  });
});

