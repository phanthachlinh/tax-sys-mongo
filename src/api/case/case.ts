const clientSchema = require('../../schema/Case.schema.ts').default;
var mongoose = require('../../mongoInstance.ts').getMongoose();
var Case = mongoose.model('Case', clientSchema)
export default {

	addCase: async function(casex: any) {
		casex.date_created = new Date().toISOString()
		let newCase = new Case(casex)
		await newCase.save((err: any) => {
			if (err)
				throw err
		})
		return newCase
	},
	getCases: async (_id: string, page: number) => {

		return await Case.aggregate(getAggregations(_id, page)).then((response: any, error: any) => {
			if (error) throw error
			return {
				results: response[0].results,
				count: response[0].count.length === 0 ? 0 : response[0].count[0].id
			}
		})
	},
	updateCase: async (_id: string, country: any, status: number) => {
		await Case.findOneAndUpdate({ _id }, { "$set": { country, status } }, { new: true }, (err: any) => { if (err) throw err })
		return true
	},
	removeCase: async (_id: string) => {
		await Case.findByIdAndRemove(_id, ((err: any) => {
			if (err)
				throw err
		}))
		return true
	}
	// removeClient: async (_id: string) => {
	// 	await Client.findByIdAndRemove(_id, ((err: any) => {
	// 		if (err)
	// 			throw err
	// 	}))
	// 	return true
	// }
}

function getAggregations(_id: string, page: number) {
	return [{
		"$facet": {
			results: [
				{
					"$sort": {
						date_created: -1
					}
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
					"$count": "id"
				}
			]
		}
	}
	]
}





































// import express,{Response, NextFunction} from 'express'
// var router = require('express').Router();
// var mongoose = require('../mongoInstance.ts').getMongoose();
// const caseSchema = require('../schema/Case.schema.ts').default;
// const multer = require('multer');
// const upload = multer()
// var Case = mongoose.model('Case',caseSchema)
// router.get('/', (req: express.Request,res: Response)=>{
//
//   Case.find({FK_Mongo_Client: req.query.clientId},null,{skip:(5*(parseInt(req.query.page)-1)),limit:5}).sort( { date_created: -1 } ).then((results:any)=>{
//     Case.count({}).then((count:number)=>{
//           res.send({count,results})
//     })
//
//   })
// })
// router.post('/', (req:express.Request, res:Response)=>{
//   if(typeof req.body.status === 'undefined'){
//     res.status(422).send('Missing param status')
//     return
//   }
//   if(typeof req.body.country
//     == 'undefined'){
//     res.status(422).send('Missing param country')
//     return
//   }
//   if(typeof req.body.FK_User === 'undefined'){
//     res.status(422).send('Missing param fk user')
//     return
//   }
//   if(typeof req.body.FK_Mongo_Client === 'undefined'){
//     res.status(422).send('Missing param client')
//     return
//   }
//
//
//
//   req.body.date_created = Date.now();
//   let newCase = new Case(req.body);
//   newCase.save((err:any)=>{
//      if(err){
//        res.status(500).send({path:err.path,message:err.message})
//        return
//      }else{
//        res.status(200).send(newCase)
//     }
//   });
// })
//
// router.delete('/',(req:any,res:any)=>{
//   if(!req.query._id){
//     res.status(422).send('Missing param id');
//     return
//   }
//   Case.deleteOne({_id: req.query._id},(err:any)=>{
//     if(err) throw err
//     res.status(200).send({_id:req.query._id})
//   })
// })
// router.put('/',upload.none(),(req:any,res:any)=>{
//   if(!req.body._id){
//     res.status(422).send('Missing param _id');
//     return
//   }
//   Case.findByIdAndUpdate(
//     req.body._id,
//     req.body,
//     {new:true},
//     (err:any) => {
//     // Handle any possible database errors
//         if (err) return res.status(500).send(err);
//         return res.status(200).json(req.body);
//     })
// })
// interface ICase{
//
// }
// module.exports = router
