
import { ApolloServer, gql } from "apollo-server";

const users = [
  { email: 'khalil@apollographql.com', password: 'tacos' }
]

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query {
    hello: String
  }

  type LoginSuccess {
    token: String!
  }

  type EmailNotFoundError {
    message: String!
  }

  type PasswordIncorrectError {
    message: String!
  }

  union LoginResult = LoginSuccess | EmailNotFoundError | PasswordIncorrectError

  input LoginInput {
    email: String!
    password: String!
  }

  type Mutation {
    login (input: LoginInput!): LoginResult!
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    hello: (root: any, args: any, context: any) => "Hello world!"
  },
  Mutation: {
    login: (_: any, args: any, context: any) => {
      const { email, password } = args.input;

      const emailExists = (email: string) => {
        return users.find((e) => e.email === email)
      };
      
      const isCorrectMatch = (email: string, password: string) => {
        const user = users.find((e) => e.email === email);
        return user?.password === password;
      };

      if (!emailExists(email)) {
        return { message: "Could not find account with that email. Have you signed up?" };
      }

      if (!isCorrectMatch(email, password)) {
        return { message: "Incorrect password." }
      }
      
      return { token: "bingo-bango-boom-auth-token" }
    }
  },
  LoginResult: {
    __resolveType (obj: any, context: any, info: any){
      if (obj.token) {
        return 'LoginSuccess';
      }

      if (obj.message && obj.message.indexOf('email')) {
        return 'EmailNotFoundError';
      }

      if (obj.message && obj.message.indexOf('password')) {
        return 'PasswordIncorrectError';
      }

      return null; // GraphQLError is thrown
    },
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.listen().then(({ url }: { url: string }) => {
  console.log(`🚀 Server ready at ${url}`);
});