import express,{Response, NextFunction} from 'express'
var router = require('express').Router();
var mongoose = require('../mongoInstance.ts').getMongoose();
router.use(function (req :Request, res:Response, next: NextFunction) {
  // .. some logic here .. like any other middleware
  next()
})
router.post('/validate', (req:Request, res:Response)=>{
  console.log('yellss')
  res.send('yeslls')
})
router.post('/register', (req:Request, res:Response)=>{
  console.log('register')
  res.send('yeslls')
})
module.exports = router
