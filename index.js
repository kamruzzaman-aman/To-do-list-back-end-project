const ToDoServer = require('./app');
const mongoose = require("mongoose");
require("dotenv").config();
// require("dotenv").config({path:'./config.env'});


// server
const port = process.env.PORT || 8000;
// Connect to DB and start server
mongoose
  .connect(process.env.DATABASE)
  .then(() => {
    ToDoServer.listen(port, () => {
      console.log(`Server Running on port ${port}`);
    });
  })
  .catch((err) => console.log(err));