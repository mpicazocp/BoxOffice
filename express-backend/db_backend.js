/* eslint-disable linebreak-style */
/* eslint-disable space-before-function-paren */
/* eslint-disable object-curly-spacing */
const express = require('express');
const cors = require('cors');

const userServices = require('./models/user-services');
const mediaServices = require('./models/media-services');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// HTTP get request for the root view of the backend
app.get('/', async (req, res) => {
    res.send('Welcome to the BoxOffice database. Navigate' +
    ' to /users or /media for access to our collections.');
});

/* ########################## begin user requests ###########################*/

// HTTP GET request, can be filtered by user attributes
// passed in through the request query
app.get('/users', async (req, res) => {
    const email = req.query['email'];
    const pwsd = req.query['password'];
    const medList = req.query['mediaList'];
    try {
        const result = await userServices.getUsers(email, pwsd, medList);
        res.send({ users_list: result });
    } catch (error) {
        console.log(error);
        res.status(500).send('An error ocurred in the server.');
    }
});

// HTTP GET request that specifically returns
// all user objects with ID matches to the request query
app.get('/users/:id', async (req, res) => {
    const id = req.params['id'];
    const result = await userServices.findUserById(id);
    if (result === undefined || result === null) {
        res.status(404).send('Resource not found.');
    } else {
        res.send({ users_list: result });
    }
});

// HTTP POST request, creates a new User
// from the object passed into the request body
app.post('/users', async (req, res) => {
    const user = req.body;
    const savedUser = await userServices.addUser(user);
    if (savedUser) {
        res.status(201).send(savedUser).end();
    } else {
        res.status(500).end();
    }
});

// HTTP DELETE request, removes a User object
// based on ID matches
app.delete('/users/:id', async (req, res) => {
    const id = req.params['id'];
    const result = await userServices.findByIdAndDelete(id);
    console.log(JSON.stringify(result));
    if (result) {
        res.status(204).send();
    } else {
        res.status(404).send('Resource not found.');
    }
});

// HTTP PATCH request, finds a User object by
// matching ID and updates it using the object
// passed into the request body
app.patch('/users/:id', async (req, res) => {
    // to update mediaList for user, take as input a
    // JSON object containing a mediaList attribute
    // containing JSON objects of the following form:
    // { mediaId: <required, String>, streamingService: <required, String>,
    // contentType: <required, String>, currentSeason: <optional, Number>,
    // currentEpisode: <optional, Number>, currentHours: <required. Number>
    // currentMinutes: <required, Number>}
    const userId = req.params['id'];
    const patchObj = req.body;
    const savedUser = await userServices.patchUser(userId, patchObj);
    if (savedUser) {
        res.status(200).end();
    } else {
        res.status(500).end();
    }
});

/* ########################### end user requests ############################*/

/* ########################### begin media requests #########################*/

// HTTP GET request, can be filtered by media attributes
// passed in through the request query
app.get('/media', async (req, res) => {
    const name = req.query['name'];
    const img = req.query['img'];
    const desc = req.query['desc'];
    try {
        const result = await mediaServices.getMedia(name, img, desc);
        res.send({ media_list: result });
    } catch (error) {
        console.log(error);
        res.status(500).send('An error ocurred in the server.');
    }
});

// HTTP GET request that specifically returns
// all media objects with ID matches to the request query
app.get('/media/:id', async (req, res) => {
    const id = req.params['id'];
    const result = await mediaServices.findMediaById(id);
    if (result === undefined || result === null) {
        res.status(404).send('Resource not found.');
    } else {
        res.send({ media_list: result });
    }
});

// HTTP POST request, creates a new Media
// from the object passed into the request body
app.post('/media', async (req, res) => {
    const media = req.body;
    const savedMedia = await mediaServices.addMedia(media);
    if (savedMedia) {
        res.status(201).send(savedMedia);
    } else {
        res.status(500).end();
    }
});

// HTTP DELETE request, removes a Media object
// based on ID matches
app.delete('/media/:id', async (req, res) => {
    const id = req.params['_id'];
    const result = await mediaServices.findByIdAndDelete(id);
    console.log(JSON.stringify(result));
    if (result) {
        res.status(204).send();
    } else {
        res.status(404).send('Resource not found.');
    }
});

/* ########################### end media requests ###########################*/

// connect to Database, prioritizing the connection to the Atlas DB
// and falling back to a local port otherwise
module.exports = app;
app.listen(process.env.PORT || port, () => {
    if (process.env.PORT) {
        console.log(`REST API on Atlas is listening` +
        `on port: ${process.env.PORT}.`);
    } else console.log(`REST API is listening on local port: ${port}.`);
});
