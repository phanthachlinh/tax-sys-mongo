const express = require("express");
const clientRouter = require('./api/client.ts');
import {initMongoose} from './mongoInstance';
import * as bodyParser from "body-parser"
export const app = express();
initMongoose();
app.use(bodyParser());
app.use('/client', clientRouter);


if (process.env.NODE_ENV !== 'test') {
  app.listen(8888)
}
export default app
