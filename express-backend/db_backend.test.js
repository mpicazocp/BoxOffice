/* eslint-disable linebreak-style */
// /* eslint-disable linebreak-style */
// /* eslint-disable space-before-function-paren */
// /* eslint-disable object-curly-spacing */
// const mongoose = require('mongoose');
// const supertest = require('supertest');
// const app = require('./db_backend.js');
// const userModel = require('./models/user.js');
// const userServices = require('./models/user-services.js');
// const mediaModel = require('./models/media.js');
// const mediaServices = require('./models/media-services.js');

// describe('Connection', () => {
//   beforeAll(async () => {
//     mongoose.connect(process.env.MONGODB_URI,
//         {
//           useNewUrlParser: true,
//           useUnifiedTopology: true,
//         },
//     );
//   });

//   beforeEach(async () => {
//     testUser = await userServices.addUser({ email: 'testuser',
//       password: 'testpswd', media_list: [] });
//   });

//   test('GET /users', async () => {
//     await supertest(app).get('/users')
//         .expect(200)
//         .then((response) => {
//           // Check type and length
//           expect(Array.isArray(response.res.text.users_list)).toBeTruthy();
//         });
//   });

//   test('Testing get users by ID -- success', async () => {
//     await supertest(app).get(`/users/${testUser.id}`)
//         .expect(200)
//         .then((response) => {
//           // Check data
//           expect(response).toBeTruthy();
//           expect(response.body._id).toBe(testUser.id);
//           expect(response.body.email).toBe(testUser.email);
//           expect(response.body.password).toBe(testUser.password);
//           expect(response.body.media_list).toBe(testUser.media_list);
//         });
//   });

//   afterEach(async () => {
//     await userServices.findByIdAndDelete(testUser.id);
//   });

//   afterAll(async () => {
//     mongoose.disconnect();
//   });
// });
