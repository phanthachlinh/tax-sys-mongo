process.env.NODE_ENV = 'test'
import {createTestClient} from 'apollo-server-testing';
import {gql} from 'apollo-server'
import server from '../../app'
const {query} = createTestClient(server)
it('fsd',async()=>{
  let res:any = await query({
    query: `query est{est}`
  })
  expect(res.data.est).toBe(true)
})
