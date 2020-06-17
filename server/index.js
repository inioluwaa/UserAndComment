const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser')
const logger = require('morgan')

const db = require('./config/database')

const port = process.env.PORT || 5000;

db.authenticate()
    .then(() => console.log("Database connected"))
    .catch(err => console.log('Error: ', err))

app.use(logger('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api', require('./routers/user'))
app.use('/api', require('./routers/comment'))
app.use('/api', require('./routers/reply'))

app.listen(port, () => {
  console.log(`Server started on port ${port}.`)
})

