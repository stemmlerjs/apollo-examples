"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var apollo_server_1 = require("apollo-server");
var users = [
    { email: 'khalil@apollographql.com', password: 'tacos' }
];
// Construct a schema, using GraphQL schema language
var typeDefs = apollo_server_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  type Query {\n    hello: String\n  }\n\n  type LoginSuccess {\n    token: String!\n  }\n\n  type EmailNotFoundError {\n    message: String!\n  }\n\n  type PasswordIncorrectError {\n    message: String!\n  }\n\n  union LoginResult = LoginSuccess | EmailNotFoundError | PasswordIncorrectError\n\n  input LoginInput {\n    email: String!\n    password: String!\n  }\n\n  type Mutation {\n    login (input: LoginInput!): LoginResult!\n  }\n"], ["\n  type Query {\n    hello: String\n  }\n\n  type LoginSuccess {\n    token: String!\n  }\n\n  type EmailNotFoundError {\n    message: String!\n  }\n\n  type PasswordIncorrectError {\n    message: String!\n  }\n\n  union LoginResult = LoginSuccess | EmailNotFoundError | PasswordIncorrectError\n\n  input LoginInput {\n    email: String!\n    password: String!\n  }\n\n  type Mutation {\n    login (input: LoginInput!): LoginResult!\n  }\n"])));
// Provide resolver functions for your schema fields
var resolvers = {
    Query: {
        hello: function (root, args, context) { return "Hello world!"; }
    },
    Mutation: {
        login: function (_, args, context) {
            var _a = args.input, email = _a.email, password = _a.password;
            var emailExists = function (email) {
                return users.find(function (e) { return e.email === email; });
            };
            var isCorrectMatch = function (email, password) {
                var user = users.find(function (e) { return e.email === email; });
                return (user === null || user === void 0 ? void 0 : user.password) === password;
            };
            if (!emailExists(email)) {
                return { message: "Could not find account with that email. Have you signed up?" };
            }
            if (!isCorrectMatch(email, password)) {
                return { message: "Incorrect password." };
            }
            return { token: "bingo-bango-boom-auth-token" };
        }
    },
    LoginResult: {
        __resolveType: function (obj, context, info) {
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
var server = new apollo_server_1.ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers
});
server.listen().then(function (_a) {
    var url = _a.url;
    console.log("\uD83D\uDE80 Server ready at " + url);
});
var templateObject_1;
