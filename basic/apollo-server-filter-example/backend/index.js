
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
  { id: '1', name: `Paul's Boutique` },
  { id: '2', name: 'Thriller' },
  { id: '3', name: 'London Calling' },
]

const resolvers = {
  Query: {
    albums: (_, args, ___) => {
      let result = albums;

      const shouldApplyNameFilter = args.input && args.input.name;

      if (shouldApplyNameFilter) {
        const nameFilter = args.input.name;

        result = result.filter((r) => r.name.toLowerCase()
          .indexOf(nameFilter.toLowerCase()) !== -1);
      }

      console.log(args)

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