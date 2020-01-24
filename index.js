// require('dotenv').config();
const path = require('path');
const express = require('express');
// const bodyParser = require('body-parser');
const cors = require('cors');
const apiRoutes = require('./routes');

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
app.use(express.static(path.join(__dirname, 'client/build')));
// app.use(bodyParser.json());
app.use(cors());
app.use('/api', apiRoutes);

// app.use('/', (req, res) => {
//   res.end();
// });
// if (process.env.NODE_ENV === 'production') {
// } else {
//   res.end();
// }
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname + '/client/build/index.html'));
// });
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log('listening on port ' + PORT);
});