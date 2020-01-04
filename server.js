var express = require("express");
var graphqlHTTP = require("express-graphql");
var { buildSchema } = require("graphql");

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Query {
    hello: String
    allPersons: [Person]
  },
  type Post {
    id: Int!
    title: String!
    author: Person!
  },
  type Person {
    username: String!
    name: String!
    age: Int!
    posts: [Post!]!
  }
`);
const mockedPosts = {
  1: {
    id: 1,
    title: "Hello World GraphQL",
    author: "carlosloureda"
  },
  2: {
    id: 2,
    title: "Graphql + React",
    author: "carlosloureda"
  },
  3: {
    id: 3,
    title: "Hi There! This is my first post",
    author: "johndoe"
  }
};

const mockedPersons = {
  carlosloureda: {
    name: "Carlos Loureda",
    username: "carlosloureda",
    age: 39,
    posts: [1, 2]
  },
  johndoe: {
    name: "John Doe",
    username: "johndoe",
    age: 33,
    posts: [3]
  }
};
// The root provides a resolver function for each API endpoint
var root = {
  hello: () => {
    return "Hello world!";
  },
  allPersons: () => {
    return Object.values(mockedPersons).map(person => {
      person.posts =
        person.posts && person.posts.map(postId => mockedPosts[postId]);
      return person;
    });
  }
};

var app = express();

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
  })
);
app.listen(4000);
console.log("Running a GraphQL API server at http://localhost:4000/graphql");
