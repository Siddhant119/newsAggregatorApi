process.env.NODE_ENV = 'test';
let chai = require('chai');
let chaiHttp = require('chai-http');
chai.use(chaiHttp);
var bcrypt = require('bcrypt');
const sinon = require('sinon');
const expect = require('chai').expect;
const server = require('../../src/app');

describe('verifies the sign up flow', ()=>{
    let signUpbody = {
        "fullName": "t1 name",
        "email": "test123@gmail.com",
        "password": "12test@12",
        "preferences": {
            "categories": "cricket",
            "language": "en",
            "country": "us"
        }
    }

    it('1.Sucessfull signUp', (done)=>{
        chai.request(server).post('/register').send(signUpbody).end((err, res) => {
            expect(res.status).equal(200);
            expect(res.body.message).equal('User has been registered');
            done();
        });
    });

    it('2.verifies signUp failing because of email validation',(done)=>{
        signUpbody.email = 'test@1234@gmail.com';
        chai.request(server).post('/register').send(signUpbody).end((err, res) => {
            expect(res.status).equal(500);
            expect(res.body.message).equal('Invalid Email');
            done();
        });
    });

    it('3.verifies the signUp failing because of missing properties',(done)=>{
        signUpbody.email = 'test123@gmail.com';
        delete(signUpbody.fullName);
        chai.request(server).post('/register').send(signUpbody).end((err, res) => {
            expect(res.status).equal(500);
            expect(res.body.message).equal('missing fields');
            done();
        });
    })
});

describe('verifies the signIn',()=> {
    
    beforeEach((done) => {
        process.env.NODE_ENV = 'test1';
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
            done();
        });
    });

    afterEach((done)=>{
        process.env.NODE_ENV = 'test';
        done();
    });

    it('Successfull SignIn', (done) => {
        let signInBody = {
            "email": "test1234@gmail.com",
            "password": "123test@123"
        };
        chai.request(server).post('/login').send(signInBody).end((err, res) => {
            expect(res.status).equal(200);
            expect(res.body).to.have.property('accessToken');
            expect(res.body).to.have.property('user');
            expect(res.body.user).to.have.property('fullName');
            expect(res.body.user).to.have.property('email');
            expect(res.body).to.have.property('message');
            expect(res.body.message).equal("Login Successful");
            done();
        });
    });

    it('Password is incorrect' , (done) => {
        let signInBody = {
            "email": "test1234@gmail.com",
            "password": "123test@12"
        };
        chai.request(server).post('/login').send(signInBody).end((err, res) => {
            expect(res.status).equal(401);
            expect(res.body.message).equal("Invalid password");
            expect(res.body.accessToken).to.be.null;
            done();
        });
    });

    it('User does not exist' , (done) => {
        let signInBody = {
            "email": "test12345@gmail.com",
            "password": "123test@12"
        };
        chai.request(server).post('/login').send(signInBody).end((err, res) => {
            expect(res.status).equal(404);
            expect(res.body.message).equal("User not found");
            done();
        });
    });
});