
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache()
});

client
  .query({
    query: gql`
      query GetHelloWorld {
        hello 
      }
    `
  })
  .then(result => console.log(result));

export { client };