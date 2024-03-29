const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const proxy = require('http-proxy-middleware')



require('dotenv').config();

const app = express();


//Static assets 
if(process.env.NODE_ENV == 'production'){
  //static folder
  app.use(express.static('build'));
  app.get('*',(req,res) =>{
    res.sendFile(path.resolve(__dirname,'build','index.html'));
  });
}

app.set( 'port', ( process.env.PORT || 5000 ));
//const port = process.env.PORT || "mongodb+srv://new-user-1990:GdcI4vSXL6UdD4NL@cluster0-cztmw.mongodb.net/test?retryWrites=true&w=majority";

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true , useUnifiedTopology: true }
);
  

const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})


const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);


app.listen( app.get( 'port' ), function() {
  console.log( 'Node server is running on port ' + app.get( 'port' ));
  });