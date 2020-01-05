const mongoose = require('mongoose');
export function initMongoose(){
  mongoose.connect('mongodb://linh:test123@localhost:27017/taxDB', {useNewUrlParser: true, useUnifiedTopology: true}).catch((err:any)=>console.log(err));
}
export function getMongoose(){
  return mongoose
}
