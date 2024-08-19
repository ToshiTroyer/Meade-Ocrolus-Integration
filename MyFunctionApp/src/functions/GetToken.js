const axios = require('axios');

module.exports = async function (context, req) {
    const userToken = req.headers.authorization || '1234';

    try {
        const userId = await getUserExternalId(userToken);

        const tokenResponse = await axios.post('https://jwe-issuer.ocrolus.net/token', {
            client_id: process.env.OCROLUS_CLIENT_ID,
            client_secret: process.env.OCROLUS_CLIENT_SECRET,
            external_id: userId,
            grant_type: 'client_credentials',
            name: req.body.bookName || 'Default Book Name',
        });

        const token = tokenResponse.data.access_token;
        context.res = {
            status: 200,
            body: { accessToken: token }
        };
    } catch (error) {
        context.res = {
            status: 500,
            body: { error: 'Error generating token' }
        };
    }
};

async function getUserExternalId(userToken) {
    // Implement the logic to get the user's external ID using the userToken
    return 'some-user-id';
}
