const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', () => {
  test('Convert a valid input such as 10L', (done) => {
    chai
      .request(server)
      .get('/api/convert')
      .query({ input: '10L' })
      .end((err, res) => {
        assert.strictEqual(res.status, 200);
        assert.isObject(res.body); // Ensure response is an object
        assert.strictEqual(res.body.initNum, 10);
        assert.strictEqual(res.body.initUnit, 'L');
        done();
      });
  });

  test('Convert an invalid input such as 32g', (done) => {
    chai
      .request(server)
      .get('/api/convert')
      .query({ input: '32g' })
      .end((err, res) => {
        assert.strictEqual(res.status, 200);
        assert.isObject(res.body); // Ensure response is an object
        assert.strictEqual(res.body.error, 'invalid unit');
        done();
      });
  });

  test('Convert an invalid number such as 3/7.2/4kg', (done) => {
    chai
      .request(server)
      .get('/api/convert')
      .query({ input: '3/7.2/4kg' })
      .end((err, res) => {
        assert.strictEqual(res.status, 200);
        assert.isObject(res.body); // Ensure response is an object
        assert.strictEqual(res.body.error, 'invalid number');
        done();
      });
  });

  test('Convert an invalid number AND unit', (done) => {
    chai
      .request(server)
      .get('/api/convert')
      .query({ input: '3/7.2/4kilomegagram' })
      .end((err, res) => {
        assert.strictEqual(res.status, 200);
        assert.isObject(res.body); // Ensure response is an object
        assert.strictEqual(res.body.error, 'invalid number and unit');
        done();
      });
  });

  test('Convert with no number such as kg', (done) => {
    chai
      .request(server)
      .get('/api/convert')
      .query({ input: 'kg' })
      .end((err, res) => {
        assert.strictEqual(res.status, 200);
        assert.isObject(res.body); // Ensure response is an object
        assert.strictEqual(res.body.initNum, 1);
        assert.strictEqual(res.body.initUnit, 'kg');
        done();
      });
  });
});
