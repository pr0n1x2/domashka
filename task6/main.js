const request = require('request');
const title = require('./features');

request('https://www.sitesbay.com/javascript/javascript-features', function (error, response, body) {
    if (response && response.statusCode === 200) {
        const regex = /<li>(.*?)<\/li>/gum;
        const features = body.match(regex);

        console.log(title);

        for (let i = 30; i < 45; i++) {
            console.log(`- ${features[i].slice(4, features[i].length - 5)}`);
        }
    }
});