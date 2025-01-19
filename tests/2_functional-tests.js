const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert; // Ensure assert is defined
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function () {
    test('Convert valid input', function (done) {
        chai
            .request(server)
            .get('/api/convert?input=10L')
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.equal(res.body.initUnit, 'L');
                done();
            });
    });

    test('Convert invalid input unit', function (done) {
        chai.request(server)
            .get('/api/convert')
            .query({ input: '32g' })
            .end(function (err, res) {
                assert.equal(res.text, 'invalid unit');
                done();
            });
    });
});
