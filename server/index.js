const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const config = {
  port: 8080,
  host: '0.0.0.0',
};

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
  res.status(200).send('HELLO FROM BACKEND')
  // knex('users').where('id', 1).then((user) => {
  //   res.status(200).send({ user })
  // })
});

app.listen(config.port, config.host);