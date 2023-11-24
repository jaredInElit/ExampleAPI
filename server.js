const express = require('express');
const BookLibrary = require('./bookLibrary.js');
const { MongoClient } = require('mongodb');
require('dotenv').config();
const cors = require('cors');


const app = express()
app.use(cors());;
const myLibrary = new BookLibrary();
const dbUrl = process.env.MONGODB_URI;
const dbName = 'myLibrary';
const client = new MongoClient(dbUrl, {useUnifiedTopology: true});

app.use(express.json());

app.get('/books', async (req,res) => {
    try {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection('books');
        const books = await collection.find({}).toArray();
        res.status(200).json(books);
    } catch (e) {
        res.status(500).json({error: e.message});
    } finally {
        await client.close();
    }
});

app.post('/books', async (req,res) => {
    try {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection('books');

        const insertResult = await collection.insertOne(req.body);
        res.status(201).json(insertResult);
    } catch (e) {
        res.status(500).json({error: e.message });
    } finally {
        await client.close();
    }
});

app.get('/books/:title', (req, res) => {
    const title = req.params.title;
    const book = myLibrary.findBookByTitle(title);
    if (book) {
        res.json(book);
    } else {
        res.status(404).send('Book not found');
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log('Server running on port ${PORT}');
});