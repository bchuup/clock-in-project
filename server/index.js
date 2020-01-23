require('dotenv').config();
const environmentConfig = require('../config');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const PORT = process.env.SERVER_PORT || 8080;

const serverConfig = {
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
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
  const environment = environmentConfig.environment === "production"
    ? ' production'
    : ' environment'
  res.status(200).send('HELLO FROM BACKEND PORT: ' + PORT + environment)
  // knex('users').where('id', 1).then((user) => {
  //   res.status(200).send({ user })
  // })
});

app.listen(serverConfig.port, serverConfig.host);