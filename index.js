const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

require('dotenv').config();

const port = process.env.PORT || 5000;

const app = express();


app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.dl1tykd.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const taskCollections = client.db('taskPortal').collection('taskName');
        const addTaskCollections = client.db('taskPortal').collection('AddTask');
        const myTaskCollections = client.db('taskPortal').collection('myTask');
        const completeTaskCollections = client.db('taskPortal').collection('completeTask');

        // app.get('/taskName', async (req, res) => {
        //     const query = {};
        //     const options = await taskCollections.find(query).toArray();
        //     res.send(options)
        // })

        app.get('/addTask', async (req, res) => {
            const query = {};
            const result = await addTaskCollections.find(query).toArray();
            res.send(result)
        })

        app.post('/addTask', async (req, res) => {
            const task = req.body;
            const result = await addTaskCollections.insertOne(task);
            res.send(result)
        })

        app.delete('/addTask/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: ObjectId(id) };
            const result = await addTaskCollections.deleteOne(filter);
            res.send(result);
        })

        app.get('/addTask/:id', async (req, res) => {
            const id = req.params.id;
            console.log(id)
            // const filter = { _id: id };
            const query = { _id: ObjectId(id) };
            const result = await addTaskCollections.findOne(query);
            res.send(result)
        })

          app.put('/addTask/:id', async(req, res) =>{
            const id = req.params.id;
            const filter = { _id: ObjectId(id) };
            const user = req.body;
            // console.log(user)
            const option = {upsert: true};
            const updateUser = {
                $set: {
                    task: user.task,
                }
            }
         const result = await addTaskCollections.updateOne(filter, updateUser, option);
         res.send(result);
            
        })

        app.post('/myTask', async (req, res) => {
            const task = req.body;
            const result = await myTaskCollections.insertOne(task);
            res.send(result)
        })
        app.get('/myTask', async (req, res) => {
            const query = {};
            const result = await myTaskCollections.find(query).toArray();
            res.send(result)
        })
        app.get('/myTask/:id', async (req, res) => {
            const id = req.params.id;
            console.log(id)
            // const filter = { _id: id };
            const query = { _id: ObjectId(id) };
            const result = await myTaskCollections.find(query).toArray();
            res.send(result)
        })

        app.delete('/myTask/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: ObjectId(id) };
            const result = await myTaskCollections.deleteOne(filter);
            res.send(result);
        })

        app.get('/completeTask', async (req, res) => {
            const query = {};
            const result = await completeTaskCollections.find(query).toArray();
            res.send(result)
        })

        app.post('/completeTask', async (req, res) => {
            const task = req.body;
            const result = await completeTaskCollections.insertOne(task);
            res.send(result)
        })
        app.delete('/completeTask/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: ObjectId(id) };
            const result = await completeTaskCollections.deleteOne(filter);
            res.send(result);
        })
    }
    finally {

    }
}
run().catch(console.log)


app.get('/', async (req, res) => {
    res.send('task is running')
})


app.listen(port, () => console.log(`Used products resell server running on ${port}`))
