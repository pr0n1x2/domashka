const needle = require('needle');
const fs = require('fs-extra');

needle('get', 'https://swapi.co/api/people/1/')
    .then((response) => {
        const file = `${__dirname}/swapi/swapi.json`;
        const content = typeof response.body === 'string' ? response.body : JSON.stringify(response.body);

        fs.outputFile(file, content);

        console.log( 'Data was written to file.' );
    })
    .catch((error) => {
        console.log( error );
    });