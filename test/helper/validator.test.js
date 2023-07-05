const expect = require('chai').expect;
const validator = require('../../src/helper/validator');
const userInfo = {
    "fullName": "Dale",
        "email": "steyngun@gmail.com",
        "password": "$2b$08$Ly4RbLY.wZBeoATd/RHUh.VL8o5pYlfhx0FMk07Xdm/jWKCdr2Zzi",
        "preferences": {
            "categories": "sports",
            "language": "en",
            "country": "us"
        }
}

describe('Testing the validator function',function() {
    it('1. Validating the user Info',function(done) {
        let response = validator.validateSignUp(userInfo);
        expect(response.status).equal(true);
        expect(response.message).equal('Registeration successfull');
        done();
    });

    it('2. Validating all fields',function(done) {
        delete userInfo["fullName"];
        let response = validator.validateSignUp(userInfo);
        expect(response.status).equal(false);
        expect(response.message).equal('missing fields');
        done();
    })

    it('3. Validating the fullname',function(done) {
        userInfo["fullName"] = "";
        let response = validator.validateSignUp(userInfo);
        expect(response.status).equal(false);
        expect(response.message).equal('Name cannot be empty');
        done();
    });

    it('4. Validating the existence of an email',function(done) {
        userInfo["fullName"] = "Dale";
        userInfo["email"] = "";
        let response = validator.validateSignUp(userInfo);
        expect(response.status).equal(false);
        expect(response.message).equal('Please provide an email');
        done();
    });

    it('5. Validating the email',function(done) {
        userInfo["email"] = "steyn@gun@gmail.com";
        let response = validator.validateSignUp(userInfo);
        expect(response.status).equal(false);
        expect(response.message).equal('Invalid Email');
        done();
    });

    it('6. Validating the unique email',function(done) {
        userInfo["email"] = "soumyagnfd@gmail.com";
        let response = validator.validateSignUp(userInfo);
        expect(response.status).equal(false);
        expect(response.message).equal('email already in use');
        done();
    });

    it('7. Validating the existence of preferred country',function(done) {
        userInfo["email"] = "steyngun@gmail.com";
        delete userInfo['preferences']['country'];
        let response = validator.validateSignUp(userInfo);
        expect(response.status).equal(false);
        expect(response.message).equal('Few parameters are missing');
        done();
    });

    it('8. Validating the preferred country',function(done) {
        userInfo["preferences"]['country'] = ""
        let response = validator.validateSignUp(userInfo);
        expect(response.status).equal(false);
        expect(response.message).equal('Specify all details in preferences');
        done();
    })

    it('9. Validating the password',function(done) {
        userInfo["preferences"]['country'] = "us";
        userInfo["password"] = "";
        let response = validator.validateSignUp(userInfo);
        expect(response.status).equal(false);
        expect(response.message).equal('password cannot be empty');
        done();
    });


});