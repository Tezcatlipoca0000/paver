const fs = require('fs');

export default function removeBrand(brand) {
    const folder = `./public/${brand}`;
    let error = false;

    try {
        fs.rmdirSync(folder);
    } catch(err) {
        error = true;
    }

    return error;
}