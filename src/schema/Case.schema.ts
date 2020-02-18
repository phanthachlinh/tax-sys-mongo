var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const caseSchema = new Schema({
  status: Number,
  country: String,
  date_created: Date,
  FK_User: Number,
  FK_Mongo_Client: String
});
export default caseSchema
