const querystring = require('query-string');
const axios = require('axios');

module.exports = {
    generateAuthURL: () => {
        const params = querystring.stringify({
            client_id: process.env.FB_APP_ID,
            redirect_uri: process.env.FB_REDIRECT_URI,
            scope: ['email', 'user_friends'].join(','),
            response_type: 'code',
            auth_type: 'rerequest',
            display: 'popup',
        });

        return `https://www.facebook.com/v15.0/dialog/oauth?${params}`;
    },

    getAccessToken: async (code) => {
        const { data } = await axios({
            url: 'https://graph.facebook.com/v15.0/oauth/access_token',
            method: 'get',
            params: {
                client_id: process.env.FB_APP_ID,
                client_secret: process.env.FB_APP_SECRET,
                redirect_uri: process.env.FB_REDIRECT_URI,
                code,
            },
        });

        return data.access_token;
    },

    getUserInfo: async (accesstoken) => {
        const { data } = await axios({
            url: 'https://graph.facebook.com/me',
            method: 'get',
            params: {
                fields: ['id', 'email', 'first_name', 'last_name'].join(','),
                access_token: accesstoken,
            },
        });

        return data;
    }
};