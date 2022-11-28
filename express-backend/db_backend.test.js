/* eslint-disable linebreak-style */
/* eslint-disable linebreak-style */
/* eslint-disable space-before-function-paren */
/* eslint-disable object-curly-spacing */
const mongoose = require('mongoose');
// const supertest = require('supertest');
// const app = require('./db_backend.js');
// const userModel = require('./models/user.js');
const userServices = require('./models/user-services.js');
// const mediaModel = require('./models/media.js');
const mediaServices = require('./models/media-services.js');

// ######################### Startup #########################

describe('Connection', () => {
  beforeAll(async () => {
    mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  beforeEach(async () => {
    testUser = await userServices.addUser({
      email: 'testuser',
      password: 'testpswd',
      media_list: [{ mediaId: 'testId', currentSeason: 1, currentEpisode: 5, currentHours: 3, currentMinutes: 7 }],
    });
    // testUser.mediaList = ;
    testMedia = await mediaServices.addMedia({
      name: 'testmed',
      contentType: 'testType',
      streamingService: 'testStrmsrv',
      img: 'testImg',
      desc: 'testDesc',
    });
  });

  // #################### User and userServices Tests ####################

  test('test getUsers - all', async () => {
    const result = await userServices.getUsers();
    console.log('checking getUsers all result');
    console.log(result);
    expect(result[result.length - 1].email).toBe('testuser');
    expect(result[result.length - 1].password).toBe('testpswd');
    expect(result[result.length - 1].mediaList[0]).not.toBe(null);
  });

  test('test getUsers - email', async () => {
    const result = await userServices.getUsers('testuser', null, null);
    expect(result.email).toBe('testuser');
  });

  test('test getUsers - password', async () => {
    const result = await userServices.getUsers(null, 'testpswd', null);
    expect(result.email).toBe('testuser');
  });

  test('test getUsers - mediaList', async () => {
    const result = await userServices.getUsers(null, null, [
      { mediaId: 'testId', currentSeason: 1, currentEpisode: 5, currentHours: 3, currentMinutes: 7 },
    ]);
    expect(result.email).toBe('testuser');
  });

  test('test findByUserId - success', async () => {
    const result = await userServices.findUserById(testUser.id);
    expect(result.email).toBe('testuser');
  });

  test('test findByUserId - failure', async () => {
    const result = await userServices.findUserById('invalid ID');
    expect(result).toBe(undefined);
  });

  test('test addUser - password too short', async () => {
    const result = await userServices.addUser({ email: 'normal', password: 'bad', mediaList: [] });
    expect(result).toBeFalsy();
  });

  test('test addUser - password too long', async () => {
    const result = await userServices.addUser({ email: 'normal', password: 'badbadbadbadbadbadbadbad', mediaList: [] });
    expect(result).toBeFalsy();
  });

  // skip modUser for now

  test('test findByIdAndDelete - success', async () => {
    const target = testUser.name;
    const result = await userServices.findByIdAndDelete(testUser.id);
    expect(target).toBe(result.name);
  });

  test('test findByIdAndDelete - failure', async () => {
    const result = await userServices.findByIdAndDelete('INVALID ID');
    expect(result).toBeFalsy();
  });

  // test('GET /users', async () => {
  //   await supertest(app)
  //     .get('/users')
  //     .expect(200)
  //     .then((response) => {
  //       // Check type and length
  //       expect(Array.isArray(response.res.text.users_list)).toBeTruthy();
  //     });
  // });

  // test('Testing get users by ID -- success', async () => {
  //   await supertest(app)
  //     .get(`/users/${testUser.id}`)
  //     .expect(200)
  //     .then((response) => {
  //       // Check data
  //       expect(response).toBeTruthy();
  //       expect(response.body._id).toBe(testUser.id);
  //       expect(response.body.email).toBe(testUser.email);
  //       expect(response.body.password).toBe(testUser.password);
  //       expect(response.body.media_list).toBe(testUser.media_list);
  //     });
  // });

  // #################### Media and mediaServices Tests ####################

  test('test getMedia - all', async () => {
    const result = await mediaServices.getMedia();
    expect(result[result.length - 1].name).toBe('testmed');
    expect(result[result.length - 1].contentType).toBe('testType');
    expect(result[result.length - 1].streamingService).toBe('testStrmsrv');
    expect(result[result.length - 1].img).toBe('testImg');
    expect(result[result.length - 1].desc).toBe('testDesc');
  });

  test('test getMedia - name', async () => {
    const result = await mediaServices.getMedia('testmed', null, null, null, null);
    expect(result.name).toBe('testmed');
  });

  test('test getMedia - contentType', async () => {
    const result = await mediaServices.getMedia(null, 'testType', null, null, null);
    expect(result.name).toBe('testmed');
  });

  test('test getMedia - streamingService', async () => {
    const result = await mediaServices.getMedia(null, null, 'testStrmsrv', null, null);
    expect(result.name).toBe('testmed');
  });

  test('test getMedia - img', async () => {
    const result = await mediaServices.getMedia(null, null, null, 'testImg', null);
    expect(result.name).toBe('testmed');
  });

  test('test getMedia - desc', async () => {
    const result = await mediaServices.getMedia(null, null, null, null, 'testDesc');
    expect(result.name).toBe('testmed');
  });

  test('test findByMediaId - success', async () => {
    const result = await mediaServices.findMediaById(testMedia.id);
    expect(result.name).toBe('testmed');
  });

  test('test findByMediaId - failure', async () => {
    const result = await mediaServices.findMediaById('invalid ID');
    expect(result).toBe(undefined);
  });

  test('test addUser - failure', async () => {
    const result = await mediaServices.addMedia({});
    expect(result).toBeFalsy();
  });

  test('test findByIdAndDelete - success', async () => {
    const target = testMedia.name;
    const result = await mediaServices.findByIdAndDelete(testMedia.id);
    expect(target).toBe(result.name);
  });

  test('test findByIdAndDelete - failure', async () => {
    const result = await mediaServices.findByIdAndDelete('INVALID ID');
    expect(result).toBeFalsy();
  });

  // ######################## Cleanup ########################

  afterEach(async () => {
    await userServices.findByIdAndDelete(testUser.id);
    await mediaServices.findByIdAndDelete(testMedia.id);
  });

  afterAll(async () => {
    mongoose.disconnect();
  });
});
