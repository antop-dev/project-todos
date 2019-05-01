const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../src/server/server');
const expect = chai.expect;

chai.use(chaiHttp);

describe('/GET todo', () => {
    it('GET all items', (done) => {
        chai.request(server)
            .get('/todo')
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res.body).to.be.a('array');
                done();
            });
    });

    it('POST 1 item', (done) => {
        let title = 'add item!';

        chai.request(server)
            .post('/todo')
            .type('json')
            .send({
                title : title
            })
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res.body.title).to.eq(title);
                expect(res.body.done).to.eq(false);
                done();
            });
    });
});
