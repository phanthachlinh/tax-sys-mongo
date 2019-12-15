const express = require("express");
const clientRouter = require('./api/client.ts');
import {initMongoose} from './mongoInstance.ts';
import bodyParser from "body-parser"
var app = express();
initMongoose();
app.use(bodyParser());
app.use('/client', clientRouter);


app.listen(8888)
export default app
