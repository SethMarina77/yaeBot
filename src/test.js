const dotenv = require("dotenv");
dotenv.config();  // This loads the environment variables from your .env file

console.log(process.env.OPENAI_API_KEY);