const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path= require('path');

require("dotenv").config();
// console.log(process.env.db);

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.db);
  console.log('db connected');
}

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  quote: String
});

const User = mongoose.model('User', userSchema);

const app = express();

app.use(cors());
app.use(bodyParser.json());

//static files
app.use(express.static(path.join(__dirname, '../assignment/build')))

app.get('*',function(req,res){
  res.sendFile(path.join(__dirname,"../assignment/build/index.html"));
});

app.post('/demo', async(req, res) => {
  let user = new User();
  user.username=req.body.username;
  user.email=req.body.email;
  user.quote=req.body.quote;
  const doc=await user.save();

  console.log(doc)
  res.send(doc);
})

app.get('/demo', async(req,res) => {
  const docs = await User.find({});
  res.json(docs);
})

app.listen(process.env.port, console.log('Server is running on port 5000'));                                                              