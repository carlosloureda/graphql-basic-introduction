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
