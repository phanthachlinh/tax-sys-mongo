// import * as request from 'supertest';
// import {app} from '../../app';
// import IClient from './client.d'
// const newClient : IClient = {
//   first_name: 'Ccccchris',
//   last_name: 'Chris',
//   coming_from: 0,
//   date_of_birth  : new Date(),
//   civil_status  :1,
//   amount_of_children : 1,
//   home_address :'fsddsf',
//   foreign_address :'sfdfds',
//   email : 'sfdsfd',
//   telephone :'+4522222222',
//   FK_User: 10
// }
// describe('Test /POST client',()=>{
//   let newClientId: any;
//   afterEach(async()=>{
//     await request(app)
//     .delete('/client')
//     .send({_id:newClientId})
//     .catch(e=>{throw e})
//     .then((res:request.Response)=>res.body.text);
//
//   })
//   it('should fail missing first_name',async()=>{
//     let postThrow = async()=> await request(app)
//     .post('/client')
//     .send(removeProp(newClient,'first_name'))
//     .catch(e=>{throw e})
//     .then((res:request.Response)=>[res.error.status,res.error.text]);
//     expect(await postThrow()).toEqual([422,'Missing param first_name'])
//   })
//   it('should fail missing last_name',async()=>{
//     let postThrow = async()=> await request(app)
//     .post('/client')
//     .send(removeProp(newClient,'last_name'))
//     .catch(e=>{throw e})
//     .then((res:request.Response)=>[res.error.status,res.error.text]);
//     expect(await postThrow()).toEqual([422,'Missing param last_name'])
//   })
//   it('should fail missing coming_from',async()=>{
//     let postThrow = async()=> await request(app)
//     .post('/client')
//     .send(removeProp(newClient,'coming_from'))
//     .catch(e=>{throw e})
//     .then((res:request.Response)=>[res.error.status,res.error.text]);
//     expect(await postThrow()).toEqual([422,'Missing param coming_from'])
//   })
//   it('should fail missing amount_of_children',async()=>{
//     let postThrow = async()=> await request(app)
//     .post('/client')
//     .send(removeProp(newClient,'amount_of_children'))
//     .catch(e=>{throw e})
//     .then((res:request.Response)=>[res.error.status,res.error.text]);
//     expect(await postThrow()).toEqual([422,'Missing param amount_of_children'])
//   })
//   it('should fail missing civil_status',async()=>{
//     let postThrow = async()=> await request(app)
//     .post('/client')
//     .send(removeProp(newClient,'first_name'))
//     .catch(e=>{throw e})
//     .then((res:request.Response)=>[res.error.status,res.error.text]);
//     expect(await postThrow()).toEqual([422,'Missing param first_name'])
//   })
//   it('should fail missing home_address',async()=>{
//     let postThrow = async()=> await request(app)
//     .post('/client')
//     .send(removeProp(newClient,'home_address'))
//     .catch(e=>{throw e})
//     .then((res:request.Response)=>[res.error.status,res.error.text]);
//     expect(await postThrow()).toEqual([422,'Missing param home_address'])
//   })
//   it('should fail missing foreign_address',async()=>{
//     let postThrow = async()=> await request(app)
//     .post('/client')
//     .send(removeProp(newClient,'foreign_address'))
//     .catch(e=>{throw e})
//     .then((res:request.Response)=>[res.error.status,res.error.text]);
//     expect(await postThrow()).toEqual([422,'Missing param foreign_address'])
//   })
//   it('should fail missing email',async()=>{
//     let postThrow = async()=> await request(app)
//     .post('/client')
//     .send(removeProp(newClient,'email'))
//     .catch(e=>{throw e})
//     .then((res:request.Response)=>[res.error.status,res.error.text]);
//     expect(await postThrow()).toEqual([422,'Missing param email'])
//   })
//   it('should fail missing telephone',async()=>{
//     let postThrow = async()=> await request(app)
//     .post('/client')
//     .send(removeProp(newClient,'telephone'))
//     .catch(e=>{throw e})
//     .then((res:request.Response)=>[res.error.status,res.error.text]);
//     expect(await postThrow()).toEqual([422,'Missing param telephone'])
//   })
//   it('should fail missing FK_user',async()=>{
//     let postThrow = async()=> await request(app)
//     .post('/client')
//     .send(removeProp(newClient,'FK_User'))
//     .catch(e=>{throw e})
//     .then((res:request.Response)=>[res.error.status,res.error.text]);
//     expect(await postThrow()).toEqual([422,'Missing param FK_user'])
//   })
//   it('should insert a user',async()=>{
//     let postThrow = async()=>await request(app)
//     .post('/client')
//     .send(newClient)
//     .catch(e=>{throw e})
//     .then((res:request.Response)=>{newClientId=res.body; return res.status}
//     )
//
//     expect(await postThrow()).toBe(200)
//   })
// })
// describe('Test /DELETE client',()=>{
//   let newClientId: string;
//   beforeEach(async ()=>{
//     newClientId = await request(app)
//     .post('/client')
//     .send(newClient)
//     .catch(e=>{throw e;})
//     .then((res:request.Response)=>res.body)
//   })
//   afterEach(async()=>{
//     await request(app)
//     .delete('/client')
//     .send({_id:newClientId})
//     .catch(e=>{throw e})
//
//   })
//   it('should fail no id provided',async()=>{
//     let deleteThrow = async()=>await request(app)
//     .delete('/client')
//     .send({})
//     .catch(e=>{throw e})
//     .then((res:request.Response)=>[res.error.status,res.error.text])
//     expect(await deleteThrow()).toEqual([422,'Missing param id'])
//   })
//   it('should delete a record',async()=>{
//     let deleteThrow = async()=>await request(app)
//     .delete('/client')
//     .send({_id: newClientId})
//     .catch(e=>{throw e})
//     .then((res:request.Response)=>res.status)
//     expect(await deleteThrow()).toEqual(200)
//   })
// })
// describe('Test /PUT client',()=>{
//   let newClientId: string;
//   beforeEach(async ()=>{
//     newClientId = await request(app)
//     .post('/client')
//     .send(newClient)
//     .catch(e=>{throw e})
//     .then((res:request.Response)=>res.body)
//   })
//   afterEach(async()=>{
//     newClientId = await request(app)
//     .delete('/client')
//     .send({_id:newClientId})
//     .catch(e=>{throw e})
//     .then((res:request.Response)=>res.body.text)
//   })
//   it('should fail id not defined',async()=>{
//     let putThrow = await request(app)
//     .put('/client')
//     .send({})
//     .catch(e=>{throw e})
//     .then((res:request.Response)=>[res.error.status,res.error.text])
//     expect(putThrow).toEqual([422,'Missing param _id'])
//   })
//   it('should pass',async()=>{
//     let putThrow = await request(app)
//     .put('/client')
//     .send({_id: newClientId,civil_status:15})
//     .catch(e=>{throw e})
//     .then((res:request.Response)=>res.body)
//
//
//     expect(putThrow.civil_status).toEqual(15)
//   })
// })
// describe('Test /GET clients',()=>{
//   let newClientsIds:Array<any> = []
//   beforeEach(async ()=>{
//     for(let i = 0;i<15;i++){
//       newClientsIds.push(await request(app)
//       .post('/client')
//       .send(newClient)
//       .catch(e=>{throw e})
//       .then((res:request.Response)=>res.body)
//       )
//     }
//   })
//   afterEach(async()=>{
//     for(let i = 0;i<newClientsIds.length;i++){
//       await request(app)
//       .delete('/client')
//       .send({_id: newClientsIds[i]})
//       .catch(e=>{throw e;})
//       .then()
//     }
//     newClientsIds=[]
//   })
//   it('should get first page 5 elements',async()=>{
//     let clients: any= await request(app)
//     .get('/client')
//     .send('page=1')
//     .catch(e=>{throw e})
//     .then((res:request.Response)=>res.body)
//
//     expect(clients.results.length).toBe(5)
//   })
//   it('should get second page 5 elements',async()=>{
//     let clients: any = await request(app)
//     .get('/client')
//     .send('page=2')
//     .catch(e=>{throw e})
//     .then((res:request.Response)=>res.body)
//
//     expect(clients.results.length).toBe(5)
//   })
//
// })
// function removeProp(obj:any,prop:string){
//   let newObj = JSON.parse(JSON.stringify(obj))
//   delete newObj[prop]
//   return newObj
// }
