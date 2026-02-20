//internal exports
const app = require("./app");
const connectDB = require("./config/connectDb");
const { PORT } = require("./config/dotenvExports");

//Testing the server.
app.get("/test", (req, res) => {
  res.send("hello");
});

//server listen for website
app.listen(PORT, (req, res) => {
  console.log(
    `Server is listening on port ${PORT} and running on http://localhost:${PORT}`
  );
  connectDB();
});
