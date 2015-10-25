// expose our config directly to our application using module.exports
module.exports = {

    'facebookAuth' : {
        'clientID'      : '452298278305251', // your App ID
        'clientSecret'  : '9039781f7393ffaf4d48927ec933a617', // your App Secret
        'callbackURL'   : 'http://localhost:8080/auth/facebook/callback'
    },

    'googleAuth' : {
        'clientID'      : '884067812199-3m2stgabe2rkv46qcn4s0107u5rjjcpa.apps.googleusercontent.com',
        'clientSecret'  : 'maPZw48p9mPqVzum_YCObrlH',
        'callbackURL'   : 'http://localhost:8080/auth/google/callback'
    }

};
