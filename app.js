const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const db = require('./config/db');
require('dotenv').config();
const PORT = process.env.PORT;
const app = express();

//routes
const employeeRouter = require('./routes/employee')

app.use(morgan());
app.use(cors());
app.use(bodyParser.json());

app.use('/api/employee', employeeRouter);

app.listen(PORT, () => {
    console.log(`SERVER IS RUNNING ON PORT ${PORT}`);
});
