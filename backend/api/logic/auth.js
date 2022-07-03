
const {OAuth2Client} = require('google-auth-library');
const db = require('./db');
const GOOGLE_CLIENT_ID = "782857583834-2gdn3hbvtmps2t2lnlias5ec7titskc3.apps.googleusercontent.com";
const COLLECTION_NAME = 'users';
async function getUser(tokenId){
    const client = new OAuth2Client(GOOGLE_CLIENT_ID);

    const ticket = await client.verifyIdToken({
        idToken: tokenId,
        audience: GOOGLE_CLIENT_ID,
    });

    const response = ticket.getPayload();

    if (response.iss !== 'accounts.google.com' && response.aud !== GOOGLE_CLIENT_ID)
        return null;
    const user = {
        email: response.email,
        image: response.picture,
        googleId: response.sub,
        givenName: response.given_name,
        familyName: response.family_name,
        name: response.given_name + " "+response.family_name,
        role: 'USER',
    };
    return user;
}
async function isLoggedIn(tokenId){
    const user = await getUser(tokenId);
    return user !== null;
}

async function isAdmin(tokenId){
    const user = await getUser(tokenId);
    const users = await db.getItems(COLLECTION_NAME);
    const userInDb = users[user.googleId];
    return userInDb && userInDb.role && userInDb.role.indexOf('ADMIN') > -1;
}

module.exports = {
    getUser,
    isLoggedIn,
    isAdmin
};