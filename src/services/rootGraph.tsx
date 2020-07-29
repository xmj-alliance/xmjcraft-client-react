// import React from "react";
import { ApolloClient, HttpLink, InMemoryCache, defaultDataIdFromObject } from '@apollo/client';

const client = new ApolloClient({
  cache: new InMemoryCache({
    dataIdFromObject: (object: any) => {
      switch (object.__typename) {
        case "user": 
          return object.dbname;
        default:
          return defaultDataIdFromObject(object);
      }
    }
  } as any),
  link: new HttpLink({
    uri: "http://localhost:3000/gql",
  }),
});

export default client;

// {
//   dataIdFromObject: object => {
//     switch (object.__typename) {
//       case 'foo': return object.key; // use the `key` field as the identifier
//       case 'bar': return `bar:${object.blah}`; // append `bar` to the `blah` field as the identifier
//       default: return defaultDataIdFromObject(object); // fall back to default handling
//     }
//   }
// }