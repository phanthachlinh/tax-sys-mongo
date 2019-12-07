var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const clientSchema = new Schema({

	first_name: String,
	last_name: String,
	coming_from: String,
	date_of_birth  :Date,
	civil_status  :String,
	amount_of_children : Number,
	home_address :String,
	foreign_address :String,
	email :String,
	telephone :String,
  title:  String,

});
export default clientSchema
