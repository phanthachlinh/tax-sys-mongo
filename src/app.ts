// const express = require("express");
// const clientRouter = require('./api/client/client.ts');
//
// const caseRouter = require('./api/case.ts');
// import {initMongoose} from './mongoInstance';
// import * as bodyParser from "body-parser"
// export const app = express();
// initMongoose();
// var cors = require('cors');
// app.use(cors());
// app.use(bodyParser());
// app.use('/client', clientRouter);
//
// app.use('/case', caseRouter);
//
//
// if (process.env.NODE_ENV !== 'test') {
//   app.listen(8888)
// }
export default {}
export const app = {}
import { initMongoose } from './mongoInstance';
initMongoose();
const { ApolloServer, gql } = require('apollo-server');
import ClientApi from './api/client/client'
import CaseApi from './api/case/case'

import {
	GraphQLDateTime
} from 'graphql-iso-date';
const { buildFederatedSchema } = require('@apollo/federation');
const { GraphQLScalarType } = require('graphql');
const typeDefs = gql`
  type Query {
    getClients(searchTerm:String,page:Int): ClientResponse
    getCases(FK_Mongo_Client: ID,page:Int): CaseResponse

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
		async getClients(_: any, { searchTerm, page }: { searchTerm: string, page: number }, __: any) {
			return await ClientApi.getClients(searchTerm, page)
		},
		async getCases(_: any, { FK_Mongo_Client, page }: { FK_Mongo_Client: string, page: number }, __: any) {
			return await CaseApi.getCases(FK_Mongo_Client, page)
		}
	},
	Mutation: {
		async addClient(_: any, { input }: any) {
			let newClient = input;
			newClient._id = (await ClientApi.addClient(input))._id
			return newClient
		},
		async updateClient(_: any, { _id, input }: any) {
			return await ClientApi.updateClient(_id, input)

		},
		async removeClient(_: any, { _id }: any) {
			return await ClientApi.removeClient(_id)
		},
		async addCase(_: any, { input }: any) {
			return CaseApi.addCase(input)
		},
		async updateCase(_: any, { _id, country, status }: any) {
			return CaseApi.updateCase(_id, country, status)
		},
		async removeCase(_: any, { _id }: any) {
			return await CaseApi.removeCase(_id)
		},
	},
	Date: new GraphQLScalarType({
		name: 'Date',
		description: 'Date custom scalar type',
		parseValue(value: string) {

			return value; // value from the client
		},
		serialize(value: string) {
			console.log(value)
			return new Date(value); // value sent to the client
		},
	}),

}

const server = new ApolloServer({
	schema: buildFederatedSchema([{ typeDefs, resolvers }])
});

server.listen(8888).then(({ url }: { url: number }) => {
	console.log(`🚀 Server ready at ${url}`);
});
