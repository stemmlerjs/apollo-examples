
const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`
  type Album {
    id: ID
    name: String
  }

  input AlbumsInputFilter {
    id: ID
    name: String
  }

  type Query {
    albums(input: AlbumsInputFilter): [Album]
  }
`

const albums = [
  { id: '1', name: 'Prayers on Fire' },
  { id: '2', name: 'Bad Faith' }
]

const resolvers = {
  Query: {
    albums: (_, args, ___) => {
      console.log(_, args, ___)
      let result = albums;

      const shouldApplyNameFilter = args.input && args.input.name;

      if (shouldApplyNameFilter) {
        result = result.filter((r) => r.name.indexOf(args.name) !== -1)
      }

      console.log(result);

      return result;
    }
  }
}

const server = new ApolloServer({
  resolvers,
  typeDefs
})

server.listen().then(({ port }) => {
  console.log(`Server started on port: ${port}`)
})