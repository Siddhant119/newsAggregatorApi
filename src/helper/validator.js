const user = require('../userInfo.json');
class validator {
    static validateSignUp(signUpdetails) {
        if(!signUpdetails.hasOwnProperty('fullName') || !signUpdetails.hasOwnProperty('email') || !signUpdetails.hasOwnProperty('password') || !signUpdetails.hasOwnProperty('preferences')) {
            return {
                "status" : false,
                "message" : "missing fields"
            }
        }
        if(signUpdetails.fullName==="") {
            return {
                "status" : false,
                "message" : "Name cannot be empty"
            };
        }
        if(signUpdetails.email==="") {
            return {
                "status" : false,
                "message" : "Please provide an email"
            }
        }
        if(!this.validEmail(signUpdetails.email)) {
            return {
                "status" : false,
                "message" : "Invalid Email"
            };
        }
        if(!this.uniqueEmail(signUpdetails.email)) {
            return {
                "status" : false,
                "message" : "email already in use"
            };
        }
        if(signUpdetails.password=="") {
            return {
                "status" : false,
                "message" : "password cannot be empty"
            };
        }
        if(!this.validatePref(signUpdetails.preferences).status) {
            return {
                "status" : false,
                "message" : this.validatePref(signUpdetails.preferences).message
            };
        }
        return {
            "status" : true,
            "message" :"Registeration successfull"
        }
    }
    static validEmail(emailId) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailId);
    }
    static uniqueEmail(emailId) {
        let emailFound = user.some(el => el.email === emailId)
        if(emailFound) return false;
        return true;
    }
    static validatePref(preferences) {
        if(preferences.hasOwnProperty("categories") && preferences.hasOwnProperty("language") && preferences.hasOwnProperty("country")) {
            if(preferences.categories==="" || preferences.language==="" || preferences.country==="") {
                return {
                    "status" : false,
                    "message" : "Specify all details in preferences"
                }
            }
            return {
                "status" : true,
                "message" : "Valid Preferences"
            }
        }
        return {
            "status" : false,
            "message" : "Few parameters are missing"
        }
    }
}

module.exports = validator;