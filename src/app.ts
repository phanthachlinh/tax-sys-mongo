const express = require("express");
const clientRouter = require('./api/client/client.ts');

const caseRouter = require('./api/case.ts');
import {initMongoose} from './mongoInstance';
import * as bodyParser from "body-parser"
export const app = express();
initMongoose();
var cors = require('cors');
app.use(cors());
app.use(bodyParser());
app.use('/client', clientRouter);

app.use('/case', caseRouter);


if (process.env.NODE_ENV !== 'test') {
  app.listen(8888)
}
export default app
