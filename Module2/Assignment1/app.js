const express = require('express');

const mainRouter = require('./routers/index');

const path = require('path');

const app = express();

app.use(mainRouter);

app.use(express.static(path.join(__dirname,'Public')));

app.listen(3000);