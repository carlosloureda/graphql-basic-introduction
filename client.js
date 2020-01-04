const fetch = require("node-fetch");

const BASE_URL = "http://localhost:4000";
fetch(`${BASE_URL}/graphql`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json"
  },
  body: JSON.stringify({ query: "{ hello }" })
})
  .then(r => r.json())
  .then(data => console.log("data returned:", data));
