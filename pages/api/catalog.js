const fs = require('node:fs');

export default function handler(req, res) {
    let response = {};

    const brands = fs.readdirSync('./public', {withFileTypes: true})
        .filter((item) => item.isDirectory())
        .map((item) => item.name);
    
    //console.log('the folders name ----> ', brands);

    brands.forEach(folder => {
        response[folder] = [];
        fs.readdirSync(`./public/${folder}`)
            .forEach(file => response[folder].push(file));
    });

    //console.log('the response ---->', response);
    res.status(200).json(response);
}