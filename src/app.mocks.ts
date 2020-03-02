import IClient from "./api/client/client.d"

let clients: Array<IClient> = [
  {"_id":"5e249aa415d6765c412cc4ba","first_name":"Sheeree","last_name":"Garlette","coming_from":3,"date_of_birth":"12/22/1980",date_created:"2011-10-05T14:48:00.000Z","civil_status":2,"amount_of_children":6,"home_address":"08 Jenifer Terrace","foreign_address":"05 Lakewood Hill","email":"sgarlette0@google.pl","telephone":"9763203306",FK_User:1},
  {"_id":"5e249aa415d6765c412cc4ba","first_name":"Marietta","last_name":"Finlator","coming_from":1,"date_of_birth":"7/19/1973",date_created:"2011-10-05T14:48:00.000Z","civil_status":3,"amount_of_children":5,"home_address":"10 Lukken Point","foreign_address":"40 Kenwood Lane","email":"mfinlator1@nytimes.com","telephone":"3496671185",FK_User:1},
  {"_id":"5e249aa415d6765c412cc4ba","first_name":"Myrtice","last_name":"Glowacz","coming_from":3,"date_of_birth":"4/26/1961",date_created:"2011-10-05T14:48:00.000Z","civil_status":2,"amount_of_children":4,"home_address":"99957 Anhalt Road","foreign_address":"22336 Fulton Park","email":"mglowacz2@harvard.edu","telephone":"2173551090",FK_User:1},
  {"_id":"5e249aa415d6765c412cc4ba","first_name":"Torrin","last_name":"Getch","coming_from":1,"date_of_birth":"5/31/1955",date_created:"2011-10-05T14:48:00.000Z","civil_status":2,"amount_of_children":7,"home_address":"63 Caliangt Lane","foreign_address":"93 Manufacturers Way","email":"tgetch3@virginia.edu","telephone":"5572636912",FK_User:1},
  {"_id":"5e249aa415d6765c412cc4ba","first_name":"Aarika","last_name":"Flindall","coming_from":1,"date_of_birth":"10/15/1991",date_created:"2011-10-05T14:48:00.000Z","civil_status":1,"amount_of_children":8,"home_address":"08284 Beilfuss Place","foreign_address":"1 Shasta Court","email":"aflindall4@independent.co.uk","telephone":"2895656979",FK_User:1},
];
export default {
  ClientResponse:{
    count:5,
    results: clients
  }
}
