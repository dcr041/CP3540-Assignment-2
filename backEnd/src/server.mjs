import express from 'express';

import {MongoClient} from 'mongodb';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, '/build')));

app.use(express.json());

const client = new MongoClient('mongodb://localhost:27017');

app.post('/api/addMovie', async (req, res) => {
    try {
        await client.connect();

        const db = client.db('movies')

        const movieInfo = await db.collection('mymovies').insertOne(req.body);

        res.sendStatus(200).json(movieInfo);

        client.close();
    }
    catch( error ) {
        res.sendStatus(500);
    }
});

app.post('/api/removeMovie', async (req, res) => {
    try {
        
        await client.connect();

        const db = client.db('movies')

        const movieInfo = await db.collection('mymovies').deleteOne({name:req.body.name});
        console.log(movieInfo);

        if( movieInfo.deletedCount == 1) {
            res.status(200).json({message: `Movie ${req.body.name} deleted`});
        }
        else {
            res.status(200).json({message: "Unable to delete movie"});
        }
        client.close();
    }
    catch( error) {
        res.status(500).json( { message: "Error connecting to db", error});
    }
});

app.get('/api/data', async (req, res) => {
    try {
        
        await client.connect();

        const db = client.db('movies')

        const movieInfo = await db.collection('mymovies').find({}).toArray();

        res.status(200).json(movieInfo);

        client.close();
    }
    catch( error ) {
        res.sendStatus(500);
    }
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/build/index.html'));
});

app.listen( 8000, () => console.log( "server is listening on port 8000"));