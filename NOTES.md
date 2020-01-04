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

We need to build some **Query** types and a **API root resolver** for each API endpoint.

Run the code with `node server.js` and see the program print the data fetched:

```
    { data: { hello: 'Hello world!' } }
```
