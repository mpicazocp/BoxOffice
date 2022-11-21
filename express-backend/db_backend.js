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

app.get('/', async (req, res) => {
  // eslint-disable-next-line max-len
  res.send('Welcome to the BoxOffice database. Navigate to /users or /media for access to our collections.');
});

/* ########################## begin user requests ###########################*/

app.get('/users', async (req, res) => {
  const email = req.query['email'];
  const pwsd = req.query['password'];
  const medList = req.query['media_list'];
  try {
    const result = await userServices.getUsers(email, pwsd, medList);
    res.send({ users_list: result });
  } catch (error) {
    console.log(error);
    res.status(500).send('An error ocurred in the server.');
  }
});

app.get('/users/:id', async (req, res) => {
  const id = req.params['id'];
  const result = await userServices.findUserById(id);
  if (result === undefined || result === null) {
    res.status(404).send('Resource not found.');
  } else {
    res.send({ users_list: result });
  }
});

app.post('/users', async (req, res) => {
  const user = req.body;
  const savedUser = await userServices.addUser(user);
  if (savedUser) {
    res.status(201).end();
  } else {
    res.status(500).end();
  }
});

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

// to update media_list for user, take as input a
// JSON object containing a media_list attribute
// containing the ID of the media object(s) that
// is(are) to be added/removed to the user's media_list
app.patch('/users/:id', async (req, res) => {
  const userId = req.params['id'];
  const patchObj = req.body;
  console.log(patchObj);
  const savedUser = await userServices.patchUser(userId, patchObj);
  if (savedUser) {
    res.status(200).end();
  } else {
    re.status(500).end();
  }
});

/* ########################### end user requests ############################*/

/* ########################### begin media requests #########################*/

app.get('/media', async (req, res) => {
  const name = req.query['name'];
  const type = req.query['content_type'];
  const genre = req.query['genre'];
  const strmSrv = req.query['strm_srv'];
  const instCnt = req.query['instance_count'];
  const avgRun = req.query['avg_runtime_mins'];
  try {
    // eslint-disable-next-line max-len
    const result = await mediaServices.getMedia(name, type, genre, strmSrv, instCnt, avgRun);
    res.send({ media_list: result });
  } catch (error) {
    console.log(error);
    res.status(500).send('An error ocurred in the server.');
  }
});

app.get('/media/:id', async (req, res) => {
  const id = req.params['id'];
  const result = await mediaServices.findMediaById(id);
  if (result === undefined || result === null) {
    res.status(404).send('Resource not found.');
  } else {
    res.send({ media_list: result });
  }
});

app.post('/media', async (req, res) => {
  const media = req.body;
  const savedMedia = await mediaServices.addMedia(media);
  if (savedMedia) {
    res.status(201).send(savedMedia);
  } else {
    res.status(500).end();
  }
});

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

app.listen(process.env.PORT || port, () => {
  if (process.env.PORT) {
    console.log(`REST API on Atlas is listening on port: ${process.env.PORT}.`);
  } else console.log(`REST API is listening on local port: ${port}.`);
});