const mongoose = require('mongoose');
const userServices = require('./models/user-services.js');
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
            mediaList: [
                {
                    mediaId: 'testId',
                    currentSeason: 1,
                    currentEpisode: 5,
                    currentHours: 3,
                    currentMinutes: 7,
                    streamingService: 'testStrmsrv',
                    contentType: 'Series',
                },
            ],
        });
        testMedia = await mediaServices.addMedia({
            name: 'testmed',
            img: 'testImg',
            desc: 'testDesc',
        });
    });

    // #################### User and userServices Tests ####################

    test('test getUsers - all', async () => {
      const result = await userServices.getUsers();
      expect(result[result.length - 1].email).toBe('testuser');
      expect(result[result.length - 1].password).toBe('testpswd');
      expect(result[result.length - 1].mediaList[0]).
          toStrictEqual(testUser.mediaList[0]);
    });

    test('test getUsers - email', async () => {
      const result = await userServices.getUsers('testuser', null, null);
      console.log(result);
      expect(result[0].email).toBe('testuser');
    });

    test('test getUsers - password', async () => {
      const result = await userServices.getUsers(null, 'testpswd', null);
      expect(result[0].email).toBe('testuser');
    });

    test('test getUsers - mediaList', async () => {
      const result = await userServices.getUsers(null, null, [
        { mediaId: 'testId',
          currentSeason: 1,
          currentEpisode: 5,
          currentHours: 3,
          currentMinutes: 7,
          streamingService: 'testStrmsrv',
          contentType: 'Series' },
      ]);
      expect(result[0].email).toBe('testuser');
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
      const result = await userServices.addUser(
          {
            email: 'normal',
            password: 'bad',
            mediaList: [] });
      expect(result).toBeFalsy();
    });

    test('test addUser - password too long', async () => {
      const result = await userServices.addUser(
          {
            email: 'normal',
            password: 'badbadbadbadbadbadbadbadbadbadbadbadbadbadbad',
            mediaList: [] });
      expect(result).toBeFalsy();
    });

    test('test patchUser - add and remove', async () => {
      const objToMod = {
        email: 'testuser2',
        password: 'testpswd2',
        mediaList: [
          {
            mediaId: testUser.mediaList[0].mediaId,
            currentSeason: testUser.mediaList[0].currentSeason,
            currentEpisode: testUser.mediaList[0].currentEpisode,
            currentHours: testUser.mediaList[0].currentHours,
            currentMinutes: testUser.mediaList[0].currentMinutes,
            streamingService: testUser.mediaList[0].streamingService,
            contentType: testUser.mediaList[0].contentType,
          },
          {
            mediaId: 'testMedId2',
            currentHours: 4,
            currentMinutes: 8,
            contentType: 'Movie',
            streamingService: 'teststrmsrv2',
          },
        ],
      };
      const result = await userServices.patchUser(testUser.id, objToMod);
      expect(result.mediaList[0].mediaId).toBe('testMedId2');
      expect(result.mediaList[0].currentSeason).toBe(undefined);
      expect(result.mediaList[0].currentEpisode).toBe(undefined);
      expect(result.mediaList[0].streamingService).toBe('teststrmsrv2');
      expect(result.mediaList[0].contentType).toBe('Movie');
      expect(result.mediaList[0].currentHours).toBe(4);
      expect(result.mediaList[0].currentMinutes).toBe(8);
      expect(result.mediaList[1]).toBe(undefined);
    });

    test('test patchUser - failure to find target', async () => {
      console.log('test patchUser fail find');
      const result = await userServices.patchUser('badId', null);
      console.log(result);
      expect(result).toBe(undefined);
    });

    test('test patchUser - update success', async () => {
      const objToMod = {
        email: 'testuser2',
        password: 'testpswd2',
        mediaList: [
          {
            mediaId: 'testId',
            currentSeason: 2,
            currentEpisode: 6,
            currentHours: 4,
            currentMinutes: 8,
            contentType: 'Series',
            streamingService: 'teststrmsrv2',
          },
        ],
      };
      const result = await userServices.patchUser(testUser.id, objToMod);
      expect(result.email).toBe('testuser2');
      expect(result.password).toBe('testpswd2');
      expect(result.mediaList[0].mediaId).toBe('testId');
      expect(result.mediaList[0].currentSeason).toBe(2);
      expect(result.mediaList[0].currentEpisode).toBe(6);
      expect(result.mediaList[0].currentHours).toBe(4);
      expect(result.mediaList[0].currentMinutes).toBe(8);
      expect(result.mediaList[0].streamingService).toBe('teststrmsrv2');
      expect(result.mediaList[0].contentType).toBe('Series');
    });

    test('test patchUser - update success 2', async () => {
      const objToMod = {
        email: 'testuser2',
        password: 'testpswd2',
        mediaList: [
          {
            mediaId: 'testId',
            currentHours: 4,
            currentMinutes: 8,
            contentType: 'Movie',
            streamingService: 'teststrmsrv2',
          },
        ],
      };
      const result = await userServices.patchUser(testUser.id, objToMod);
      expect(result.email).toBe('testuser2');
      expect(result.password).toBe('testpswd2');
      expect(result.mediaList[0].mediaId).toBe('testId');
      expect(result.mediaList[0].currentSeason).toBe(undefined);
      expect(result.mediaList[0].currentEpisode).toBe(undefined);
      expect(result.mediaList[0].currentHours).toBe(4);
      expect(result.mediaList[0].currentMinutes).toBe(8);
      expect(result.mediaList[0].streamingService).toBe('teststrmsrv2');
      expect(result.mediaList[0].contentType).toBe('Movie');
    });

    test('test findByIdAndDelete - success', async () => {
      const target = testUser.name;
      const result = await userServices.findByIdAndDelete(testUser.id);
      expect(target).toBe(result.name);
    });

    test('test findByIdAndDelete - failure', async () => {
      const result = await userServices.findByIdAndDelete('INVALID ID');
      expect(result).toBeFalsy();
    });

    // #################### Media and mediaServices Tests ####################

    test('test getMedia - all', async () => {
      const result = await mediaServices.getMedia();
      expect(result[result.length - 1].name).toBe('testmed');
      expect(result[result.length - 1].img).toBe('testImg');
      expect(result[result.length - 1].desc).toBe('testDesc');
    });

    test('test getMedia - name', async () => {
        const result = await mediaServices.getMedia('testmed', null, null);
        expect(result[0].name).toBe('testmed');
    });

    test('test getMedia - img', async () => {
        const result = await mediaServices.getMedia(null, 'testImg', null);
        expect(result[0].name).toBe('testmed');
    });

    test('test getMedia - desc', async () => {
        const result = await mediaServices.getMedia(null, null, 'testDesc');
        expect(result[0].name).toBe('testmed');
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
