
const { ApolloServer, gql } = require('apollo-server');

const resolvers = {
  Query: {
    hello: (_, args) => {
      let value;
      if (args.name) {
        value = `Hello ${args.name}, nice to meet you!`
      } else {
        value = `Hello, nice to meet you!`
      }
      return { value }
    }
  }
}

const typeDefs = gql`
  type Hello {
    value: String
  }

  type Query {
    hello(name: String): Hello
  }
`

const server = new ApolloServer({
  resolvers,
  typeDefs
})

server.listen().then(({ port }) => {
  console.log(`Server started on port: ${port}`)
})