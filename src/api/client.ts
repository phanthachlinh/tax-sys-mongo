import express,{Response, NextFunction} from 'express'
var router = require('express').Router();
var mongoose = require('../mongoInstance.ts').getMongoose();
const clientSchema = require('../schema/Client.schema.ts').default;
var Client = mongoose.model('Client',clientSchema)
router.use(function (req :Request, res:Response, next: NextFunction) {
  // .. some logic here .. like any other middleware
  next()
})
router.get('/', (req: Request,res: Response)=>{
  Client.find({}).then((results:any)=>{
    console.log('df')
    res.send(results)
  })
})
router.post('/', (req:Request, res:Response)=>{
  Client.create(req.body,(err:any, newClient: any)=>{
    if(err){
      res.send({path:err.path,message:err.message})
    }else{
      res.send(newClient._id)
    }
  });
})
module.exports = router
