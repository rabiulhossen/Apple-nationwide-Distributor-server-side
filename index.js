const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require('mongodb');


const app = express();

// middleware
app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
    res.send('Running Genius Server');
});


const uri = "mongodb+srv://Rabiulhossen:<password>@cluster0.ea2zl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run (){
try{
await client.connect();
const userCollection = client.db("warehouse").collection("user")
}

finally{
// await client.close();
}



}

run().catch(console.dir);
app.listen(port, () => {
    console.log('Listening to port', port);
})