const express = require("express");
const app = express();

//body parser, this allows us to handle raw json response
app.use(express.json());
// this allows us to handle url encoded data

app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT || 5000;

//members api routes
app.use("/api/members", require("./routes/api/userApi"));

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
