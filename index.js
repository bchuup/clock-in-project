const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const apiRoutes = require('./routes');

const app = express();
app.use(express.static(path.join(__dirname, 'client/build')));
app.use(bodyParser.json());
app.use(cors());
app.use('/api', apiRoutes);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log('listening on port ' + PORT);
});