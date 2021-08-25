//import node dependencies
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path")
const authRoute = require("./routes/Auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/post");


//init app
const app = express();
const PORT = process.env.PORT || 5000;

app.get('/', (req, res)=>{
  res.sendFile(path.resolve(__dirname) + '/index.html')
})

//middleware
app.use(express.json());

//mongodb connection
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true,
  })
  .then(console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);

//server listining..
app.listen(PORT, () => console.log("Server is running.."));
