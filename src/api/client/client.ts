import IClient from './client.d';
const clientSchema = require('../../schema/Client.schema.ts').default;
var mongoose = require('../../mongoInstance.ts').getMongoose();
var Client = mongoose.model('Client', clientSchema)
export default {
	getClients: async (searchTerm: string, page: number) =>
		await Client.aggregate(getAggregations(searchTerm, page)).then((response: any, error: any) => {
			return {
				results: response[0].results,
				count: response[0].count.length === 0 ? 0 : response[0].count[0].id
			}
		}),
	addClient: async (client: IClient) => {
		client.date_created = new Date().toISOString()
		let newClient = new Client(client)
		await newClient.save((err: any) => {
			if (err)
				throw err
		})
		return newClient
	},
	updateClient: async (_id: string, input: any) => {
		if (input['date_of_birth'] === '')
			delete input['date_of_birth']
		Object.keys(input).map((key: string) => {
			if (input[key] === 'undefined')
				delete input[key]
		})
		await Client.findOneAndUpdate({ _id }, { "$set": input }, { new: true }, (err: any) => { if (err) throw err })
		return true
	},
	removeClient: async (_id: string) => {
		await Client.findByIdAndRemove(_id, ((err: any) => {
			if (err)
				throw err
		}))
		return true
	}
}



function getAggregations(searchTerm: string, page: number) {
	return [{
		"$facet": {
			results: [
				{
					"$match": {
						"$or": [
							{ first_name: { "$regex": searchTerm } },
							{ last_name: { "$regex": searchTerm } }
						]
					}
				},
				{
					"$sort": { "date_created": -1 }
				},
				{
					"$skip": 5 * (page - 1)
				},
				{
					"$limit": 5
				}
			],
			count: [
				{
					"$match": {
						"$or": [
							{ first_name: { "$regex": searchTerm } },
							{ last_name: { "$regex": searchTerm } }
						]
					}
				},
				{
					"$count": "id"
				}
			]
		}
	}
	]
}







// import express,{Response, NextFunction} from 'express'
// import IClient from './client.d';
// var router = require('express').Router();
// var mongoose = require('../../mongoInstance.ts').getMongoose();
// const clientSchema = require('../../schema/Client.schema.ts').default;
// const multer = require('multer');
// const upload = multer()
// var Client = mongoose.model('Client',clientSchema)
// router.get('/', (req: express.Request,res: Response)=>{
//   let searchObject:Array<any> = []
//   console.log(req.query)
//
//   console.log('sfd')
//   console.log(req.query.searchTerm!=''&&typeof req.query.searchTerm!=='undefined')
//   if(req.query.searchTerm!=''&&typeof req.query.searchTerm!=='undefined')
//     searchObject =
//       [
//         {first_name: {$regex:req.query.searchTerm,$options: "g"}},
//         {last_name: {$regex:req.query.searchTerm,$options: "g"}}
//       ]
//       // console.log(!req.query.searchTerm||req.query.searchTerm==''?{}:{$or:searchObject})
//   Client.find(!searchObject[0]?{}:{$or:searchObject},null,{skip:(5*(parseInt(req.query.page)-1)),limit:5}).sort( { date_created: -1 } ).then((results:any)=>{
//     Client.count(!searchObject[0]?{}:{$or:searchObject}).then((count:number)=>{
//
//       console.log({count,results})
//           res.send({count,results})
//     })
//
//   })
// })
// router.post('/',upload.none(), (req:express.Request, res:Response)=>{
//   if(!req.body.first_name){
//     res.status(422).send('Missing param first_name')
//     return
//   }
//   if(!req.body.last_name){
//     res.status(422).send('Missing param last_name')
//     return
//   }
//   if(typeof req.body.coming_from === 'undefined'){
//     res.status(422).send('Missing param coming_from')
//     return
//   }
//   if(!req.body.date_of_birth){
//     res.status(422).send('Missing param date_of_birth')
//     return
//   }
//   if(typeof req.body.civil_status === 'undefined'){
//     res.status(422).send('Missing param civil_status')
//     return
//   }
//   if(!req.body.amount_of_children){
//     res.status(422).send('Missing param amount_of_children')
//     return
//   }
//   if(!req.body.home_address){
//     res.status(422).send('Missing param home_address')
//     return
//   }
//   if(!req.body.foreign_address){
//     res.status(422).send('Missing param foreign_address')
//     return
//   }
//   if(!req.body.email){
//     res.status(422).send('Missing param email')
//     return
//   }
//   if(!req.body.telephone){
//     res.status(422).send('Missing param telephone')
//     return
//   }
//   if(!req.body.FK_User){
//     res.status(422).send('Missing param FK_user')
//     return
//   }
//
//
//   req.body.date_created = Date.now();
//   let newClient = new Client(req.body);
//   newClient.save((err:any)=>{
//      if(err){
//        res.status(500).send({path:err.path,message:err.message})
//        return
//      }else{
//        res.send(newClient)
//     }
//   });
// })
// router.delete('/',(req:any,res:any)=>{
//   if(!req.body._id){
//     res.status(422).send('Missing param id');
//     return
//   }
//   Client.deleteOne({_id: req.body._id},(err:any)=>{
//     if(err) throw err
//     res.status(200).send({_id:req.body._id})
//   })
// })
// router.put('/',upload.none(),(req:any,res:any)=>{
//   if(!req.body._id){
//     res.status(422).send('Missing param _id');
//     return
//   }
//   Client.findByIdAndUpdate(
//     req.body._id,
//     req.body,
//     {new:true},
//     (err:any, client:IClient) => {
//     // Handle any possible database errors
//         if (err) return res.status(500).send(err);
//         return res.status(200).json(client);
//     }
// )
// })
// module.exports = router
