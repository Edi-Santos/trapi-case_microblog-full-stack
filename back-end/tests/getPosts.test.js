const chai = require('chai');
const chaiHTTP = require('chai-http');
const sinon = require('sinon');

const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

const server = require('../src/api/app');

chai.use(chaiHTTP);

const { expect } = chai;

describe('GET /post', () => {
  describe('Testa quando a requisição é bem sucedida', () => {
    let response = {};
    let DBServer;
    
    before(async () => {
      DBServer = await MongoMemoryServer.create();
      const URLMock = await DBServer.getUri();
      const connectionMock = await MongoClient.connect(URLMock,
        { useNewUrlParser: true, useUnifiedTopology: true }
      );

      sinon.stub(MongoClient, 'connect')
        .resolves(connectionMock);

      // Cria usuário
      await chai.request(server)
        .post('/user')
        .send({
          "name": "Eren Yeager",
          "email": "eren@email.com",
          "password": "@1eren1@",
        })

      const login = await chai.request(server)
        .post('/login')
        .send({
          "email": "eren@email.com",
          "password": "@1eren1@",
        })

      const { token } = login.body;
      
      response = await chai.request(server)
        .get('/post')
        .set({
          "Authorization": token,
        })
        .send({});
    });

    after(async () => {
      MongoClient.connect.restore();
      await DBServer.stop();
    })

    it('retorna o código de status 200', () => {
      expect(response).to.have.status(200);
    });

    it('retorna um objeto', () => {
      expect(response.body).to.be.a('object');
    });

    it('o objeto possui a propriedade "posts"', () => {
      expect(response.body).to.have.property('posts');
    });
  });
});
