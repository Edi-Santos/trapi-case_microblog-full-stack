const chai = require('chai');
const chaiHTTP = require('chai-http');
const sinon = require('sinon');

const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

const server = require('../src/api/app');

chai.use(chaiHTTP);

const { expect } = chai;

describe('POST /login', () => {
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

    it('o objeto possui a propriedade "token"', () => {
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

    it('retorna o código de status 404', () => {
      expect(response).to.have.status(404);
    });

    it('retorna um objeto', () => {
      expect(response.body).to.be.a('object');
    });

    it('o objeto possui a propriedade "message"', () => {
      expect(response.body).to.have.property('message');
    });
  });

  describe('Testa quando algum campo não é informado ou é inválido', () => {
    let response1 = {};
    let response2 = {};
    let response3 = {};
    let DBServer;

    before(async () => {
      DBServer = await MongoMemoryServer.create();
      const URLMock = await DBServer.getUri();
      const connectionMock = await MongoClient.connect(URLMock,
        { useNewUrlParser: true, useUnifiedTopology: true }
      );

      sinon.stub(MongoClient, 'connect')
        .resolves(connectionMock);

      response1 = await chai.request(server)
        .post('/login')
        .send({
          "email": "",
          "password": "@1eren1@",
        });

        response2 = await chai.request(server)
        .post('/login')
        .send({
          "email": "erenemail.com",
          "password": "@1eren1@",
        });

        response3 = await chai.request(server)
        .post('/login')
        .send({
          "email": "eren@email.com",
          "password": "",
        });
    });

    after(async () => {
      MongoClient.connect.restore();
      await DBServer.stop();
    })

    it('retorna o código de status 400', () => {
      expect(response1).to.have.status(400);
      expect(response2).to.have.status(400);
      expect(response3).to.have.status(400);
    });

    it('retorna um objeto', () => {
      expect(response1.body).to.be.a('object');
      expect(response2.body).to.be.a('object');
      expect(response3.body).to.be.a('object');
    });

    it('o objeto possui a propriedade "message"', () => {
      expect(response1.body).to.have.property('message');
      expect(response2.body).to.have.property('message');
      expect(response3.body).to.have.property('message');
    });
  });
});
