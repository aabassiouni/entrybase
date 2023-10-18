const express = require("express");
const bodyParser = require("body-parser");
const postgres = require("postgres");
require("dotenv").config();

const app = express();
const PORT = 3001;

// Hypothetical database
const database = {
  users: [],
};

// app.js

let { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID } = process.env;

const sql = postgres({
  host: PGHOST,
  database: PGDATABASE,
  username: PGUSER,
  password: PGPASSWORD,
  port: 5432,
  ssl: "require",
  connection: {
    options: `project=${ENDPOINT_ID}`,
  },
});

async function getPgVersion() {
  const result = await sql`select version()`;
  console.log(result);
}

getPgVersion();

// Middleware
app.use(bodyParser.json());

// Signup route
app.post("/signup",async (req, res) => {
  console.log("// Signup route");
  const email = req.body.email;
  console.log("email is ", email);

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  // Check if email already exists
  if (database.users.includes(email)) {
    return res.status(400).json({ error: "Email already registered" });
  }

  const result = await sql`insert into signups (email) values (${email}) returning *`;

  // Add to the database
  database.users.push(email);

  res.status(200).json({ message: "Signup successful" });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
