import { initMongoose } from './mongoInstance';
initMongoose();
import mocks from './app.mocks'
const { ApolloServer, gql } = require('apollo-server');
import clientQueries from './api/client/client.query'
const { buildFederatedSchema } = require('@apollo/federation');
const { GraphQLScalarType } = require('graphql');
const typeDefs = gql`
  type Query {
    getClients(searchTerm:String,page:Int): ClientResponse
    getCases(FK_Mongo_Client: ID,page:Int): CaseResponse
    est:Boolean
  }
  type Mutation{

      addCase(input:CaseInput):Case
      updateClient(_id:String,input:ClientInput):Boolean
      removeClient(_id:String):Boolean
      addClient(input:ClientInput):Client
      updateCase(_id:String,country:String,status:Int):Boolean
      removeCase(_id:String):Boolean

  }
  type ClientResponse{
      count: Int
      results: [Client]
  }
  type CaseResponse{
      count: Int
      results: [Case]
  }
    type Client{
        _id: ID,
        amount_of_children: Int,
        civil_status: Int,
        coming_from: Int,
        date_created: Date,
        date_of_birth: String,
        email: String,
        first_name: String,
        foreign_address: String,
        home_address: String,
        last_name: String,
        telephone: String,

    }
    input ClientInput{
        amount_of_children: Int,
        civil_status: Int,
        coming_from: Int,
        date_created: Date,
        date_of_birth: String,
        email: String,
        first_name: String,
        foreign_address: String,
        home_address: String,
        last_name: String,
        telephone: String,
    }
    type Case {
        _id: ID,
        status: Int,
        country: String,
        date_created: Date,
        FK_User: Int,
        FK_Mongo_Client: String
    }
    input CaseInput {
        status: Int,
        country: String,
        date_created: Date,
        FK_User: Int,
        FK_Mongo_Client: String
    }
    scalar Date
`;

const resolvers = {
	Query: {
    est:()=>true,
		...clientQueries
	},
	Mutation: {


	},
	Date: new GraphQLScalarType({
		name: 'Date',
		description: 'Date custom scalar type',
		parseValue(value: string) {

			return value; // value from the client
		},
		serialize(value: string) {
			return new Date(value); // value sent to the client
		},
	}),

}
let schemaSetup:Array<any>;
if(process.env.NODE_ENV === 'test')
	schemaSetup = [{ typeDefs, resolvers,mocks }]
else
		schemaSetup = [{ typeDefs, resolvers}]

const server = new ApolloServer({
	schema: buildFederatedSchema(schemaSetup),
	mockEntireSchema: process.env.NODE_ENV === 'test'?true:false
});
export default server;

  server.listen(8888).then(({ url }: { url: number }) => {
    if(process.env.NODE_ENV !== 'test')
  	console.log(`🚀 Server ready at ${url}`);
  });
