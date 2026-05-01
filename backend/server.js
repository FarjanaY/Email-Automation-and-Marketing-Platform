//internal exports
const app = require("./app");
const connectDB = require("./config/connectDb");
const { PORT, HOST_URL } = require("./config/dotenvExports");

//Testing the server.
app.get("/test", (req, res) => {
  res.send("hello");
});

//server listen for website
app.listen(PORT, "0.0.0.0", () => {
  console.log(
    `Server is listening on port ${PORT} and running on ${HOST_URL}:${PORT}`,
  );
  connectDB();
});

// Alex@12345
