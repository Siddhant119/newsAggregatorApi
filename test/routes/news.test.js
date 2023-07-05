let chai = require('chai');
let chaiHttp = require('chai-http');
chai.use(chaiHttp);
const server = require('../../src/app');
const expect = chai.expect;

describe('fetch news', () =>{
    let jwtToken = '';
    before((done) => {
        let signUpbody = {
            "fullName": "t3 name",
            "email": "test1234@gmail.com",
            "password": "123test@123",
            "preferences": {
                "categories": "football",
                "language": "en",
                "country": "us"
            }
        }
        chai.request(server).post('/register').send(signUpbody).end((err, res) => {
            let signInBody = {
                "email": "test1234@gmail.com",
                "password": "123test@123"
            }
            chai.request(server).post('/login').send(signInBody).end((err, signInres) => {
                jwtToken = signInres.body.accessToken;
                done();
            });
        });
    });


    it('signs In and fetch the news', (done) => {
        chai.request(server).get('/news').set('authorization', `JWT ${jwtToken}`).end((err, res) => {
            expect(res.status).equal(200);
            done();
        });
    }).timeout(4000);

    it('fails because of invalid jwtToken',(done) => {
        chai.request(server).get('/news').set('authorization', `JWT ${jwtToken}asdr`).end((err, res) => {
            expect(res.status).equal(403);
            expect(res.body.message).equal('INVALID JWT TOKEN');
            done();
        });
    })
});