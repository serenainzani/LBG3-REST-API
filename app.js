// import express
const express = require('express');

//import nedb
const Datastore = require('nedb');

// import body-parser
const bodyParser= require('body-parser');

// set up the app
const app = express();

// set up a new database
const db = new Datastore();

// add body-parsing functionality to the app
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// global variable for id
let id = 1;

// small get method to test express.js is working
// app.get('/', (req,res) => {
//     res.end('Hello world!');
// });

// CREATE (Post)
app.post('/create', (req,res) => {
    // log that we are running the create operation
    console.log(`\nCreate - POST`);
    // create an item from the request body
    let item = { name : req.body.name, _id : id }
    // increment our id by one
    id++;

    // insert the item into our Database
    db.insert(item, (err, item) => {
        //if there is an error, send back the error
        if (err) res.send(err);
        // otherwise 201 - Created and the item
        res.status(201).send(item);
        //log that item to console
        console.log(`Created item: ${JSON.stringify(item)}`);
    });
});

// READ ALL (Get)
app.get('/read', (req,res) => {
    // log that we are running the read operation
    console.log(`\nRead - GET`);

    // reading all items from database
    db.find({}, (err, items) => {
        //if there is an error, send back the error
        if (err) res.send(err);
        // otherwise 200 - OK
        res.status(200).send(items);
        //log the items to console
        console.log(`Reading items: ${JSON.stringify(items)}`);
    });
});

// READ ONE (Get)
app.get('/read/:id', (req,res) => {
    // log that we are running the read operation
    console.log(`\nRead - GET`);

    // reading item from database by id
    db.find({_id : parseInt(req.params.id)}, (err, item) => {
        //if there is an error, send back the error
        if (err) res.send(err);
        // otherwise 200 - OK
        res.status(200).send(item);
        //log the item to console
        console.log(`Reading item: ${JSON.stringify(item)}`);
    });
});

// DELETE (Delete)
app.delete('/delete/:id', (req,res) => {
    // log that we are running the delete operation
    console.log(`\nDelete - DELETE`);

    // deleting item from database by id
    db.remove({_id : parseInt(req.params.id)}, (err, itemID) => {
        //if there is an error, send back the error
        if (err) res.send(err);
        // otherwise 204 - no content
        res.sendStatus(204);//.send(itemID);
        //log the item id to console
        console.log(`Deleted item id: ${JSON.stringify(itemID)}`);
    });
});

// set up the app to listen on a desired port
app.listen(8080, () => {
    console.log(`API running on localhost:8080`);
})