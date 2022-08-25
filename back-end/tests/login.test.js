const chai = require('chai');
const chaiHTTP = require('chai-http');
const sinon = require('sinon');

const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

const server = require('../src/api/app');

chai.use(chaiHTTP);

const { expect } = chai;

describe('POST /login', () => {
  describe('Testa quando a requisição é bem sucedida', async () => {
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

      
      await chai.request(server)
        .post('/user')
        .send({
          "name": "Eren Yeager",
          "email": "eren@email.com",
          "password": "@1eren1@",
        });

      response = await chai.request(server)
        .post('/login')
        .send({
          "email": "eren@email.com",
          "password": "@1eren1@",
        });
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

    it('o objeto possui a propriedade "newTasks"', () => {
      expect(response.body).to.have.property('token');
    });
  });

  describe('Testa quando o usuário não é encontrado', () => {
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

      response = await chai.request(server)
        .post('/login')
        .send({
          "email": "eren@email.com",
          "password": "@1eren1@",
        });
    });

    after(async () => {
      MongoClient.connect.restore();
      await DBServer.stop();
    })

    it('retorna o código de status 400', () => {
      expect(response).to.have.status(404);
    });

    it('retorna um objeto', () => {
      expect(response.body).to.be.a('object');
    });

    it('o objeto possui a propriedade "message"', () => {
      expect(response.body).to.have.property('message');
    });
  });
});
