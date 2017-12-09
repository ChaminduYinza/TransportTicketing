'use strict';
 
const chai = require('chai');  
const expect = require('chai').expect;
 
chai.use(require('chai-http'));
 
const app = require('../server.js'); // Our app
 
describe('API endpoint testing', function() {  
  this.timeout(5000); // How long to wait for a response (ms)
 
  before(function() {
 
  });
 
  after(function() {
 
  });
 
  // GET - List all colors
  it('should return all users', function() {
    return chai.request(app)
      .get('/api/user')
      .then(function(res) {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        });
  });


  it('should validate password', function() {
    return chai.request(app)
      .post('/api/user/login')
      .send([{
        pid: "P1",
        password:"newPassword"
      }])
      .then(function(res) {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
       
      });
  });


  //-------------------------------------------Account test cases------------------------------------------------------
 
  // GET - Invalid path
  it('should return Not Found', function() {
    return chai.request(app)
      .get('/INVALID_PATH')
      .then(function(res) {
        throw new Error('Path not exists!');
      })
      .catch(function(err) {
        expect(err).to.have.status(404);
      });
  });

    it('should return account details belongs to token T1', function() {
    return chai.request(app)
      .get('/api/payStation/getToken/T1')
      .then(function(res) {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        });
  });


  it('should return fail status', function() {
    return chai.request(app)
      .get('/api/payStation/getToken/T1sadsad')
      .then(function(res) {
       expect(res).to.be.json;
        });
  });

  it('should add credit to account', function() {
    return chai.request(app)
      .put('/api/payStation/addCredit/1001001000')
      .send([{
        amount: 200
      }])
      .then(function(res) {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
       
      });
  });

  it('should return Bad Request', function() {
    return chai.request(app)
      .post('/api/payStation/addCredit/1001adsaxxxxds0xxxx01000')
      .type('form')
      .send({
        amount: 'xxxx'
      })
      .then(function(res) {
        throw new Error('Invalid content type!');
      })
      .catch(function(err) {
        expect(err).to.have.status(404);
      });
  });


  //------------------------------------------------------------------------- Route -------------------------------------------------------------

it('should add new route', function() {
    return chai.request(app)
      .put('/api/payStation/addCredit/1001001000')
      .send([
    {
       "start_point":"Horana",
       "end_point":"Petah",
       "bus_route":"120"
    }
])
      .then(function(res) {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
       
      });
  });


 it('should return all the journey details in a JSON', function() {
    return chai.request(app)
      .get('/api/journey')
      .then(function(res) {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        });
  });


  it('should return whether passenger is currently on a journey or not', function() {
    return chai.request(app)
      .get('/api/journey/P1')
      .then(function(res) {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        });
  });







//--------------------------------------------------------------Payment ----------------------------------

  it('should return all the payment details in a JSON', function() {
    return chai.request(app)
      .get('/api/payment')
      .then(function(res) {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        });
  });




});


