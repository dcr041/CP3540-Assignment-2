import express from 'express';

import {MongoClient} from 'mongodb';
import path from 'path';
import { fileURLToPath } from 'url';

import bodyParser from 'body-parser';
import multer from 'multer';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const upload = multer({ filename: (req, file) => {file.originalname;}, dest: "./src/build/images/"});

app.use(express.static(path.join(__dirname, '/build')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const uploadFiles = async (req, res) => {
    try {
        const client = await MongoClient.connect('mongodb://localhost:27017', {useNewUrlParser: true});

        const db = client.db('movies');

        await db.collection('mymovies').insertOne({
            name:req.body.name, 
            date:req.body.date, 
            stars:req.body.stars.split(", "), 
            poster:"/images/" + req.file.filename, 
            rating:req.body.rating
        });

        const movieInfo = await db.collection('mymovies').find({}).toArray();

        res.status(200).json({message: "Success", movies: movieInfo});

        client.close();
    }
    catch( error ) {
        res.status(500).json( { message: "Error connecting to db", error});
    }
}

app.post('/api/addReview', upload.single("poster"), uploadFiles);

app.post('/api/removeMovie', async (req, res) => {
    try {
        
        const client = await MongoClient.connect('mongodb://localhost:27017', {useNewUrlParser: true});

        const db = client.db('movies');

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
        
        const client = await MongoClient.connect('mongodb://localhost:27017', {useNewUrlParser: true});

        const db = client.db('movies');

        const movieInfo = await db.collection('mymovies').find({}).toArray();
        console.log(movieInfo);
        res.status(200).json(movieInfo);

        client.close();
    }
    catch( error ) {
        res.status(500).json( { message: "Error connecting to db", error});
    }
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/build/index.html'));
});

app.listen( 8000, () => console.log( "server is listening on port 8000"));