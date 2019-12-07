const mongoose = require('mongoose');
export function initMongoose(){
  mongoose.connect('mongodb://linh:test123@ds057538.mlab.com:57538/tax-system', {useNewUrlParser: true, useUnifiedTopology: true}).catch((err:any)=>console.log(err));
}
export function getMongoose(){
  return mongoose
}
