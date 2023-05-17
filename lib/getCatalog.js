const fs = require('node:fs');

export default function getCatalog() {
    let response = {};

    const brands = fs.readdirSync('./public', {withFileTypes: true})
        .filter((item) => item.isDirectory())
        .map((item) => item.name);

    brands.forEach(folder => {
        response[folder] = [];
        fs.readdirSync(`./public/${folder}`)
            .forEach(file => response[folder].push(file));
    });

    return response;
} 
