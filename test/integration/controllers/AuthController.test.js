var request = require('supertest');
var sails = require('sails');
const chai = require('chai');

const { expect }= chai;

describe('AuthController', function() {

  describe('#login()', function() {
    it('should return missing credentials', function (done) {
      request(sails.hooks.http.app)
      .post('/api/login')
      .type('form')
      .send({})
      .expect(res=>{
        expect(res.status).to.equals(400);
        done()
      });
    });
  });
});