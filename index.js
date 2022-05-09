const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

const app = express();

// middleware
app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
    res.send('Running Genius Server');
});


const uri = `mongodb+srv://${process.env.USER_RABIUL}:${process.env.USER_PASS}@cluster0.ea2zl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });



async function run (){


try{
await client.connect();
const userCollection = client.db("warehouse").collection("user");


// post 
app.post("/addnewitem",async(req,res)=>{
    const newUser =req.body;
    console.log("new user",newUser);
    const result =await userCollection.insertOne(newUser);
    res.send(result);
})
}

finally{
// await client.close();
}



}

run().catch(console.dir);
app.listen(port, () => {
    console.log('Listening to port', port);
})