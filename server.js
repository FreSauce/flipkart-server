const dotenv = require("dotenv");
const mongoose = require("mongoose");


dotenv.config({ path: "./config.env" });

const PORT = process.env.PORT || 8080;
const DB = process.env.DATABASE_STRING;

console.log(DB);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((_) => {
    console.log("database successfully connected");
  });

const app = require("./app");
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
