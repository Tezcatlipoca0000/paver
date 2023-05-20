const fs = require('fs');

export default function handler(req, res) {
    const path = `./public/${req.body.brand}/${req.body.model}`;
    let error = false;

    fs.rmSync(path, { recursive: true, force: true }, (err) => {
        if (err) {
            console.log('error deleting directory ----> ', err);
            error = true;
        } 
    });

    return res.status(200).json({error: error});
}