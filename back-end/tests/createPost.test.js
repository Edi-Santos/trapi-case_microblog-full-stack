const chai = require('chai');
const chaiHTTP = require('chai-http');
const sinon = require('sinon');

const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

const server = require('../src/api/app');

chai.use(chaiHTTP);

const { expect } = chai;

describe('POST /post', () => {
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
        .post('/post')
        .set({
          "Authorization": token,
        })
        .send({
          "name": "Eren Yeager",
          "text": "Meu pastel é mais barato.",
        });
    });

    after(async () => {
      MongoClient.connect.restore();
      await DBServer.stop();
    })

    it('retorna o código de status 201', () => {
      expect(response).to.have.status(201);
    });

    it('retorna um objeto', () => {
      expect(response.body).to.be.a('object');
    });

    it('o objeto possui a propriedade "post"', () => {
      expect(response.body).to.have.property('post');
    });
  });

  describe('Testa quando algum campo não é informado ou é inválido', () => {
    let response1 = {};
    let response2 = {};
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
      
      response1 = await chai.request(server)
        .post('/post')
        .set({
          "Authorization": token,
        })
        .send({
          "name": "",
          "text": "Meu pastel é mais barato.",
        });
      

      response2 = await chai.request(server)
        .post('/post')
        .set({
          "Authorization": token,
        })
        .send({
          "name": "Eren Yeager",
          "text": "",
        });
    });

    after(async () => {
      MongoClient.connect.restore();
      await DBServer.stop();
    })

    it('retorna o código de status 400', () => {
      expect(response1).to.have.status(400);
      expect(response2).to.have.status(400);
    });

    it('retorna um objeto', () => {
      expect(response1.body).to.be.a('object');
      expect(response2.body).to.be.a('object');
    });

    it('o objeto possui a propriedade "message"', () => {
      expect(response1.body).to.have.property('message');
      expect(response2.body).to.have.property('message');
    });
  });
});
