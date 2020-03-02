export default interface IClient {
	_id:String,
	first_name: String,
	last_name: String,
	coming_from: Number,
	date_of_birth: String,
	civil_status: Number,
	amount_of_children: Number,
	home_address: String,
	foreign_address: String,
	email: String,
	telephone: String,
	FK_User: Number,
	date_created: string
}
