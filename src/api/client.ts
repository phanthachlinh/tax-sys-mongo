import express,{Response, NextFunction} from 'express'
import IClient from './client.d';
var router = require('express').Router();
var mongoose = require('../mongoInstance.ts').getMongoose();
const clientSchema = require('../schema/Client.schema.ts').default;
var Client = mongoose.model('Client',clientSchema)
router.use(function (req :Request, res:Response, next: NextFunction) {
  // .. some logic here .. like any other middleware
  next()
})
router.get('/', (req: express.Request,res: Response)=>{

  Client.find({},null,{skip:10*(req.body.page-1),limit:10}).then((results:any)=>{
    res.send(results)
  })
})
router.post('/', (req:express.Request, res:Response)=>{
  if(!req.body.first_name){
    res.status(422).send('Missing param first_name')
    return
  }
  if(!req.body.last_name){
    res.status(422).send('Missing param last_name')
    return
  }
  if(typeof req.body.coming_from === 'undefined'){
    res.status(422).send('Missing param coming_from')
    return
  }
  if(!req.body.date_of_birth){
    res.status(422).send('Missing param date_of_birth')
    return
  }
  if(typeof req.body.civil_status === 'undefined'){
    res.status(422).send('Missing param civil_status')
    return
  }
  if(!req.body.amount_of_children){
    res.status(422).send('Missing param amount_of_children')
    return
  }
  if(!req.body.home_address){
    res.status(422).send('Missing param home_address')
    return
  }
  if(!req.body.foreign_address){
    res.status(422).send('Missing param foreign_address')
    return
  }
  if(!req.body.email){
    res.status(422).send('Missing param email')
    return
  }
  if(!req.body.telephone){
    res.status(422).send('Missing param telephone')
    return
  }
  if(!req.body.FK_user){
    res.status(422).send('Missing param FK_user')
    return
  }




  let newClient = new Client(req.body);
  newClient.save((err:any)=>{
     if(err){
       res.status(500).send({path:err.path,message:err.message})
     }else{
       res.send(newClient._id)
    }
  });
})
router.delete('/',(req:any,res:any)=>{
  if(!req.body._id){
    res.status(422).send('Missing param id');
    return
  }
  Client.deleteOne({_id: req.body._id},(err:any)=>{
    if(err) throw err
    res.status(200).send('deleted')
  })
})
router.put('/',(req:any,res:any)=>{
  console.log(req.body.id)
  if(!req.body._id){
    res.status(422).send('Missing param _id');
    return
  }
  Client.findByIdAndUpdate(
    req.body._id,
    req.body,
    {new:true},
    (err:any, client:IClient) => {
    // Handle any possible database errors
        if (err) return res.status(500).send(err);
        return res.status(200).json(client);
    }
)
})
module.exports = router
