const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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
const userCollection = client.db("appleDistributor").collection("product");

app.get('/inventory',async (req,res)=>{

    const query ={};
    const cursor = userCollection.find(query);
    const product = await cursor.toArray();
     res.send(product);
});

app.get('/inventory/:id', async(req,res) =>{
    const id= req.params.id;
    console.log(id);
    const query ={_id:ObjectId(id)}
    const products =await userCollection.findOne(query);
    res.send(products)

})





// post 
app.post('/inventory',async(req,res)=>{
    const newUser =req.body;
    console.log("new user",newUser);
    const result =await userCollection.insertOne(newUser);
    res.send(result);
})


// Delete 
app.delete('/inventory/:id', async(req,res)=>{
   
    const id = req.params.id;
  
    const query ={_id:ObjectId(id)};
    const result = await userCollection.deleteOne(query);
    res.send(result);
   
})

// update 
app.put('/inventory/:id', async(req,res)=>{
    const id = req.params.id;
const query = {_id:ObjectId(id)};
const result = await userCollection.updateOne(query)
res.send(result);
});

}

finally{
// await client.close();
}



}

run().catch(console.dir);
app.listen(port, () => {
    console.log('Listening to port', port);
})