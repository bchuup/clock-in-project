require('dotenv').config();
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const PORT = process.env.SERVER_PORT || 8080;

const config = {
  port: PORT,
  host: '0.0.0.0',
};

// TODO: prep knex in parent folder
// knex = require('knex')({
//   client: 'pg',
//   connection: {
//     host: process.env.DATABASE_CONTAINER,
//     user: process.env.POSTGRES_USER,
//     password: process.env.POSTGRES_PASSWORD,
//     database: process.env.POSTGRES_DB
//   },
//   pool: {
//     min: 0,
//     max: 7,
//     afterCreate: (conn, done) => {
//       conn.query('SET timezone="UTC";', (err) => {
//         if (err) {
//           console.log(err)
//         }
//         done(err, conn)
//       })
//     }
//   }
// })

const app = express();
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(cors());

app.get('/api', (req, res) => {
  const environment = process.env.NODE_ENV === "production"
    ? ' production'
    : ' environment'
  return res.status(200).send('HELLO FROM BACKEND PORT: ' + PORT + environment)
  // knex('users').where('id', 1).then((user) => {
  //   res.status(200).send({ user })
  // })
});

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname + 'server/public/index.html'));
});

app.listen(config.port, () => {
  console.log('listening on port ' + PORT);
});