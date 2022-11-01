const express = require('express');
const cors = require('cors');

const userServices = require('../models/user-services');
const mediaServices = require('../models/media-services');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

/* ########################## begin user requests ###########################*/

app.get('/users', async (req, res) => {
  const email = req.query['email'];
  try {
    const result = await userServices.getUsers(email);
    res.send({users_list: result});
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
    res.send({users_list: result});
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

// // update media_list for user
// app.patch('users/:media_list', async (req, res) => {
//   const id = req.params['id'];
//   mediaObj = _.extend(id, req.body);
//   mediaObj.save(function(err) {
//     if (err) {
//       return res.send('/media_list', {
//         errors: err.errors,
//         company: company,
//       });
//     } else {
//       res.jsonp(company);
//     }
//   });
// });


/* ########################### end user requests ############################*/

/* ########################### begin media requests #########################*/

app.get('/media', async (req, res) => {
  const name = req.query['name'];
  const type = req.query['content_type'];
  const genre = req.query['genre'];
  const strmSrv = req.query['strm_srv'];
  try {
    const result = await mediaServices.getMedia(name, type, genre, strmSrv);
    res.send({media_list: result});
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
    res.send({media_list: result});
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

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
