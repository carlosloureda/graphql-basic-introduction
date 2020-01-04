# Installation

## Requirements

- Node v6

- Create a new folder and create a new node project with graphQL dependencies:

```bash
npm init
npm install graphQL --save
```

- Edit entry point to be `server.js` instead of `index.js` and create that file

# How GraphQL works

_BRANCH: `hello-world-graphql`_

We need to build some **Query** types and a **API root resolver** for each API endpoint.

Run the code with `node server.js` and see the program print the data fetched:

```
    { data: { hello: 'Hello world!' } }
```

# Lets implement express to see it in action

_BRANCH: `hello-world-express-graphql`_

Let's add express and graphql related packages

```bash
npm install express express-graphql --save
```

Now we update the server.js with the code and run it again with the same `node server.js` command. If we go to [http://localhost:4000/graphql](http://localhost:4000/graphql) we will see the interactive **GraphiQL** panel tool.

| This is thanks to the property `graphiql: true` added while setting the graphqlHTTP.

This will be our playground :)

## Fire GraphQL Queries

If we go to our code in the `server.js` file we see that we only added a Query,
the _hello_ query:

```js
var schema = buildSchema(`
  type Query {
    hello: String
  }
`);
```

So now we can add this query on the left panel and see the results on the right panel:

```graphQL
{
    hello
}
```

Seeing this results:

```graphQL
{
    "data":  {
        "hello": "Hello world!"
    }
}
```

# Query from Client

_BRANCH: `query-from-client`_

As now we have an API endpoint we can query this route with **curl** on the command line:

```bash
curl -X POST \
-H "Content-Type: application/json" \
-d '{"query": "{ hello }"}' \
http://localhost:4000/graphql
```

But if you want to do it on Javascript we can create a `client.js` file to run the client code:

```js
const fetch = require("node-fetch");

const BASE_URL = "http://localhost:4000";

fetch("`${BASE_URL}/graphql", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json"
  },
  body: JSON.stringify({ query: "{ hello }" })
})
  .then(r => r.json())
  .then(data => console.log("data returned:", data));
```

You first need to install `node-fetch`:

```bash
npm i node-fetch --save
```

# Create real queries

_BRANCH: `adding-real-queries`_

So until we had a _hello_ query just was hardcoded so it would be nice to have some practice with more realistic queries.

So first we have to create some **types** in our data schema like:

- Person
- Posts

So we can fetch later information of person or posts or related data between them, but GraphQL first asks for having this information upfront:

```
var schema = buildSchema(`
  type Query {
    hello: String
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
```

So lets create our first query:

```
  type Query {
    hello: String
    allPersons: [Person]
  },
```

We want a simple query that will give us all the people (`allPersons`) in our system. For doing that remember that GraphQL is just a query tool so we need to have our data somewhere and fetch it to return it on GraphQL. So for this lesson let's just add some mocked data:

```
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
```

Now we are able to create a _resolver_ for our new query, this will be something like this (inside our _rootValue_ object):

```
var root = {
  . . .,
  allPersons: () => {
    return Object.values(mockedPersons).map(person => person);
  }
};
```

Now open the GraphiQL interpeter and enjoy!

You can run simple query as:

```
{
  allPersons{
    name
  }
}
```

Or get a lot more of information

```
{
  allPersons{
    name,
    age,
    username
  }
}
```

But if we try to fetch the `posts` the grahiql interpeter just adds a return id value and this query fails:

```
{
  allPersons{
    name,
    age,
    username,
    posts{
        id
    }
  }
}
```

"message": "Cannot return null for non-nullable field Post.id.",

This is because in our resolver we just return the array with postsIds from posts
and not a `Post` schema, so lets return it properly:

```
allPersons: () => {
    return Object.values(mockedPersons).map(person => {
        person.posts =
        person.posts && person.posts.map(postId => mockedPosts[postId]);
        return person;
    });
}
```

So now that we return the posts for each postId entry on the Person object now we can do this query:

```
{
  allPersons{
    name,
    age,
    username,
    posts{
        id
    }
  }
}
```

or this other one with everything:

```
{
  allPersons{
    name,
    age,
    username,
    posts{
        id,
        title
    }
  }
}
```

We will be having the same erro while querying `author` so that is the next step to solve!
