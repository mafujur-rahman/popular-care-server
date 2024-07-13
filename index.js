const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.zjwopdy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // await client.connect();
    
    // database collections
    const blogCollection = client.db('popularDB').collection('blog')


    // post and get newBlog
    app.post("/blogs", async (req, res) =>{
        const newBlog = req.body;
        const result = await blogCollection.insertOne(newBlog);
        res.send(result);
    });

    app.get('/blogs', async(req,res) =>{
        const result = await blogCollection.find().toArray();
        res.send(result);
    })




    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);




app.get('/', (req, res) => {
    res.send("Poplar Care server is running")
})

app.listen(port, ()=>{
    console.log(`popularCare server is running on port:${port}`);
})